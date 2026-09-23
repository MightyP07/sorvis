import { useState } from "react"
import { Link } from "wouter"
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import Navbar from "../components/layout/Navbar"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg-root)] text-[var(--text-primary)]">
      <Navbar />

      <section className="relative min-h-screen px-5 pb-12 pt-28 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-[42%]
            h-[500px] w-[500px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[var(--accent)]
            opacity-[0.045]
            blur-[130px]
          "
        />

        {/* Grid */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-[0.025]
            [background-image:linear-gradient(var(--text-secondary)_1px,transparent_1px),linear-gradient(90deg,var(--text-secondary)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
            {/* Left visual panel */}
            <div className="hidden lg:block">
              <div className="max-w-lg">
                <div
                  className="
                    mb-5 inline-flex items-center gap-2
                    rounded-full border
                    border-[var(--accent)]/20
                    bg-[var(--accent-soft)]
                    px-3 py-1.5
                    text-[10px] font-medium uppercase tracking-[0.12em]
                    text-[var(--accent)]
                  "
                >
                  <Sparkles className="h-3 w-3" strokeWidth={1.8} />
                  Sorvis Intelligence
                </div>

                <h1
                  className="
                    max-w-md
                    text-4xl font-semibold
                    leading-[1.05]
                    tracking-[-0.04em]
                    text-[var(--text-primary)]
                    xl:text-[46px]
                  "
                >
                  See what&apos;s happening across Web3.
                </h1>

                <p
                  className="
                    mt-5 max-w-md
                    text-sm leading-6
                    text-[var(--text-secondary)]
                  "
                >
                  One intelligence layer for projects, ecosystems,
                  builders and opportunities.
                </p>
              </div>

              {/* Intelligence visual */}
              <div
                className="
                  relative mt-10 max-w-lg overflow-hidden
                  rounded-[22px]
                  border border-[var(--border)]
                  bg-[var(--bg-secondary)]/80
                  shadow-[0_24px_80px_rgba(0,0,0,0.14)]
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    absolute right-[-80px] top-[-80px]
                    h-48 w-48 rounded-full
                    bg-[var(--accent)]
                    opacity-[0.07]
                    blur-[70px]
                  "
                />

                {/* Card header */}
                <div className="relative flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />

                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      Ecosystem intelligence
                    </span>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    Live signals
                  </span>
                </div>

                {/* Signal rows */}
                <div className="relative space-y-2 p-4">
                  {[
                    {
                      name: "Projects indexed",
                      value: "3,352",
                      change: "+12.8%",
                    },
                    {
                      name: "Active ecosystems",
                      value: "100+",
                      change: "+8.4%",
                    },
                    {
                      name: "Momentum signals",
                      value: "847",
                      change: "+16.2%",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="
                        flex items-center justify-between
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--bg-primary)]/60
                        px-4 py-3
                      "
                    >
                      <div>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                          {item.value}
                        </p>
                      </div>

                      <span
                        className="
                          rounded-md
                          bg-[var(--accent-soft)]
                          px-2 py-1
                          font-mono text-[9px]
                          text-[var(--accent)]
                        "
                      >
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom signal */}
                <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-3">
                  <Zap
                    className="h-3.5 w-3.5 text-[var(--accent)]"
                    strokeWidth={1.7}
                  />

                  <span className="text-[10px] text-[var(--text-tertiary)]">
                    Discovery layer active
                  </span>

                  <div className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                </div>
              </div>

              {/* Mini metrics */}
              <div className="mt-3 grid max-w-lg grid-cols-3 gap-3">
                {[
                  ["100+", "Ecosystems"],
                  ["8", "Categories"],
                  ["24/7", "Discovery"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="
                      rounded-xl
                      border border-[var(--border)]
                      bg-[var(--bg-secondary)]/50
                      px-3 py-3
                    "
                  >
                    <p className="text-sm font-semibold text-[var(--accent)]">
                      {value}
                    </p>

                    <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Login */}
            <div className="w-full max-w-[420px] justify-self-center lg:justify-self-end">
              <div
                className="
                  relative overflow-hidden
                  rounded-[22px]
                  border border-[var(--border)]
                  bg-[var(--bg-elevated)]/90
                  p-6
                  shadow-[0_24px_80px_rgba(0,0,0,0.16)]
                  backdrop-blur-xl
                  sm:p-7
                "
              >
                {/* Top accent */}
                <div
                  className="
                    absolute left-0 right-0 top-0 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[var(--accent)]
                    to-transparent
                    opacity-70
                  "
                />

                <div className="mb-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        border border-[var(--accent)]/20
                        bg-[var(--accent-soft)]
                      "
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                    </div>

                    <div
                      className="
                        flex items-center gap-1.5
                        rounded-full
                        border border-[var(--border)]
                        bg-[var(--bg-secondary)]
                        px-2.5 py-1.5
                      "
                    >
                      <ShieldCheck
                        className="h-3 w-3 text-[var(--accent)]"
                        strokeWidth={1.8}
                      />

                      <span className="text-[9px] text-[var(--text-tertiary)]">
                        Secure access
                      </span>
                    </div>
                  </div>

                  <h2
                    className="
                      text-xl font-semibold
                      tracking-[-0.025em]
                      text-[var(--text-primary)]
                    "
                  >
                    Welcome back
                  </h2>

                  <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">
                    Sign in to your Sorvis account.
                  </p>
                </div>

                <form className="space-y-4">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-1.5 block
                        text-[10px] font-medium
                        uppercase tracking-[0.08em]
                        text-[var(--text-tertiary)]
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="
                        h-11 w-full rounded-xl
                        border border-[var(--border)]
                        bg-[var(--bg-secondary)]
                        px-3.5 text-xs
                        text-[var(--text-primary)]
                        outline-none
                        placeholder:text-[var(--text-muted)]
                        transition-all duration-200
                        focus:border-[var(--accent)]/60
                        focus:bg-[var(--bg-tertiary)]
                        focus:ring-4
                        focus:ring-[var(--accent-soft)]
                      "
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="
                          text-[10px] font-medium
                          uppercase tracking-[0.08em]
                          text-[var(--text-tertiary)]
                        "
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="
                          text-[10px] font-medium
                          text-[var(--accent)]
                          transition-colors
                          hover:text-[var(--accent-hover)]
                        "
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="
                          h-11 w-full rounded-xl
                          border border-[var(--border)]
                          bg-[var(--bg-secondary)]
                          px-3.5 pr-11 text-xs
                          text-[var(--text-primary)]
                          outline-none
                          placeholder:text-[var(--text-muted)]
                          transition-all duration-200
                          focus:border-[var(--accent)]/60
                          focus:bg-[var(--bg-tertiary)]
                          focus:ring-4
                          focus:ring-[var(--accent-soft)]
                        "
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="
                          absolute right-2.5 top-1/2
                          -translate-y-1/2
                          rounded-lg p-1.5
                          text-[var(--text-muted)]
                          transition-colors
                          hover:text-[var(--text-primary)]
                        "
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff
                            className="h-3.5 w-3.5"
                            strokeWidth={1.7}
                          />
                        ) : (
                          <Eye
                            className="h-3.5 w-3.5"
                            strokeWidth={1.7}
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      group mt-1
                      flex h-11 w-full
                      items-center justify-center gap-2
                      rounded-xl
                      bg-[var(--accent)]
                      text-xs font-medium
                      text-[var(--text-inverse)]
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:bg-[var(--accent-hover)]
                      hover:shadow-[0_10px_30px_var(--accent-soft)]
                    "
                  >
                    Sign in

                    <ArrowRight
                      className="
                        h-3.5 w-3.5
                        transition-transform duration-200
                        group-hover:translate-x-0.5
                      "
                      strokeWidth={1.8}
                    />
                  </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[var(--border)]" />

                  <span className="text-[9px] text-[var(--text-muted)]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[var(--border)]" />
                </div>

                {/* GitHub */}
<button
  type="button"
  className="
    flex h-11 w-full
    items-center justify-center gap-2
    rounded-xl
    border border-[var(--border)]
    bg-[var(--bg-secondary)]
    text-xs font-medium
    text-[var(--text-primary)]
    transition-all duration-200
    hover:border-[var(--accent)]/30
    hover:bg-[var(--bg-hover)]
  "
>
  <span className="text-sm font-semibold leading-none"></span>
  Continue with GitHub
</button>

                <div className="mt-5 text-center">
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Don&apos;t have an account?{" "}
                  </span>

                  <Link
                    href="/signup"
                    className="
                      text-[10px] font-medium
                      text-[var(--accent)]
                      transition-colors
                      hover:text-[var(--accent-hover)]
                    "
                  >
                    Create one
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck
                  className="h-3 w-3 text-[var(--text-muted)]"
                  strokeWidth={1.7}
                />

                <span className="text-[9px] text-[var(--text-muted)]">
                  Your data stays protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login