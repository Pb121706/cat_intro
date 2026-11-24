"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";

// 遊戲畫面的邏輯尺寸（實際顯示會等比例縮放）
const W = 360;
const H = 480;
const BASKET_Y = H - 44; // 籃子中心的高度
const BASKET_HALF = 38; // 籃子一半的寬度
const ITEM_SIZE = 34;
const START_LIVES = 3;
const EMOJI_FONT = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';

type Kind = "cat" | "gold" | "cucumber";
const ITEMS: Record<Kind, { emoji: string; points: number }> = {
  cat: { emoji: "🐱", points: 1 },
  gold: { emoji: "😻", points: 3 },
  cucumber: { emoji: "🥒", points: 0 },
};

type Item = { x: number; y: number; vy: number; kind: Kind; rot: number; spin: number };
type Pop = { x: number; y: number; text: string; color: string; life: number };
type Phase = "ready" | "playing" | "over";
type Game = {
  items: Item[];
  pops: Pop[];
  bx: number;
  score: number;
  lives: number;
  spawnIn: number;
  left: boolean;
  right: boolean;
};

// ---- 最高分存在瀏覽器（localStorage） ----
const BEST_KEY = "catch-game-best";
const BEST_EVENT = "catch-game-best-change";

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(n: number) {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    // 存不進去就算了
  }
  window.dispatchEvent(new Event(BEST_EVENT));
}

function subscribeBest(onChange: () => void) {
  window.addEventListener(BEST_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(BEST_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function newGame(): Game {
  return { items: [], pops: [], bx: W / 2, score: 0, lives: START_LIVES, spawnIn: 0.4, left: false, right: false };
}

function spawn(g: Game) {
  const r = Math.random();
  const kind: Kind = r < 0.2 ? "cucumber" : r < 0.28 ? "gold" : "cat";
  g.items.push({
    x: ITEM_SIZE / 2 + 6 + Math.random() * (W - ITEM_SIZE - 12),
    y: -ITEM_SIZE,
    // 分數越高掉得越快
    vy: 110 + Math.min(g.score, 60) * 3.5 + Math.random() * 50,
    kind,
    rot: 0,
    spin: (Math.random() - 0.5) * 3,
  });
}

function draw(ctx: CanvasRenderingContext2D, g: Game) {
  // 背景
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fff1f2");
  bg.addColorStop(1, "#ffedd5");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fbcfe8";
  ctx.fillRect(0, H - 14, W, 14);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 掉下來的東西
  ctx.font = `${ITEM_SIZE}px ${EMOJI_FONT}`;
  for (const it of g.items) {
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    ctx.fillText(ITEMS[it.kind].emoji, 0, 0);
    ctx.restore();
  }

  // 籃子
  ctx.font = `54px ${EMOJI_FONT}`;
  ctx.fillText("🧺", g.bx, BASKET_Y);

  // 得分 / 扣血的小字
  ctx.font = `bold 18px sans-serif`;
  for (const p of g.pops) {
    ctx.globalAlpha = clamp(p.life / 0.8, 0, 1);
    ctx.fillStyle = p.color;
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

/** 接貓咪小遊戲：移動籃子接住掉下來的貓咪，躲開小黃瓜 */
export default function CatCatchGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const game = useRef<Game>(newGame());
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [newRecord, setNewRecord] = useState(false);
  const best = useSyncExternalStore(subscribeBest, readBest, () => 0);

  // 設定畫布解析度，先畫一張靜止畫面
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    draw(ctx, game.current);
  }, []);

  // 鍵盤：← → 或 A D 移動籃子
  useEffect(() => {
    if (phase !== "playing") return;
    const set = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") game.current.left = down;
      else if (k === "arrowright" || k === "d") game.current.right = down;
      else return;
      e.preventDefault();
    };
    const onDown = (e: KeyboardEvent) => set(e, true);
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [phase]);

  // 遊戲主迴圈
  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = ctxRef.current;
    if (!ctx) return;
    const g = game.current;
    let raf = 0;
    let last = performance.now();

    const pop = (x: number, y: number, text: string, color: string) =>
      g.pops.push({ x, y, text, color, life: 0.8 });

    const frame = (now: number) => {
      // 切到別的分頁再回來時，不要一次跳太多
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const dir = (g.right ? 1 : 0) - (g.left ? 1 : 0);
      g.bx = clamp(g.bx + dir * 340 * dt, BASKET_HALF, W - BASKET_HALF);

      g.spawnIn -= dt;
      if (g.spawnIn <= 0) {
        spawn(g);
        g.spawnIn = Math.max(0.38, 0.95 - g.score * 0.012);
      }

      let scoreChanged = false;
      let livesChanged = false;
      g.items = g.items.filter((it) => {
        it.y += it.vy * dt;
        it.rot += it.spin * dt;

        const caught =
          it.y >= BASKET_Y - 28 && it.y <= BASKET_Y + 8 && Math.abs(it.x - g.bx) < BASKET_HALF + ITEM_SIZE * 0.25;
        if (caught) {
          if (it.kind === "cucumber") {
            g.lives--;
            livesChanged = true;
            pop(it.x, it.y - 20, "嚇到了！-❤", "#16a34a");
          } else {
            const pts = ITEMS[it.kind].points;
            g.score += pts;
            scoreChanged = true;
            pop(it.x, it.y - 20, `+${pts}`, it.kind === "gold" ? "#d97706" : "#db2777");
          }
          return false;
        }

        if (it.y - ITEM_SIZE / 2 > H) {
          // 漏接一般貓咪會扣一顆愛心；金色貓咪和小黃瓜沒接到不扣
          if (it.kind === "cat") {
            g.lives--;
            livesChanged = true;
            pop(clamp(it.x, 40, W - 40), H - 30, "漏接 -❤", "#e11d48");
          }
          return false;
        }
        return true;
      });

      g.pops = g.pops.filter((p) => {
        p.life -= dt;
        p.y -= 40 * dt;
        return p.life > 0;
      });

      if (scoreChanged) setScore(g.score);
      if (livesChanged) setLives(Math.max(0, g.lives));
      draw(ctx, g);

      if (g.lives <= 0) {
        if (g.score > readBest()) {
          saveBest(g.score);
          setNewRecord(true);
        }
        setPhase("over");
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const start = () => {
    game.current = newGame();
    setScore(0);
    setLives(START_LIVES);
    setNewRecord(false);
    setPhase("playing");
  };

  // 滑鼠移動或手指拖曳控制籃子
  const moveTo = (e: PointerEvent<HTMLCanvasElement>) => {
    if (phase !== "playing") return;
    const rect = e.currentTarget.getBoundingClientRect();
    game.current.bx = clamp(((e.clientX - rect.left) / rect.width) * W, BASKET_HALF, W - BASKET_HALF);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* 分數列 */}
      <div className="mb-3 flex items-center justify-between rounded-2xl bg-white px-4 py-2 text-rose-800 shadow-sm ring-1 ring-pink-100">
        <p>
          得分 <strong className="text-xl text-pink-600 tabular-nums">{score}</strong>
        </p>
        <p aria-label={`剩下 ${lives} 顆愛心`}>
          {"❤️".repeat(lives)}
          {"🤍".repeat(START_LIVES - lives)}
        </p>
        <p className="text-sm">
          最高分 <strong className="tabular-nums">{best}</strong>
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] shadow-md ring-8 ring-white">
        <canvas
          ref={canvasRef}
          onPointerMove={moveTo}
          onPointerDown={moveTo}
          aria-label="接貓咪遊戲畫面"
          className="block aspect-[3/4] w-full touch-none select-none"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 p-6 text-center backdrop-blur-[2px]">
            {phase === "ready" ? (
              <>
                <p className="text-5xl" aria-hidden>
                  🧺
                </p>
                <p className="mt-3 text-2xl font-extrabold text-pink-600">接貓咪！</p>
                <p className="mt-2 leading-7 text-rose-700">
                  移動籃子接住掉下來的貓咪，
                  <br />
                  小心不要接到小黃瓜 🥒
                </p>
              </>
            ) : (
              <>
                <p className="text-5xl" aria-hidden>
                  {newRecord ? "🏆" : "😹"}
                </p>
                <p className="mt-3 text-2xl font-extrabold text-pink-600">遊戲結束</p>
                <p className="mt-2 text-rose-700">
                  這次接到 <strong className="text-xl text-pink-600">{score}</strong> 分
                </p>
                {newRecord && <p className="mt-1 font-semibold text-amber-600">刷新最高紀錄！</p>}
              </>
            )}
            <button
              type="button"
              onClick={start}
              className="mt-6 cursor-pointer rounded-full bg-pink-400 px-8 py-3 font-semibold text-white shadow-md shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-500 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink-300 active:scale-95"
            >
              {phase === "ready" ? "開始遊戲" : "再玩一次"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
