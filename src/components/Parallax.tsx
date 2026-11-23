"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  /** 移動速度：正數＝比捲動慢（往後退），負數＝比捲動快（往前衝）。0.1～0.4 最自然 */
  speed?: number;
  /** 套在外層（定位、尺寸） */
  className?: string;
  /** 套在會移動的內層 */
  innerClassName?: string;
  /** 最多移動幾 px（避免圖片滑出外框） */
  max?: number;
  children: ReactNode;
};

/**
 * 滾動視差：外層負責量位置（不會動），內層依照外層離畫面中心的距離做位移，
 * 這樣量到的位置不會被自己的位移影響。
 */
export default function Parallax({
  speed = 0.2,
  className,
  innerClassName,
  max = Infinity,
  children,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      // 不在畫面附近就不用算
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-max, Math.min(max, fromCenter * speed));
      inner.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, max]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
