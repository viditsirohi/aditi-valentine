"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const INITIAL_DETECTION = 60;
const ONGOING_DETECTION = 180;
const MIN_DISTANCE = 200;
const EDGE = 60;
const LERP = 0.12;

interface EscapeButtonProps {
  onConvert: () => void;
  questionId: number;
}

export function EscapeButton({ onConvert, questionId }: EscapeButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const escapedRef = useRef(false);
  const readyRef = useRef(false);
  const rafId = useRef(0);

  const [visible, setVisible] = useState(false);

  // ── rAF animation loop: lerps toward target ──
  const tick = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const dx = targetX.current - currentX.current;
    const dy = targetY.current - currentY.current;

    if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
      // Close enough — snap and stop
      currentX.current = targetX.current;
      currentY.current = targetY.current;
      btn.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
      rafId.current = 0;
      return;
    }

    currentX.current += dx * LERP;
    currentY.current += dy * LERP;
    btn.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
    rafId.current = requestAnimationFrame(tick);
  }, []);

  const animateTo = useCallback(
    (x: number, y: number) => {
      targetX.current = x;
      targetY.current = y;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(tick);
      }
    },
    [tick]
  );

  const snapTo = useCallback((x: number, y: number) => {
    cancelAnimationFrame(rafId.current);
    rafId.current = 0;
    currentX.current = x;
    currentY.current = y;
    targetX.current = x;
    targetY.current = y;
    const btn = btnRef.current;
    if (btn) btn.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  // ── Escape position finder ──
  const findSafePosition = useCallback(
    (cursorX: number, cursorY: number, bw: number, bh: number) => {
      const minX = EDGE;
      const maxX = window.innerWidth - bw - EDGE;
      const minY = EDGE;
      const maxY = window.innerHeight - bh - EDGE;

      const btnCX = targetX.current + bw / 2;
      const btnCY = targetY.current + bh / 2;
      const baseAngle = Math.atan2(btnCY - cursorY, btnCX - cursorX);

      for (let i = 0; i < 24; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        const step = Math.ceil(i / 2);
        const angle = baseAngle + sign * step * (Math.PI / 12);
        const tx = cursorX + Math.cos(angle) * MIN_DISTANCE - bw / 2;
        const ty = cursorY + Math.sin(angle) * MIN_DISTANCE - bh / 2;
        if (tx >= minX && tx <= maxX && ty >= minY && ty <= maxY) {
          return { x: tx, y: ty };
        }
      }

      const candidates = [
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: minX, y: maxY },
        { x: maxX, y: maxY },
        { x: (minX + maxX) / 2, y: minY },
        { x: (minX + maxX) / 2, y: maxY },
        { x: minX, y: (minY + maxY) / 2 },
        { x: maxX, y: (minY + maxY) / 2 },
      ];
      let best = candidates[0];
      let bestDist = 0;
      for (const c of candidates) {
        const d = Math.sqrt(
          (c.x + bw / 2 - cursorX) ** 2 + (c.y + bh / 2 - cursorY) ** 2
        );
        if (d > bestDist) {
          bestDist = d;
          best = c;
        }
      }
      return best;
    },
    []
  );

  // ── Init: wait for page animation, then measure and snap ──
  useEffect(() => {
    escapedRef.current = false;
    readyRef.current = false;
    setVisible(false);
    cancelAnimationFrame(rafId.current);
    rafId.current = 0;

    // Small delay lets the page entry animation settle so we measure
    // the spacer's FINAL position, not its mid-animation position
    const timer = setTimeout(() => {
      const btn = btnRef.current;
      const spacer = spacerRef.current;
      if (!btn || !spacer) return;

      spacer.style.width = `${btn.offsetWidth}px`;
      spacer.style.height = `${btn.offsetHeight}px`;

      const rect = spacer.getBoundingClientRect();
      snapTo(rect.left, rect.top);

      readyRef.current = true;
      setVisible(true);
    }, 350);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId.current);
    };
  }, [questionId, snapTo]);

  // ── Mouse tracking ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn || !readyRef.current) return;

      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((cx - e.clientX) ** 2 + (cy - e.clientY) ** 2);
      const radius = escapedRef.current ? ONGOING_DETECTION : INITIAL_DETECTION;

      if (dist < radius) {
        escapedRef.current = true;
        const pos = findSafePosition(
          e.clientX,
          e.clientY,
          rect.width,
          rect.height
        );
        animateTo(pos.x, pos.y);
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [findSafePosition, animateTo]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <>
      <div ref={spacerRef} />
      <Button
        ref={btnRef}
        variant="outline"
        size="lg"
        className="fixed z-50 left-0 top-0 text-base font-semibold border-2 border-primary/30 bg-card hover:border-primary/50 select-none cursor-pointer shadow-md will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.2s",
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          onConvert();
        }}
        onClick={onConvert}
      >
        No 💔
      </Button>
    </>
  );
}
