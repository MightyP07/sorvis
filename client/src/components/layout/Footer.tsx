import { Link } from "wouter"
import {
  ArrowUpRight,
  Radio,
  ShieldCheck,
} from "lucide-react"

function Footer() {
  return (
    <footer
      className="
        border-t
        border-[var(--border-subtle)]
        bg-[var(--bg-root)]
        text-[var(--text-primary)]
        transition-colors
        duration-300
      "
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div
          className="
            grid
            gap-12
            py-12
            md:grid-cols-[1.5fr_1fr_1fr]
            md:py-16
            lg:gap-20
          "
        >
          {/* Brand */}
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-2"
            >
              <span
                className="
                  relative
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[7px]
                  border
                  border-[var(--accent-soft)]
                  bg-[var(--surface-2)]
                  transition-all
                  duration-300
                  group-hover:border-[var(--accent)]
                  group-hover:shadow-[0_0_18px_var(--accent-soft)]
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    bg-[var(--glow-soft)]
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    h-2
                    w-2
                    rounded-full
                    bg-[var(--accent)]
                    shadow-[0_0_8px_var(--accent)]
                    transition-transform
                    duration-300
                    group-hover:scale-125
                  "
                />
              </span>

              <span
                className="
                  font-mono
                  text-sm
                  font-semibold
                  tracking-[-0.04em]
                  text-[var(--text-primary)]
                "
              >
                SORVIS
              </span>
            </Link>

            <p
              className="
                mt-5
                max-w-sm
                text-sm
                leading-6
                text-[var(--text-secondary)]
              "
            >
              Intelligence for the Web3 ecosystem. Discover projects,
              understand traction, and make better-informed decisions.
            </p>

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--accent-soft)]
                bg-[var(--accent-soft)]
                px-3
                py-1.5
                transition-all
                duration-300
                hover:border-[var(--accent)]
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-[var(--accent)]
                    opacity-40
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[var(--accent)]
                    shadow-[0_0_6px_var(--accent)]
                  "
                />
              </span>

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-[var(--accent)]
                "
              >
                Intelligence layer active
              </span>
            </div>
          </div>

          {/* Discover */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[var(--accent)]
                  shadow-[0_0_6px_var(--accent)]
                "
              />

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[var(--text-muted)]
                "
              >
                Discover
              </p>
            </div>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/explore"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-1.5
                  text-sm
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-200
                  hover:text-[var(--accent)]
                "
              >
                Explore

                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>

              <Link
                href="/ecosystems"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-1.5
                  text-sm
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-200
                  hover:text-[var(--accent)]
                "
              >
                Ecosystems

                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>

              <Link
                href="/submit"
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-1.5
                  text-sm
                  text-[var(--text-secondary)]
                  transition-colors
                  duration-200
                  hover:text-[var(--accent)]
                "
              >
                Submit a project

                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>
            </nav>
          </div>

          {/* Platform */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[var(--accent)]
                  shadow-[0_0_6px_var(--accent)]
                "
              />

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[var(--text-muted)]
                "
              >
                Platform
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {/* Live discovery */}
              <div className="group flex items-center gap-3">
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[var(--accent-soft)]
                    bg-[var(--accent-soft)]
                    transition-all
                    duration-300
                    group-hover:border-[var(--accent)]
                  "
                >
                  <Radio
                    className="
                      h-3.5
                      w-3.5
                      text-[var(--accent)]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-200
                      group-hover:text-[var(--text-primary)]
                    "
                  >
                    Live discovery
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.12em]
                      text-[var(--text-muted)]
                    "
                  >
                    Continuous
                  </p>
                </div>
              </div>

              {/* Verified signals */}
              <div className="group flex items-center gap-3">
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--surface-1)]
                    transition-all
                    duration-300
                    group-hover:border-[var(--accent-soft)]
                    group-hover:bg-[var(--accent-soft)]
                  "
                >
                  <ShieldCheck
                    className="
                      h-3.5
                      w-3.5
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-300
                      group-hover:text-[var(--accent)]
                    "
                  />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-200
                      group-hover:text-[var(--text-primary)]
                    "
                  >
                    Verified signals
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.12em]
                      text-[var(--text-muted)]
                    "
                  >
                    Data integrity
                  </p>
                </div>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/MightyP07"
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center gap-3"
              >
                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--surface-1)]
                    transition-all
                    duration-300
                    group-hover:border-[var(--accent-soft)]
                    group-hover:bg-[var(--accent-soft)]
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[9px]
                      font-semibold
                      tracking-[-0.05em]
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-200
                      group-hover:text-[var(--accent)]
                    "
                  >
                    GH
                  </span>
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-[var(--text-secondary)]
                      transition-colors
                      duration-200
                      group-hover:text-[var(--text-primary)]
                    "
                  >
                    GitHub
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.12em]
                      text-[var(--text-muted)]
                    "
                  >
                    Source
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="
            relative
            flex
            flex-col
            gap-4
            border-t
            border-[var(--border-subtle)]
            py-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Subtle accent trace */}
          <div
            className="
              absolute
              left-0
              top-0
              h-px
              w-20
              bg-[var(--accent)]
              opacity-70
              shadow-[0_0_8px_var(--accent)]
            "
          />

          <div className="flex items-center gap-4">
            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[var(--text-muted)]
              "
            >
              © {new Date().getFullYear()} Sorvis
            </span>

            <span
              className="
                h-3
                w-px
                bg-[var(--border-subtle)]
              "
            />

            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-[var(--text-muted)]
              "
            >
              Web3 Intelligence
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-[var(--text-muted)]
              "
            >
              Built for the next layer
            </span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-[var(--accent)]
                shadow-[0_0_6px_var(--accent)]
              "
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer