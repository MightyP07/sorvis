import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Check,
  Compass,
  Database,
  GitBranch,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { Link } from "wouter"

import Navbar from "../components/layout/Navbar"

const signals = [
  {
    icon: Search,
    label: "Discovery",
    title: "Find what is being built.",
    description:
      "Search across a growing index of Web3 projects instead of jumping between disconnected platforms and communities.",
  },
  {
    icon: Database,
    label: "Context",
    title: "Understand the project.",
    description:
      "Bring together the information that matters: what a project does, where it operates, its ecosystem, traction, funding and activity.",
  },
  {
    icon: ShieldCheck,
    label: "Verification",
    title: "Separate signal from noise.",
    description:
      "Verification and supporting signals help users evaluate whether a project has substance behind its presence.",
  },
  {
    icon: TrendingUp,
    label: "Momentum",
    title: "See what is moving.",
    description:
      "Traction, growth and activity signals help surface projects that deserve attention rather than simply those making the most noise.",
  },
]

const currentCapabilities = [
  "Project discovery",
  "Project profiles",
  "Ecosystem intelligence",
  "Project submissions",
  "Basic project metrics",
  "Verification signals",
  "Momentum and traction",
  "Funding information",
]

const futureCapabilities = [
  "Investor connections",
  "Jobs and talent",
  "Project campaigns",
  "Fundraising",
  "Messaging",
  "Advanced analytics",
  "Deeper data integrations",
  "Project intelligence tools",
]

function About() {
  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="overflow-hidden pt-28">
        {/* Hero */}
        <section className="relative border-b border-[var(--border-subtle)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="sorvis-grid absolute inset-0 opacity-60" />

            <motion.div
              className="absolute left-1/2 top-[22%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[var(--border-subtle)]"
              animate={{
                scale: [1, 1.025, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute left-1/2 top-[22%] h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-[var(--border-subtle)]"
              animate={{
                scale: [1, 0.97, 1],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <div className="absolute left-[8%] top-24 h-px w-[84%] bg-[var(--border-subtle)]" />
            <div className="absolute left-[8%] top-[72%] h-px w-[84%] bg-[var(--border-subtle)]" />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-5 pb-24 pt-14 sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
            <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-7 flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-[var(--text-primary)]" />

                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    About Sorvis
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.05 }}
                  className="max-w-5xl font-display text-[clamp(3.2rem,8vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.075em]"
                >
                  Web3 is full of
                  <br />
                  <span className="text-[var(--text-muted)]">
                    signal.
                  </span>
                  <br />
                  Finding it is not.
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="max-w-xl lg:ml-auto"
              >
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  The problem
                </div>

                <p className="text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
                  Web3 information is scattered across X, Telegram,
                  Discord, GitHub, websites, funding announcements and
                  countless other sources.
                </p>

                <p className="mt-5 text-sm leading-7 text-[var(--text-tertiary)]">
                  Sorvis brings those signals into one structured
                  intelligence layer so people can discover projects,
                  understand them faster and make better judgments about
                  what deserves their attention.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-20 grid overflow-hidden rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-1)] md:grid-cols-3"
            >
              <div className="border-b border-[var(--border-subtle)] p-6 md:border-b-0 md:border-r sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                  01
                </div>

                <div className="mt-8 font-display text-2xl tracking-[-0.04em]">
                  Discover
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  Find projects through searchable data instead of
                  fragmented communities.
                </p>
              </div>

              <div className="border-b border-[var(--border-subtle)] p-6 md:border-b-0 md:border-r sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                  02
                </div>

                <div className="mt-8 font-display text-2xl tracking-[-0.04em]">
                  Evaluate
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  Understand the signals behind a project's presence,
                  activity and traction.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                  03
                </div>

                <div className="mt-8 font-display text-2xl tracking-[-0.04em]">
                  Track
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  Follow the projects, ecosystems and opportunities that
                  matter to you.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Sorvis does */}
        <section className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  What Sorvis does
                </div>

                <h2 className="max-w-md font-display text-4xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-5xl">
                  From scattered information to usable intelligence.
                </h2>
              </div>

              <div className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2">
                {signals.map((signal, index) => {
                  const Icon = signal.icon

                  return (
                    <motion.div
                      key={signal.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.06,
                      }}
                      className="group bg-[var(--surface-1)] p-6 transition-colors duration-300 hover:bg-[var(--surface-2)] sm:p-7"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                          <Icon
                            className="h-4 w-4 text-[var(--text-secondary)]"
                            strokeWidth={1.6}
                          />
                        </div>

                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                          {signal.label}
                        </span>
                      </div>

                      <h3 className="mt-8 font-display text-xl tracking-[-0.035em]">
                        {signal.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                        {signal.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence model */}
        <section className="relative border-b border-[var(--border-subtle)]">
          <div className="sorvis-grid pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Intelligence layer
                </div>

                <h2 className="max-w-xl font-display text-4xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                  Context matters more than noise.
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  A project having a large social following does not
                  automatically make it useful. A funding announcement
                  does not automatically mean execution. Activity alone
                  does not automatically mean momentum.
                </p>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  Sorvis is designed to put multiple signals beside one
                  another, giving users a clearer picture of what a
                  project actually represents.
                </p>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-1)]">
                  <div className="border-b border-[var(--border-subtle)] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                        Project intelligence
                      </span>

                      <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-primary)]" />
                        Signals
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <div className="font-display text-2xl tracking-[-0.04em]">
                          Project profile
                        </div>

                        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.13em] text-[var(--text-muted)]">
                          Structured project data
                        </div>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                        <Sparkles
                          className="h-4 w-4 text-[var(--text-secondary)]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-2">
                      {[
                        {
                          label: "Traction",
                          value: "Activity",
                        },
                        {
                          label: "Funding",
                          value: "Capital",
                        },
                        {
                          label: "Ecosystem",
                          value: "Network",
                        },
                        {
                          label: "Verification",
                          value: "Trust",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[13px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4"
                        >
                          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            {item.label}
                          </div>

                          <div className="mt-3 font-medium text-sm">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 rounded-[13px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          Momentum
                        </span>

                        <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                          Composite signal
                        </span>
                      </div>

                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-[var(--surface-3)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "74%" }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.1,
                            delay: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-[var(--text-primary)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="pointer-events-none absolute -inset-4 rounded-[30px] border border-[var(--border-subtle)]"
                  animate={{
                    opacity: [0.2, 0.45, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Current vs future */}
        <section className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="mb-14 max-w-2xl">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                The roadmap
              </div>

              <h2 className="font-display text-4xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-5xl">
                Start with discovery.
                <br />
                Build toward infrastructure.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                Sorvis starts by making project discovery and evaluation
                easier. The larger vision is to become an intelligence
                layer connecting the people, capital and opportunities
                around Web3 projects.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[22px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] lg:grid-cols-2">
              <div className="bg-[var(--surface-1)] p-7 sm:p-9 lg:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                    <Compass
                      className="h-4 w-4 text-[var(--text-secondary)]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    Now
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl tracking-[-0.04em]">
                  Discovery & intelligence
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                  The foundation: discover projects, inspect profiles,
                  understand ecosystems and evaluate the signals around
                  them.
                </p>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {currentCapabilities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-2.5"
                    >
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[var(--text-secondary)]"
                        strokeWidth={1.8}
                      />

                      <span className="text-xs text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--surface-1)] p-7 sm:p-9 lg:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                    <GitBranch
                      className="h-4 w-4 text-[var(--text-secondary)]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    Later
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl tracking-[-0.04em]">
                  The wider network
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                  As the intelligence layer grows, Sorvis can connect
                  projects with the people, capital, talent and
                  opportunities surrounding them.
                </p>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {futureCapabilities.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-2.5"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />

                      <span className="text-xs text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-b border-[var(--border-subtle)]">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Our principle
                </div>

                <h2 className="font-display text-4xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-5xl">
                  Make the important
                  <br />
                  easier to see.
                </h2>
              </div>

              <div>
                <p className="text-xl leading-8 tracking-[-0.02em] text-[var(--text-secondary)] sm:text-2xl sm:leading-9">
                  Sorvis is not meant to tell you which project to
                  believe in. It is meant to give you enough context to
                  make that judgment yourself.
                </p>

                <div className="mt-9 flex flex-wrap gap-2">
                  {[
                    "Structured data",
                    "Transparent signals",
                    "Useful context",
                    "Less noise",
                    "Faster research",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border-default)] bg-[var(--surface-1)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-default)] bg-[var(--surface-1)]">
              <div className="sorvis-grid pointer-events-none absolute inset-0 opacity-50" />

              <motion.div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[var(--border-subtle)]"
                animate={{
                  rotate: 360,
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  rotate: {
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />

              <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <BarChart3
                      className="h-4 w-4 text-[var(--text-secondary)]"
                      strokeWidth={1.5}
                    />

                    <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                      Start exploring
                    </span>
                  </div>

                  <h2 className="max-w-3xl font-display text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                    See what is being built.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                    Explore projects, ecosystems and the signals behind
                    them through the Sorvis intelligence layer.
                  </p>
                </div>

<Link
  href="/explore"
  className="
    group
    inline-flex
    h-12
    items-center
    justify-center
    gap-3
    rounded-[13px]
    bg-[var(--accent)]
    px-6
    text-sm
    font-medium
    text-[var(--text-inverse)]
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:bg-[var(--accent-hover)]
    hover:shadow-[0_8px_30px_var(--accent-soft)]
  "
>
  Explore Sorvis

  <ArrowRight
    className="
      h-4
      w-4
      transition-transform
      duration-200
      group-hover:translate-x-0.5
    "
    strokeWidth={1.7}
  />
</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About