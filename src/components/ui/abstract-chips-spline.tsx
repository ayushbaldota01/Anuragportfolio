import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AbstractChipsSplineProps {
  scene: string;
  className?: string;
}

export function AbstractChipsSpline({ scene, className }: AbstractChipsSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  const isInView = useInView(containerRef);

  // Pause or play the spline scene based on viewport visibility
  useEffect(() => {
    if (appRef.current) {
      try {
        if (isInView) {
          appRef.current.play();
        } else {
          appRef.current.stop();
        }
      } catch (e) {
        // Silently ignore if methods don't exist
      }
    }
  }, [isInView]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create our own canvas element
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.background = 'transparent';

    // KEY FIX: Monkey-patch getContext on THIS specific canvas.
    // When the Spline runtime (via Three.js) internally calls
    // canvas.getContext('webgl2', { ... }), we intercept it and
    // inject { alpha: true }. This gives the WebGL framebuffer
    // a real alpha channel so the black clear-color becomes transparent.
    const originalGetContext = canvas.getContext.bind(canvas);
    (canvas as any).getContext = function (type: string, attrs?: any) {
      if (type === 'webgl2' || type === 'webgl') {
        return originalGetContext(type, {
          ...attrs,
          alpha: true,
          premultipliedAlpha: true,
        });
      }
      return originalGetContext(type, attrs);
    };

    container.appendChild(canvas);

    // Use @splinetool/runtime directly (already a project dependency)
    import('@splinetool/runtime').then(({ Application }) => {
      if (!container.contains(canvas)) return; // Guard against unmount race

      const app = new Application(canvas);
      appRef.current = app;

      app.load(scene).then(() => {
        // Belt-and-suspenders: also tell the Three.js renderer to clear with alpha=0
        try {
          const renderer = (app as any)._renderer;
          if (renderer) {
            renderer.setClearAlpha(0);
          }
        } catch (_) {
          // Silently ignore if internal API changed
        }
      }).catch((err: unknown) => {
        console.warn('Spline scene failed to load:', err);
      });
    });

    return () => {
      if (appRef.current) {
        try {
          appRef.current.dispose();
        } catch (_) {
          // Ignore disposal errors
        }
        appRef.current = null;
      }
      // Clean up the canvas from the DOM
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [scene]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className || ''}`}
      style={{ background: 'transparent' }}
    />
  );
}