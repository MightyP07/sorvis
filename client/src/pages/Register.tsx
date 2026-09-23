import { useState } from "react"
import { Link } from "wouter"
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Users,
  BriefcaseBusiness,
  Palette,
  Search,
} from "lucide-react"
import Navbar from "../components/layout/Navbar"

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState("Founder")

  const roles = [
    {
      name: "Founder",
      description: "Build & grow",
      icon: BriefcaseBusiness,
    },
    {
      name: "Investor",
      description: "Discover opportunities",
      icon: Search,
    },
    {
      name: "Creator",
      description: "Create & contribute",
      icon: Palette,
    },
    {
      name: "Researcher",
      description: "Explore the ecosystem",
      icon: Users,
    },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg-root)] text-[var(--text-primary)]">
      <Navbar />

      <section className="relative min-h-screen px-5 pb-12 pt-28 sm:px-6 lg:px-8">
        {/* Ambient glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-[42%]
            h-[550px] w-[550px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[var(--accent)]
            opacity-[0.045]
            blur-[140px]
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
          <div className="grid w-full items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-20">
            {/* Signup card */}
            <div className="w-full max-w-[420px] justify-self-center lg:justify-self-start">
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
                {/* Accent line */}
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

                {/* Header */}
                <div className="mb-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl
                        border border-[var(--accent)]/20
                        bg-[var(--accent-soft)]
                      "
                    >
                      <Sparkles
                        className="h-4 w-4 text-[var(--accent)]"
                        strokeWidth={1.7}
                      />
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

                  <h1
                    className="
                      text-xl font-semibold
                      tracking-[-0.025em]
                      text-[var(--text-primary)]
                    "
                  >
                    Create your account
                  </h1>

                  <p className="mt-1.5 text-xs leading-5 text-[var(--text-secondary)]">
                    Join the intelligence layer for Web3.
                  </p>
                </div>

                <form className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-1.5 block
                        text-[10px] font-medium
                        uppercase tracking-[0.08em]
                        text-[var(--text-tertiary)]
                      "
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
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

                  {/* Role */}
                  <div>
                    <label
                      className="
                        mb-2 block
                        text-[10px] font-medium
                        uppercase tracking-[0.08em]
                        text-[var(--text-tertiary)]
                      "
                    >
                      I am joining as
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((role) => {
                        const Icon = role.icon
                        const active = selectedRole === role.name

                        return (
                          <button
                            key={role.name}
                            type="button"
                            onClick={() => setSelectedRole(role.name)}
                            className={`
                              flex items-center gap-2.5
                              rounded-xl
                              border px-3 py-2.5
                              text-left
                              transition-all duration-200
                              ${
                                active
                                  ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]"
                                  : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)]/20 hover:bg-[var(--bg-hover)]"
                              }
                            `}
                          >
                            <div
                              className={`
                                flex h-7 w-7 shrink-0 items-center justify-center
                                rounded-lg
                                ${
                                  active
                                    ? "bg-[var(--accent)]/15"
                                    : "bg-[var(--bg-tertiary)]"
                                }
                              `}
                            >
                              <Icon
                                className={`h-3.5 w-3.5 ${
                                  active
                                    ? "text-[var(--accent)]"
                                    : "text-[var(--text-tertiary)]"
                                }`}
                                strokeWidth={1.7}
                              />
                            </div>

                            <div className="min-w-0">
                              <p
                                className={`text-[10px] font-medium ${
                                  active
                                    ? "text-[var(--text-primary)]"
                                    : "text-[var(--text-secondary)]"
                                }`}
                              >
                                {role.name}
                              </p>

                              <p className="mt-0.5 truncate text-[8px] text-[var(--text-muted)]">
                                {role.description}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="
                        mb-1.5 block
                        text-[10px] font-medium
                        uppercase tracking-[0.08em]
                        text-[var(--text-tertiary)]
                      "
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="
                        mb-1.5 block
                        text-[10px] font-medium
                        uppercase tracking-[0.08em]
                        text-[var(--text-tertiary)]
                      "
                    >
                      Confirm password
                    </label>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        placeholder="Confirm your password"
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
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        className="
                          absolute right-2.5 top-1/2
                          -translate-y-1/2
                          rounded-lg p-1.5
                          text-[var(--text-muted)]
                          transition-colors
                          hover:text-[var(--text-primary)]
                        "
                      >
                        {showConfirmPassword ? (
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
                    Create account

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

                {/* Login */}
                <div className="mt-5 text-center">
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Already have an account?{" "}
                  </span>

                  <Link
                    href="/login"
                    className="
                      text-[10px] font-medium
                      text-[var(--accent)]
                      transition-colors
                      hover:text-[var(--accent-hover)]
                    "
                  >
                    Sign in
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck
                  className="h-3 w-3 text-[var(--text-muted)]"
                  strokeWidth={1.7}
                />

                <span className="text-[9px] text-[var(--text-muted)]">
                  Your account information stays protected
                </span>
              </div>
            </div>

            {/* Right visual */}
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
                  Built for the ecosystem
                </div>

                <h2
                  className="
                    max-w-md
                    text-4xl font-semibold
                    leading-[1.05]
                    tracking-[-0.04em]
                    text-[var(--text-primary)]
                    xl:text-[46px]
                  "
                >
                  Your view of Web3 starts here.
                </h2>

                <p
                  className="
                    mt-5 max-w-md
                    text-sm leading-6
                    text-[var(--text-secondary)]
                  "
                >
                  Choose how you participate. Sorvis adapts your
                  experience around what you are looking for.
                </p>

                {/* Ecosystem roles */}
                <div className="mt-9 grid grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon

                    return (
                      <div
                        key={role.name}
                        className="
                          group
                          rounded-2xl
                          border border-[var(--border)]
                          bg-[var(--bg-secondary)]/60
                          p-4
                          transition-all duration-200
                          hover:-translate-y-0.5
                          hover:border-[var(--accent)]/25
                          hover:bg-[var(--bg-secondary)]
                        "
                      >
                        <div
                          className="
                            mb-4 flex h-9 w-9
                            items-center justify-center
                            rounded-xl
                            border border-[var(--border)]
                            bg-[var(--bg-tertiary)]
                            transition-colors
                            group-hover:border-[var(--accent)]/20
                            group-hover:bg-[var(--accent-soft)]
                          "
                        >
                          <Icon
                            className="
                              h-4 w-4
                              text-[var(--text-tertiary)]
                              transition-colors
                              group-hover:text-[var(--accent)]
                            "
                            strokeWidth={1.7}
                          />
                        </div>

                        <p className="text-xs font-medium text-[var(--text-primary)]">
                          {role.name}
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-[var(--text-muted)]">
                          {role.description}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom statement */}
                <div
                  className="
                    mt-3 flex items-center gap-3
                    rounded-2xl
                    border border-[var(--border)]
                    bg-[var(--bg-secondary)]/40
                    px-4 py-3
                  "
                >
                  <div className="flex -space-x-1.5">
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--bg-root)] bg-[var(--accent)]" />
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--bg-root)] bg-[var(--brand-teal)]" />
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--bg-root)] bg-[var(--brand-green)]" />
                    <div className="h-5 w-5 rounded-full border-2 border-[var(--bg-root)] bg-[var(--brand-cyan)]" />
                  </div>

                  <p className="text-[10px] text-[var(--text-tertiary)]">
                    One ecosystem. Different perspectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Signup