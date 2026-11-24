"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

// 中獎機率：10%
const WIN_RATE = 0.1;
// 抽獎轉動時間（毫秒）
const DRAW_TIME = 1400;
// 轉動時輪流出現的圖案
const ROLL_ICONS = ["🐟", "🐾", "🧶", "🐱", "🍤", "🎀"];

// win：抽中了、等待輸入 Email；claimed：Email 通過驗證，顯示優惠碼
type Phase = "idle" | "drawing" | "win" | "claimed" | "lose";

// Email 格式：帳號@網域.副檔名（副檔名至少 2 個英文字母）
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

/** 檢查 Email，回傳錯誤訊息；沒問題就回傳空字串 */
function validateEmail(value: string) {
  const v = value.trim();
  if (!v) return "請輸入 Email";
  if (v.length > 254) return "Email 太長了";
  if (!v.includes("@")) return "Email 少了「@」，例如 meow@example.com";
  if (!EMAIL_PATTERN.test(v) || v.includes("..")) return "Email 格式不正確，例如 meow@example.com";
  return "";
}

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `MEOW90-${s}`;
}

/** 抽獎按鈕：點開彈窗，10% 機會抽中貓肉泥 9 折優惠券 */
export default function LuckyDrawButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [icon, setIcon] = useState(0);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // 送出過一次後，打字時就即時檢查
  const [touched, setTouched] = useState(false);

  // 抽獎中：圖案一直換，時間到了公布結果
  useEffect(() => {
    if (phase !== "drawing") return;
    const tick = setInterval(() => setIcon((i) => (i + 1) % ROLL_ICONS.length), 90);
    const done = setTimeout(() => {
      if (Math.random() < WIN_RATE) {
        setCode(makeCode());
        setPhase("win");
      } else {
        setPhase("lose");
      }
    }, DRAW_TIME);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [phase]);

  const open = () => {
    setPhase("idle");
    setCopied(false);
    setEmail("");
    setEmailError("");
    setTouched(false);
    dialogRef.current?.showModal();
  };
  const claim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateEmail(email);
    setTouched(true);
    setEmailError(err);
    if (err) {
      emailRef.current?.focus();
      return;
    }
    setEmail(email.trim());
    setPhase("claimed");
  };
  const close = () => dialogRef.current?.close();
  const draw = () => {
    setCopied(false);
    setPhase("drawing");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // 複製失敗就讓使用者自己選取文字
    }
  };

  const won = phase === "win" || phase === "claimed";

  const primaryBtn =
    "cursor-pointer rounded-full bg-pink-400 px-6 py-2 font-semibold text-white transition hover:bg-pink-500 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink-300 disabled:cursor-not-allowed disabled:opacity-60";
  const secondaryBtn =
    "cursor-pointer rounded-full bg-pink-50 px-6 py-2 font-semibold text-pink-600 ring-1 ring-pink-200 transition hover:bg-pink-100 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink-300";

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-block cursor-pointer rounded-full bg-white px-8 py-3 font-semibold text-pink-600 shadow-md shadow-pink-100 ring-2 ring-pink-300 transition hover:-translate-y-0.5 hover:bg-pink-50 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink-300 active:scale-95"
      >
        🎁 幸運抽獎
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          // 抽獎中不讓點背景關閉
          if (e.target === e.currentTarget && phase !== "drawing") close();
        }}
        onCancel={(e) => {
          if (phase === "drawing") e.preventDefault();
        }}
        aria-labelledby="lucky-draw-title"
        className="paw-dialog m-auto w-[min(92vw,24rem)] overflow-visible rounded-[2rem] bg-transparent p-0 backdrop:bg-rose-900/40 backdrop:backdrop-blur-sm"
      >
        <div className="paw-pop max-h-[92dvh] overflow-y-auto rounded-[2rem] bg-white p-6 text-center text-rose-900 shadow-2xl ring-8 ring-pink-100">
          <h2 id="lucky-draw-title" className="text-xl font-bold text-pink-600">
            🎁 小山竹幸運抽獎
          </h2>
          <p className="mt-1 text-sm leading-6 text-rose-700">
            有 10% 的機會抽中<br />
            <strong>貓肉泥 9 折優惠券</strong>！
          </p>

          {/* 抽獎轉盤 */}
          <div
            className={`mx-auto mt-5 flex h-32 w-32 items-center justify-center rounded-full text-6xl ring-8 transition-colors ${
              won
                ? "bg-amber-100 ring-amber-200"
                : phase === "lose"
                  ? "bg-rose-50 ring-rose-100"
                  : "bg-pink-50 ring-pink-100"
            }`}
            aria-hidden
          >
            <span className={phase === "drawing" ? "lucky-roll" : won ? "paw-pop inline-block" : ""}>
              {phase === "drawing"
                ? ROLL_ICONS[icon]
                : won
                  ? "🎉"
                  : phase === "lose"
                    ? "😿"
                    : "🐟"}
            </span>
          </div>

          {/* 結果 */}
          <div aria-live="polite" className="mt-5 min-h-[3rem]">
            {phase === "idle" && <p className="leading-7 text-rose-700">準備好了嗎？按下面的按鈕試試手氣！</p>}
            {phase === "drawing" && <p className="leading-7 text-rose-700">抽獎中…喵喵祈禱中 🙏</p>}
            {phase === "lose" && (
              <p className="leading-7 text-rose-700">
                可惜沒抽中～<br />小山竹說下次一定會更好運！
              </p>
            )}
            {phase === "win" && (
              // 抽中了：先輸入 Email，格式正確才顯示優惠碼
              <form onSubmit={claim} noValidate className="text-left">
                <p className="text-center text-lg font-bold text-pink-600">恭喜中獎！</p>
                <label htmlFor="coupon-email" className="mt-3 block text-sm font-semibold text-rose-800">
                  輸入 Email 領取優惠券
                </label>
                <input
                  ref={emailRef}
                  id="coupon-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="meow@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched) setEmailError(validateEmail(e.target.value));
                  }}
                  onBlur={() => {
                    if (email.trim()) {
                      setTouched(true);
                      setEmailError(validateEmail(email));
                    }
                  }}
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={emailError ? "coupon-email-error" : undefined}
                  autoFocus
                  className={`mt-2 w-full rounded-full border-2 bg-pink-50/50 px-5 py-2.5 text-rose-900 outline-none transition placeholder:text-rose-300 focus:bg-white ${
                    emailError ? "border-rose-500 focus:border-rose-500" : "border-pink-200 focus:border-pink-400"
                  }`}
                />
                {emailError ? (
                  <p id="coupon-email-error" role="alert" className="mt-2 px-2 text-sm font-medium text-rose-600">
                    ⚠️ {emailError}
                  </p>
                ) : (
                  <p className="mt-2 px-2 text-xs text-rose-500">優惠券資訊會登記在這個 Email 底下。</p>
                )}
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="submit" className={primaryBtn}>
                    領取優惠券
                  </button>
                  <button type="button" onClick={close} className={secondaryBtn}>
                    放棄
                  </button>
                </div>
              </form>
            )}
            {phase === "claimed" && (
              <div>
                <p className="text-lg font-bold text-pink-600">領取成功！</p>
                <div className="mt-3 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 px-4 py-3">
                  <p className="text-sm font-semibold text-amber-700">貓肉泥 · 9 折優惠券</p>
                  <p className="mt-1 select-all font-mono text-xl font-bold tracking-wider text-rose-900">{code}</p>
                  <p className="mt-1 break-all text-xs text-amber-700">登記 Email：{email}</p>
                </div>
                <p className="mt-2 text-xs text-rose-600">請截圖或複製優惠碼保存，關閉視窗後就看不到囉！</p>
              </div>
            )}
          </div>

          {/* 按鈕（中獎填 Email 時，按鈕在表單裡） */}
          <div className={`mt-5 flex flex-wrap justify-center gap-3 ${phase === "win" ? "hidden" : ""}`}>
            {phase === "claimed" ? (
              <>
                <button type="button" onClick={copy} className={primaryBtn}>
                  {copied ? "已複製 ✓" : "複製優惠碼"}
                </button>
                <button type="button" onClick={close} className={secondaryBtn}>
                  關閉
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={draw} disabled={phase === "drawing"} className={primaryBtn}>
                  {phase === "lose" ? "再抽一次" : "開始抽獎"}
                </button>
                <button type="button" onClick={close} disabled={phase === "drawing"} className={`${secondaryBtn} disabled:cursor-not-allowed disabled:opacity-60`}>
                  關閉
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
