"use client";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CSS_EASINGS = { smooth: "cubic-bezier(0.16, 1, 0.3, 1)", mechanical: "cubic-bezier(0.77, 0, 0.18, 1)", linear: "linear" };
const FM_EASINGS = { smooth: [0.16, 1, 0.3, 1], mechanical: [0.77, 0, 0.18, 1], linear: [0, 0, 1, 1] };

function buildStrip(from: number, to: number, slots: number) {
  const mids = Array.from({ length: slots }, () => Math.floor(Math.random() * 10));
  return [from, ...mids, to];
}

function getSepIndices(len: number) {
  const s = new Set<number>();
  if (len <= 3) return s;
  for (let i = 1; i < len; i++) {
    if ((len - i) % 3 === 0) s.add(i);
  }
  return s;
}

interface DigitColumnProps {
  fromDigit: number;
  toDigit: number;
  direction: "up" | "down";
  randomOffset: number;
  cellHeight: number | string;
  fontSize: number | string;
  fontWeight: number;
  fontFamily: string;
  color: string;
  shouldAnimate: boolean;
  delay: number;
  duration: number;
  easing: "smooth" | "mechanical" | "linear";
}

function DigitColumn({ fromDigit, toDigit, direction, randomOffset, cellHeight, fontSize, fontWeight, fontFamily, color, shouldAnimate, delay, duration, easing }: DigitColumnProps) {
  const strip = useMemo(() => buildStrip(fromDigit, toDigit, randomOffset), [fromDigit, toDigit, randomOffset]);
  const displayStrip = direction === "up" ? strip : [...strip].reverse();
  const finalY = direction === "up" ? `calc(-100% + ${typeof cellHeight === 'number' ? cellHeight + 'px' : cellHeight})` : "0%";
  const initialY = direction === "up" ? "0%" : `calc(-100% + ${typeof cellHeight === 'number' ? cellHeight + 'px' : cellHeight})`;

  return (
    <div style={{ height: cellHeight, overflow: "hidden", display: "inline-flex", alignItems: "flex-start", flexShrink: 0 }}>
      <motion.div
        style={{ y: initialY, willChange: "transform" }}
        animate={{ y: shouldAnimate ? finalY : initialY }}
        transition={{ duration, delay, ease: (FM_EASINGS as any)[easing] ?? FM_EASINGS.smooth }}
      >
        {displayStrip.map((digit, i) => (
          <div key={i} style={{ height: cellHeight, display: "flex", alignItems: "center", justifyContent: "center", fontSize, fontWeight, fontFamily, color, lineHeight: 1, userSelect: "none" }}>
            {digit}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface MechanicalOdometerCounterProps {
  from?: number;
  to?: number;
  prefix?: string;
  useSamePrefixColor?: boolean;
  prefixColor?: string;
  suffix?: string;
  useSameSuffixColor?: boolean;
  suffixColor?: string;
  thousandSeparator?: boolean;
  separatorChar?: string;
  useSameSeparatorColor?: boolean;
  separatorColor?: string;
  direction?: "up" | "down";
  randomOffset?: number;
  gearEffect?: boolean;
  gearDecay?: number;
  trigger?: "onAppear" | "inView";
  startDelay?: number;
  easing?: "smooth" | "mechanical" | "linear";
  duration?: number;
  stagger?: number;
  slotRevealOffset?: number;
  digitGap?: number;
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number;
  lineHeight?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function MechanicalOdometerCounter({
  from = 0,
  to = 10000,
  prefix = "",
  useSamePrefixColor = true,
  prefixColor = "#aaaaaa",
  suffix = "",
  useSameSuffixColor = true,
  suffixColor = "#aaaaaa",
  thousandSeparator = false,
  separatorChar = ".",
  useSameSeparatorColor = true,
  separatorColor = "#aaaaaa",
  direction = "up",
  randomOffset = 6,
  gearEffect = true,
  gearDecay = 2.5,
  trigger = "inView",
  startDelay = 0,
  easing = "smooth",
  duration = 1.6,
  stagger = 0.07,
  slotRevealOffset = 0.2,
  digitGap = 2,
  fontFamily = "inherit",
  fontSize = "1em",
  fontWeight = 700,
  lineHeight = 1,
  color = "inherit",
  style,
  className,
  ...rest
}: MechanicalOdometerCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [revealedCols, setRevealedCols] = useState(new Set<number>());
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const isStatic = false;

  useEffect(() => {
    if (isStatic) return;
    if (trigger === "onAppear") {
      const t = setTimeout(() => setShouldAnimate(true), 80 + startDelay * 1000);
      return () => clearTimeout(t);
    }
  }, [trigger, isStatic, startDelay]);

  useEffect(() => {
    if (isStatic) return;
    if (trigger !== "onAppear" && isInView) {
      const t = setTimeout(() => setShouldAnimate(true), startDelay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, trigger, isStatic, startDelay]);

  const animating = isStatic ? false : shouldAnimate;

  useEffect(() => {
    if (isStatic) return;
    if (!animating) {
      setRevealedCols(new Set());
      return;
    }
    const extra = Math.max(0, Math.abs(Math.floor(to)).toString().length - Math.abs(Math.floor(from)).toString().length);
    const timers: NodeJS.Timeout[] = [];
    for (let idx = 0; idx < extra; idx++) {
      const appearOrder = extra - 1 - idx;
      const revealAt = (appearOrder + 1) * slotRevealOffset * 1000;
      const t = setTimeout(() => {
        setRevealedCols(prev => new Set([...prev, idx]));
      }, revealAt);
      timers.push(t);
    }
    return () => timers.forEach(clearTimeout);
  }, [animating, from, to, slotRevealOffset, isStatic]);

  const absFrom = Math.abs(Math.floor(from));
  const absTo = Math.abs(Math.floor(to));
  const fromStr = absFrom.toString();
  const toStr = absTo.toString();
  const fromLen = fromStr.length;
  const toLen = toStr.length;
  const extraCols = Math.max(0, toLen - fromLen);
  const fromDigs = fromStr.split("").map(Number);
  const toDigs = toStr.split("").map(Number);
  const isNeg = to < 0;

  const columns = toDigs.map((toDigit, i) => {
    const isAppearing = i < extraCols;
    const fromDigit = isAppearing ? 0 : fromDigs[i - extraCols];
    return { toDigit, fromDigit, isAppearing };
  });

  const cellH = typeof fontSize === "number" ? fontSize * lineHeight : fontSize;
  const sepIndices = thousandSeparator ? getSepIndices(toLen) : new Set<number>();
  const resolvedPrefix = useSamePrefixColor ? color : prefixColor;
  const resolvedSuffix = useSameSuffixColor ? color : suffixColor;
  const resolvedSep = useSameSeparatorColor ? color : separatorColor;
  const affixStyle = (c: string): React.CSSProperties => ({
    fontSize,
    fontWeight,
    fontFamily,
    color: c,
    lineHeight: 1,
    userSelect: "none",
    display: "inline-flex",
    alignItems: "center",
    height: cellH,
    flexShrink: 0
  });

  const revealTarget = typeof fontSize === "number" ? `${fontSize}px` : fontSize;

  return (
    <div className={className} ref={ref} style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", overflow: "visible", ...style }} {...rest}>
      {prefix ? <span style={affixStyle(resolvedPrefix)}>{prefix}</span> : null}
      {isNeg ? <span style={affixStyle(color)}>-</span> : null}
      <div style={{ display: "inline-flex", alignItems: "flex-start", gap: digitGap }}>
        {columns.map(({ fromDigit, toDigit, isAppearing }, i) => {
          const posFromRight = toLen - 1 - i;
          const gearSlots = gearEffect ? Math.round(randomOffset / Math.pow(gearDecay, posFromRight)) : randomOffset;
          const digitChanges = fromDigit !== toDigit;
          const adjustedSlots = Math.max(digitChanges ? 3 : 0, gearSlots);
          const appearOrder = isAppearing ? extraCols - 1 - i : -1;
          const revealAt = isAppearing ? (appearOrder + 1) * slotRevealOffset : 0;
          const PRE_ROLL = 0.1;
          const stripDelay = isAppearing ? Math.max(0, revealAt - PRE_ROLL) : (i - extraCols) * stagger;
          const isRevealed = !isAppearing || revealedCols.has(i);
          const showSep = sepIndices.has(i);

          const colStyle: React.CSSProperties = isAppearing ? {
            display: "inline-flex",
            alignItems: "flex-start",
            maxWidth: isRevealed ? revealTarget : "0px",
            overflow: "hidden",
            flexShrink: 0,
            transition: `max-width 0.4s ${(CSS_EASINGS as any).smooth}`
          } : {
            display: "inline-flex",
            alignItems: "flex-start",
            flexShrink: 0
          };

          return (
            <div key={i} style={colStyle}>
              {showSep ? (
                <span style={{ ...affixStyle(resolvedSep), opacity: isAppearing ? (isRevealed ? 1 : 0) : 1, transition: isAppearing ? "opacity 0.3s ease-out" : "none" }}>
                  {separatorChar}
                </span>
              ) : null}
              <DigitColumn
                fromDigit={fromDigit}
                toDigit={toDigit}
                direction={direction}
                randomOffset={adjustedSlots}
                cellHeight={cellH}
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                color={color}
                shouldAnimate={animating}
                delay={stripDelay}
                duration={duration}
                easing={easing}
              />
            </div>
          );
        })}
      </div>
      {suffix ? <span style={affixStyle(resolvedSuffix)}>{suffix}</span> : null}
    </div>
  );
}
