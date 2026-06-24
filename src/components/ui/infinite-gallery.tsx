import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
	fadeIn: { start: number; end: number };
	fadeOut: { start: number; end: number };
}

interface BlurSettings {
	blurIn: { start: number; end: number };
	blurOut: { start: number; end: number };
	maxBlur: number;
}

interface InfiniteGalleryProps {
	images: ImageItem[];
	speed?: number;
	visibleCount?: number;
	fadeSettings?: FadeSettings;
	blurSettings?: BlurSettings;
	className?: string;
	style?: React.CSSProperties;
}

interface PlaneData {
	index: number;
	z: number;
	imageIndex: number;
	x: number;
	y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
const SCALE_FACTOR = 2.3; // 15% larger than base 2

// ── Custom texture loader with CORS ──────────────────────────
function useLoadTextures(urls: string[]): THREE.Texture[] {
	const [textures, setTextures] = useState<THREE.Texture[]>([]);
	const urlKey = urls.join(',');

	useEffect(() => {
		const loader = new THREE.TextureLoader();
		loader.setCrossOrigin('anonymous');

		let cancelled = false;
		const loaded: THREE.Texture[] = new Array(urls.length);
		let count = 0;

		urls.forEach((url, i) => {
			loader.load(
				url,
				(tex) => {
					if (cancelled) return;
					tex.colorSpace = THREE.SRGBColorSpace;
					loaded[i] = tex;
					count++;
					if (count === urls.length) setTextures([...loaded]);
				},
				undefined,
				() => {
					if (cancelled) return;
					const c = document.createElement('canvas');
					c.width = c.height = 4;
					const ctx = c.getContext('2d')!;
					ctx.fillStyle = '#1a1a2e';
					ctx.fillRect(0, 0, 4, 4);
					loaded[i] = new THREE.CanvasTexture(c);
					count++;
					if (count === urls.length) setTextures([...loaded]);
				}
			);
		});

		return () => { cancelled = true; };
	}, [urlKey]);

	return textures;
}

// ── Cloth shader material ────────────────────────────────────
const createClothMaterial = () =>
	new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			map: { value: null },
			opacity: { value: 1.0 },
			blurAmount: { value: 0.0 },
			scrollForce: { value: 0.0 },
			time: { value: 0.0 },
			isHovered: { value: 0.0 },
		},
		vertexShader: `
			uniform float scrollForce;
			uniform float time;
			uniform float isHovered;
			varying vec2 vUv;
			void main() {
				vUv = uv;
				vec3 pos = position;
				float curveIntensity = scrollForce * 0.3;
				float distFromCenter = length(pos.xy);
				float curve = distFromCenter * distFromCenter * curveIntensity;
				float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
				float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
				float cloth = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
				float flagWave = 0.0;
				if (isHovered > 0.5) {
					float phase = pos.x * 3.0 + time * 8.0;
					float damp = smoothstep(-0.5, 0.5, pos.x);
					flagWave = sin(phase) * 0.1 * damp + sin(pos.x * 5.0 + time * 12.0) * 0.03 * damp;
				}
				pos.z -= (curve + cloth + flagWave);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
			}
		`,
		fragmentShader: `
			uniform sampler2D map;
			uniform float opacity;
			uniform float blurAmount;
			uniform float scrollForce;
			varying vec2 vUv;
			void main() {
				vec4 color = texture2D(map, vUv);
				if (blurAmount > 0.0) {
					vec2 ts = 1.0 / vec2(textureSize(map, 0));
					vec4 blurred = vec4(0.0);
					float total = 0.0;
					for (float x = -2.0; x <= 2.0; x += 1.0) {
						for (float y = -2.0; y <= 2.0; y += 1.0) {
							float w = 1.0 / (1.0 + length(vec2(x, y)));
							blurred += texture2D(map, vUv + vec2(x, y) * ts * blurAmount) * w;
							total += w;
						}
					}
					color = blurred / total;
				}
				color.rgb += vec3(abs(scrollForce) * 0.005);
				gl_FragColor = vec4(color.rgb, color.a * opacity);
			}
		`,
	});

// ── Gallery scene ────────────────────────────────────────────
function GalleryScene({
	images,
	speed = 1,
	visibleCount = 8,
	fadeSettings = { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } },
	blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 },
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
	const scrollVel = useRef(0);
	const autoPlay = useRef(true);
	const lastInteraction = useRef(Date.now());
	// Mesh refs — one per visible plane
	const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

	const normalized = useMemo(
		() => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
		[images]
	);

	const urls = useMemo(() => normalized.map((i) => i.src), [normalized]);
	const textures = useLoadTextures(urls);

	const materials = useMemo(
		() => Array.from({ length: visibleCount }, () => createClothMaterial()),
		[visibleCount]
	);

	const spatialPositions = useMemo(() => {
		const pos: { x: number; y: number }[] = [];
		for (let i = 0; i < visibleCount; i++) {
			const hAngle = (i * 2.618) % (Math.PI * 2);
			const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
			const hR = (i % 3) * 1.2;
			const vR = ((i + 1) % 4) * 0.8;
			pos.push({
				x: (Math.sin(hAngle) * hR * MAX_HORIZONTAL_OFFSET) / 3,
				y: (Math.cos(vAngle) * vR * MAX_VERTICAL_OFFSET) / 4,
			});
		}
		return pos;
	}, [visibleCount]);

	const totalImages = normalized.length;
	const depthRange = DEFAULT_DEPTH_RANGE;

	const planesData = useRef<PlaneData[]>(
		Array.from({ length: visibleCount }, (_, i) => ({
			index: i,
			z: visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
			imageIndex: totalImages > 0 ? i % totalImages : 0,
			x: spatialPositions[i]?.x ?? 0,
			y: spatialPositions[i]?.y ?? 0,
		}))
	);

	useEffect(() => {
		planesData.current = Array.from({ length: visibleCount }, (_, i) => ({
			index: i,
			z: visibleCount > 0 ? ((depthRange / Math.max(visibleCount, 1)) * i) % depthRange : 0,
			imageIndex: totalImages > 0 ? i % totalImages : 0,
			x: spatialPositions[i]?.x ?? 0,
			y: spatialPositions[i]?.y ?? 0,
		}));
	}, [depthRange, spatialPositions, totalImages, visibleCount]);

	// Scroll & keyboard handlers
	const handleWheel = useCallback(
		(e: WheelEvent) => {
			e.preventDefault();
			scrollVel.current += e.deltaY * 0.01 * speed;
			autoPlay.current = false;
			lastInteraction.current = Date.now();
		},
		[speed]
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
				scrollVel.current -= 2 * speed;
			} else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
				scrollVel.current += 2 * speed;
			} else return;
			autoPlay.current = false;
			lastInteraction.current = Date.now();
		},
		[speed]
	);

	useEffect(() => {
		const canvas = document.querySelector('canvas');
		if (!canvas) return;
		canvas.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			canvas.removeEventListener('wheel', handleWheel);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleWheel, handleKeyDown]);

	useEffect(() => {
		const id = setInterval(() => {
			if (Date.now() - lastInteraction.current > 3000) autoPlay.current = true;
		}, 1000);
		return () => clearInterval(id);
	}, []);

	// ── Per-frame animation — directly mutates mesh positions ──
	useFrame((state, delta) => {
		if (textures.length === 0) return;

		// Auto-play & damping
		if (autoPlay.current) scrollVel.current += 0.3 * delta;
		scrollVel.current *= 0.95;

		const time = state.clock.getElapsedTime();
		const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
		const halfRange = depthRange / 2;

		planesData.current.forEach((plane, i) => {
			// Advance Z
			let newZ = plane.z + scrollVel.current * delta * 10;
			let wF = 0, wB = 0;
			if (newZ >= depthRange) { wF = Math.floor(newZ / depthRange); newZ -= depthRange * wF; }
			else if (newZ < 0) { wB = Math.ceil(-newZ / depthRange); newZ += depthRange * wB; }

			if (wF > 0 && imageAdvance > 0 && totalImages > 0)
				plane.imageIndex = (plane.imageIndex + wF * imageAdvance) % totalImages;
			if (wB > 0 && imageAdvance > 0 && totalImages > 0) {
				const s = plane.imageIndex - wB * imageAdvance;
				plane.imageIndex = ((s % totalImages) + totalImages) % totalImages;
			}

			plane.z = ((newZ % depthRange) + depthRange) % depthRange;
			plane.x = spatialPositions[i]?.x ?? 0;
			plane.y = spatialPositions[i]?.y ?? 0;

			const worldZ = plane.z - halfRange;
			const norm = plane.z / depthRange;

			// Opacity
			let opacity = 1;
			if (norm < fadeSettings.fadeIn.start) opacity = 0;
			else if (norm <= fadeSettings.fadeIn.end)
				opacity = (norm - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
			else if (norm >= fadeSettings.fadeOut.start && norm <= fadeSettings.fadeOut.end)
				opacity = 1 - (norm - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
			else if (norm > fadeSettings.fadeOut.end) opacity = 0;

			// Blur
			let blur = 0;
			if (norm < blurSettings.blurIn.start) blur = blurSettings.maxBlur;
			else if (norm <= blurSettings.blurIn.end)
				blur = blurSettings.maxBlur * (1 - (norm - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
			else if (norm >= blurSettings.blurOut.start && norm <= blurSettings.blurOut.end)
				blur = blurSettings.maxBlur * ((norm - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
			else if (norm > blurSettings.blurOut.end) blur = blurSettings.maxBlur;

			// Update material uniforms
			const mat = materials[i];
			if (mat) {
				mat.uniforms.time.value = time;
				mat.uniforms.scrollForce.value = scrollVel.current;
				mat.uniforms.opacity.value = Math.max(0, Math.min(1, opacity));
				mat.uniforms.blurAmount.value = Math.max(0, Math.min(blurSettings.maxBlur, blur));
			}

			// Assign texture to material
			const tex = textures[plane.imageIndex];
			if (mat && tex) {
				mat.uniforms.map.value = tex;
			}

			// ★ Directly update mesh position + scale (no React re-render needed)
			const mesh = meshRefs.current[i];
			if (mesh) {
				mesh.position.set(plane.x, plane.y, worldZ);

				if (tex && tex.image) {
					const aspect = tex.image.width / tex.image.height;
					if (aspect > 1) mesh.scale.set(SCALE_FACTOR * aspect, SCALE_FACTOR, 1);
					else mesh.scale.set(SCALE_FACTOR, SCALE_FACTOR / aspect, 1);
				}
			}
		});
	});

	if (textures.length === 0) return null;

	// Render static meshes once — positions & textures are driven by useFrame
	return (
		<>
			{Array.from({ length: visibleCount }, (_, i) => (
				<mesh
					key={i}
					ref={(el) => { meshRefs.current[i] = el; }}
					material={materials[i]}
				>
					<planeGeometry args={[1, 1, 32, 32]} />
				</mesh>
			))}
		</>
	);
}

// ── Main export ──────────────────────────────────────────────
export default function InfiniteGallery({
	images,
	className = 'h-96 w-full',
	style,
	fadeSettings = { fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.4, end: 0.43 } },
	blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.4, end: 0.43 }, maxBlur: 8.0 },
	...rest
}: InfiniteGalleryProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		try {
			const c = document.createElement('canvas');
			const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
			setReady(!!gl);
		} catch { setReady(false); }
	}, []);

	if (!ready) {
		return (
			<div className={className} style={style}>
				<div className="flex h-full items-center justify-center text-white/30 text-sm uppercase tracking-widest">
					Gallery requires WebGL
				</div>
			</div>
		);
	}

	return (
		<div className={className} style={style}>
			<Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
				<GalleryScene images={images} fadeSettings={fadeSettings} blurSettings={blurSettings} {...rest} />
			</Canvas>
		</div>
	);
}
