"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const INITIAL_DETECTION = 60;
const ONGOING_DETECTION = 180;
const MIN_DISTANCE = 200;
const EDGE = 60;

interface EscapeButtonProps {
  onConvert: () => void;
  questionId: number;
}

export function EscapeButton({ onConvert, questionId }: EscapeButtonProps) {
  const [escaped, setEscaped] = useState(false);
  const [fixedPos, setFixedPos] = useState({ x: -9999, y: -9999 });
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const inlineRef = useRef<HTMLButtonElement>(null);
  const fixedRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const escapedRef = useRef(false);

  // Reset when question changes
  useEffect(() => {
    escapedRef.current = false;
    setEscaped(false);
    setTransitionEnabled(false);
    setFixedPos({ x: -9999, y: -9999 });
  }, [questionId]);

  const findSafePosition = useCallback(
    (cursorX: number, cursorY: number, bw: number, bh: number) => {
      const minX = EDGE;
      const maxX = window.innerWidth - bw - EDGE;
      const minY = EDGE;
      const maxY = window.innerHeight - bh - EDGE;

      const cur = posRef.current;
      const btnCenterX = cur.x + bw / 2;
      const btnCenterY = cur.y + bh / 2;

      const baseAngle = Math.atan2(
        btnCenterY - cursorY,
        btnCenterX - cursorX
      );

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Before first escape, measure from inline button. After, measure from fixed button.
      const btn = escapedRef.current ? fixedRef.current : inlineRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = escapedRef.current
        ? ONGOING_DETECTION
        : INITIAL_DETECTION;

      if (dist < radius) {
        const bw = rect.width;
        const bh = rect.height;

        if (!escapedRef.current) {
          // First escape: place fixed button exactly where inline is (no transition)
          const inlinePos = { x: rect.left, y: rect.top };
          posRef.current = inlinePos;
          setFixedPos(inlinePos);
          setTransitionEnabled(false);
          escapedRef.current = true;
          setEscaped(true);

          // Next frame: enable transition and move to escape position
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
            const newPos = findSafePosition(e.clientX, e.clientY, bw, bh);
            posRef.current = newPos;
            setFixedPos(newPos);
          });
        } else {
          // Subsequent escapes: transition is already enabled
          const newPos = findSafePosition(e.clientX, e.clientY, bw, bh);
          posRef.current = newPos;
          setFixedPos(newPos);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [findSafePosition]);

  return (
    <>
      {/* Inline button — visible until first escape, then becomes invisible spacer */}
      <Button
        ref={inlineRef}
        variant="outline"
        size="lg"
        className="text-base font-semibold border-2 border-primary/30 hover:border-primary/50 select-none cursor-pointer"
        style={{
          visibility: escaped ? "hidden" : "visible",
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          onConvert();
        }}
        onClick={onConvert}
      >
        No 💔
      </Button>

      {/* Fixed button — always mounted, hidden until first escape */}
      <Button
        ref={fixedRef}
        variant="outline"
        size="lg"
        className="fixed z-50 text-base font-semibold border-2 border-primary/30 bg-card hover:border-primary/50 select-none cursor-pointer shadow-md will-change-[left,top]"
        style={{
          left: `${fixedPos.x}px`,
          top: `${fixedPos.y}px`,
          transition: transitionEnabled
            ? "left 0.3s ease-out, top 0.3s ease-out"
            : "none",
          opacity: escaped ? 1 : 0,
          pointerEvents: escaped ? "auto" : "none",
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
