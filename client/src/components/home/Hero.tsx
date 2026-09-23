import { motion } from "framer-motion"
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  Layers3,
  Users,
  Eye,
  UserRound,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Fingerprint,
  Radio,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { useLocation } from "wouter"

const ease = [0.16, 1, 0.3, 1] as const

const discoveryFilters = [
  "Momentum",
  "Funding",
  "Ecosystem",
  "Category",
]

const signalItems = [
  {
    label: "Funding",
    color: "var(--brand-blue)",
  },
  {
    label: "Traction",
    color: "var(--brand-teal)",
  },
  {
    label: "Activity",
    color: "var(--brand-green)",
  },
  {
    label: "Ecosystems",
    color: "var(--brand-cyan, var(--brand-teal))",
  },
  {
    label: "Momentum",
    color: "var(--brand-sky, var(--brand-blue))",
  },
]

const overviewSignals = [
  {
    number: "01",
    label: "What builders are building",
    description:
      "Discover the products, protocols, infrastructure, and ideas taking shape across Web3.",
    icon: Layers3,
    color: "var(--brand-blue)",
  },
  {
    number: "02",
    label: "The problem",
    description:
      "Web3 intelligence is scattered across social feeds, communities, repositories, funding announcements, and on-chain activity.",
    icon: Target,
    color: "var(--brand-teal)",
  },
  {
    number: "03",
    label: "The solution",
    description:
      "Sorvis brings those signals together into one intelligence layer for discovering and understanding what is being built.",
    icon: Sparkles,
    color: "var(--brand-green)",
  },
]

const targetUsers = [
  {
    label: "Founders",
    description: "Build, launch, grow, and get discovered.",
  },
  {
    label: "Investors",
    description: "Research emerging projects and market signals.",
  },
  {
    label: "Creators",
    description: "Find projects, opportunities, and campaigns.",
  },
  {
    label: "Users / Researchers",
    description: "Explore the ecosystem and follow what matters.",
  },
]

const peopleLayers = [
  {
    number: "01",
    label: "Team profiles",
    description:
      "Understand the people behind projects with structured profiles, roles, backgrounds, and public signals.",
    icon: UserRound,
    color: "var(--brand-blue)",
  },
  {
    number: "02",
    label: "Creators & talents",
    description:
      "Surface builders, designers, developers, writers, researchers, and other contributors shaping the ecosystem.",
    icon: Users,
    color: "var(--brand-teal)",
  },
  {
    number: "03",
    label: "Creator profiles",
    description:
      "Give creators a dedicated identity layer for showing what they build, where they contribute, and what they can do.",
    icon: Fingerprint,
    color: "var(--brand-green)",
  },
  {
    number: "04",
    label: "Skills / platforms / portfolio",
    description:
      "Connect skills, platforms, projects, experience, and portfolio signals into a clearer professional footprint.",
    icon: Code2,
    color: "var(--brand-cyan, var(--brand-teal))",
  },
]

const creatorSignals = [
  {
    label: "Frontend",
    value: 92,
    color: "var(--brand-blue)",
  },
  {
    label: "Web3",
    value: 84,
    color: "var(--brand-teal)",
  },
  {
    label: "Product",
    value: 76,
    color: "var(--brand-green)",
  },
]

function Hero() {
  const [, setLocation] = useLocation()
  const [query, setQuery] = useState("")

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setLocation("/explore")
      return
    }

    setLocation(
      `/explore?search=${encodeURIComponent(trimmedQuery)}`,
    )
  }

  const handleFilter = (filter: string) => {
    setLocation(
      `/explore?filter=${encodeURIComponent(
        filter.toLowerCase(),
      )}`,
    )
  }

  const handleEcosystems = () => {
    setLocation("/ecosystems")
  }

  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        className="
          relative
          min-h-[760px]
          overflow-hidden
          border-b
          border-[var(--border-subtle)]
          bg-[var(--bg-root)]
          transition-colors
          duration-300
        "
      >
        {/* =================================================
            BRAND ATMOSPHERE
            ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-330px]
            h-[720px]
            w-[1100px]
            -translate-x-1/2
            rounded-full
            opacity-60
            blur-[150px]
          "
          style={{
            background:
              "radial-gradient(circle, var(--accent-soft) 0%, rgba(20,184,166,0.045) 35%, rgba(16,185,129,0.025) 55%, transparent 72%)",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[8%]
            top-[24%]
            h-[260px]
            w-[260px]
            rounded-full
            opacity-30
            blur-[120px]
          "
          style={{
            background: "var(--brand-blue)",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-[34%]
            h-[240px]
            w-[240px]
            rounded-full
            opacity-20
            blur-[120px]
          "
          style={{
            background: "var(--brand-teal)",
          }}
        />

        {/* =================================================
            GRID
            ================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease }}
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-70
            [mask-image:linear-gradient(to_bottom,black_0%,transparent_88%)]
          "
        >
          <div className="sorvis-grid absolute inset-0" />
        </motion.div>

        {/* =================================================
            AMBIENT MOVING LIGHT
            ================================================= */}

        <motion.div
          animate={{
            x: ["-18%", "18%", "-18%"],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[18%]
            h-px
            w-[55%]
            -translate-x-1/2
            blur-[1px]
          "
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--brand-blue), var(--brand-teal), transparent)",
          }}
        />

        {/* =================================================
            CENTRAL VERTICAL REFERENCE AXIS
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scaleY: 0,
          }}
          animate={{
            opacity: 1,
            scaleY: 1,
          }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-full
            w-px
            origin-top
          "
          style={{
            background:
              "linear-gradient(to bottom, var(--border-accent), var(--border-subtle) 48%, transparent)",
          }}
        />

        {/* =================================================
            HORIZONTAL REFERENCE LINES
            ================================================= */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.4, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.65,
            ease,
          }}
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-[34%]
            h-px
            origin-center
          "
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border-subtle) 20%, var(--accent-soft) 50%, var(--border-subtle) 80%, transparent 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.22, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease,
          }}
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-[72%]
            h-px
            origin-center
          "
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
          }}
        />

        {/* =================================================
            CONTENT
            ================================================= */}

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[760px]
            max-w-7xl
            items-center
            px-5
            pb-20
            pt-32
            sm:px-8
            sm:pt-36
            lg:px-10
            lg:pb-28
            lg:pt-40
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-5xl
              text-center
            "
          >
            {/* EYEBROW */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease,
              }}
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--accent-soft)]
                bg-[var(--surface-1)]
                px-3
                py-1.5
                shadow-[var(--shadow-sm)]
                backdrop-blur-md
                transition-colors
                duration-300
              "
            >
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: "var(--brand-green)",
                  boxShadow: "0 0 10px var(--brand-green)",
                }}
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.24em]
                  text-[var(--text-secondary)]
                "
              >
                Web3 intelligence layer
              </span>
            </motion.div>

            {/* HEADLINE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 28,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                delay: 0.12,
                ease,
              }}
              className="
                font-display
                text-balance
                text-5xl
                font-medium
                leading-[0.92]
                tracking-[-0.065em]
                text-[var(--text-primary)]
                sm:text-7xl
                lg:text-[104px]
              "
            >
              Discover what&apos;s
              <br />

              <motion.span
                initial={{
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease,
                }}
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, var(--brand-blue) 0%, var(--brand-teal) 48%, var(--brand-green) 100%)",
                }}
              >
                being built.
              </motion.span>
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease,
              }}
              className="
                mx-auto
                mt-7
                max-w-2xl
                font-body
                text-sm
                leading-6
                text-[var(--text-secondary)]
                sm:text-base
                sm:leading-7
              "
            >
              Explore Web3 projects through the signals
              that matter.{" "}
              <span
                className="font-medium"
                style={{
                  color:
                    "var(--brand-sky, var(--brand-blue))",
                }}
              >
                Funding
              </span>
              ,{" "}
              <span
                className="font-medium"
                style={{
                  color: "var(--brand-teal)",
                }}
              >
                traction
              </span>
              , activity, ecosystems, and momentum.
            </motion.p>

            {/* SEARCH */}

            <motion.form
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.48,
                ease,
              }}
              onSubmit={handleSearch}
              className="
                mx-auto
                mt-10
                flex
                max-w-2xl
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <div
                className="
                  group
                  relative
                  flex
                  h-14
                  flex-1
                  items-center
                  rounded-2xl
                  border
                  border-[var(--border-default)]
                  bg-[var(--surface-2)]
                  px-4
                  shadow-[var(--shadow-sm)]
                  transition-all
                  duration-300
                  focus-within:border-[var(--accent)]
                  focus-within:bg-[var(--surface-3)]
                  focus-within:shadow-[0_0_0_4px_var(--accent-soft)]
                "
              >
                <Search
                  className="
                    mr-3
                    h-4
                    w-4
                    shrink-0
                    text-[var(--text-muted)]
                    transition-colors
                    duration-200
                    group-focus-within:text-[var(--accent)]
                  "
                />

                <input
                  name="search"
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  autoComplete="off"
                  placeholder="Search projects, ecosystems..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    font-body
                    text-sm
                    text-[var(--text-primary)]
                    outline-none
                    placeholder:text-[var(--text-muted)]
                  "
                />

                <span
                  className="
                    hidden
                    rounded-md
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--surface-1)]
                    px-2
                    py-1
                    font-mono
                    text-[9px]
                    text-[var(--text-muted)]
                    sm:block
                  "
                >
                  /
                </span>
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="
                  group
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-[var(--accent)]
                  px-6
                  font-body
                  text-sm
                  font-semibold
                  text-white
                  shadow-[var(--shadow-sm)]
                  transition-all
                  duration-300
                  hover:shadow-[var(--shadow-md)]
                "
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-blue), var(--brand-teal))",
                }}
              >
                Search

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </motion.button>
            </motion.form>

            {/* DISCOVERY ACTIONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease,
              }}
              className="
                mx-auto
                mt-5
                flex
                max-w-2xl
                flex-wrap
                items-center
                justify-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={() => setLocation("/explore")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--border-default)]
                  bg-[var(--surface-1)]
                  px-3
                  py-1.5
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                  transition-all
                  duration-200
                  hover:border-[var(--accent-soft)]
                  hover:bg-[var(--accent-soft)]
                  hover:text-[var(--accent)]
                "
              >
                <Search className="h-3 w-3" />
                Explore projects
              </button>

              <button
                type="button"
                onClick={handleEcosystems}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--border-default)]
                  bg-[var(--surface-1)]
                  px-3
                  py-1.5
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-[var(--text-secondary)]
                  transition-all
                  duration-200
                  hover:border-[var(--accent-soft)]
                  hover:bg-[var(--accent-soft)]
                  hover:text-[var(--accent)]
                "
              >
                <Sparkles className="h-3 w-3" />
                Explore ecosystems
              </button>
            </motion.div>

            {/* FILTERS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.68,
                ease,
              }}
              className="
                mx-auto
                mt-6
                flex
                max-w-2xl
                flex-wrap
                items-center
                justify-center
                gap-x-4
                gap-y-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.16em]
                  text-[var(--text-muted)]
                "
              >
                <SlidersHorizontal className="h-3 w-3" />
                Quick discovery
              </div>

              {discoveryFilters.map((filter, index) => (
                <motion.button
                  key={filter}
                  type="button"
                  whileHover={{
                    y: -1,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() => handleFilter(filter)}
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    transition-colors
                    duration-200
                  "
                  style={{
                    color:
                      index === 0
                        ? "var(--brand-blue)"
                        : index === 1
                          ? "var(--brand-teal)"
                          : "var(--text-tertiary)",
                  }}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>

            {/* SIGNAL STRIP */}

            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.82,
                ease,
              }}
              className="
                mx-auto
                mt-16
                flex
                max-w-3xl
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-3
              "
            >
              {signalItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.9 + index * 0.08,
                    ease,
                  }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{
                      opacity: [0.35, 1, 0.35],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.8,
                      delay: index * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-1 w-1 rounded-full"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                    }}
                  />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-[var(--text-muted)]
                    "
                    style={{
                      color:
                        index === 0
                          ? "var(--text-secondary)"
                          : undefined,
                    }}
                  >
                    {item.label}
                  </span>

                  {index < signalItems.length - 1 && (
                    <span
                      className="
                        ml-3
                        h-2.5
                        w-px
                        bg-[var(--border-subtle)]
                      "
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* BOTTOM INDICATOR */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.1,
              }}
              className="
                mt-12
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--brand-blue))",
                }}
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-[var(--text-muted)]
                "
              >
                Intelligence starts with discovery
              </span>

              <span
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, var(--brand-teal), transparent)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
          ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[var(--border-subtle)]
          bg-[var(--bg-primary)]
          transition-colors
          duration-300
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-180px]
            h-[420px]
            w-[720px]
            -translate-x-1/2
            rounded-full
            opacity-35
            blur-[140px]
          "
          style={{
            background:
              "radial-gradient(circle, var(--accent-soft) 0%, rgba(20,184,166,0.025) 45%, transparent 72%)",
          }}
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-40
            [mask-image:linear-gradient(to_bottom,black_0%,transparent_92%)]
          "
        >
          <div className="sorvis-grid absolute inset-0" />
        </div>

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-24
            sm:px-8
            sm:py-28
            lg:px-10
            lg:py-36
          "
        >
          {/* SECTION INTRO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="max-w-3xl"
          >
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, var(--brand-blue), var(--brand-teal))",
                }}
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.24em]
                  text-[var(--accent)]
                "
              >
                The Sorvis layer
              </span>
            </div>

            <h2
              className="
                font-display
                text-4xl
                font-medium
                leading-[0.98]
                tracking-[-0.05em]
                text-[var(--text-primary)]
                sm:text-5xl
                lg:text-6xl
              "
            >
              The intelligence layer
              <br />

              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, var(--brand-blue), var(--brand-teal), var(--brand-green))",
                }}
              >
                for what&apos;s being built.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-2xl
                font-body
                text-sm
                leading-7
                text-[var(--text-secondary)]
                sm:text-base
              "
            >
              Sorvis turns fragmented Web3 signals into a clearer
              view of the projects, people, ecosystems, and
              opportunities shaping the next generation of the
              internet.
            </p>
          </motion.div>

          {/* CORE OVERVIEW GRID */}

          <div
            className="
              mt-20
              grid
              gap-px
              overflow-hidden
              rounded-[24px]
              border
              border-[var(--border-subtle)]
              bg-[var(--border-subtle)]
              lg:grid-cols-3
            "
          >
            {overviewSignals.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.article
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    bg-[var(--bg-secondary)]
                    p-7
                    transition-colors
                    duration-300
                    hover:bg-[var(--bg-tertiary)]
                    sm:p-8
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-[-40px]
                      top-[-40px]
                      h-32
                      w-32
                      rounded-full
                      opacity-0
                      blur-[60px]
                      transition-opacity
                      duration-500
                      group-hover:opacity-30
                    "
                    style={{
                      background: item.color,
                    }}
                  />

                  <div
                    className="
                      relative
                      flex
                      items-start
                      justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        bg-[var(--surface-1)]
                      "
                      style={{
                        borderColor: `color-mix(in srgb, ${item.color} 25%, transparent)`,
                      }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{
                          color: item.color,
                        }}
                        strokeWidth={1.7}
                      />
                    </div>

                    <span
                      className="
                        font-mono
                        text-[9px]
                        tracking-[0.16em]
                        text-[var(--text-faint)]
                      "
                    >
                      {item.number}
                    </span>
                  </div>

                  <h3
                    className="
                      relative
                      mt-10
                      font-display
                      text-xl
                      font-medium
                      tracking-[-0.025em]
                      text-[var(--text-primary)]
                    "
                  >
                    {item.label}
                  </h3>

                  <p
                    className="
                      relative
                      mt-3
                      max-w-sm
                      font-body
                      text-sm
                      leading-6
                      text-[var(--text-secondary)]
                    "
                  >
                    {item.description}
                  </p>

                  <div
                    className="
                      relative
                      mt-8
                      h-px
                      w-12
                      transition-all
                      duration-500
                      group-hover:w-20
                    "
                    style={{
                      background: item.color,
                    }}
                  />
                </motion.article>
              )
            })}
          </div>

          {/* PROBLEM / SOLUTION */}

          <div
            className="
              mt-20
              grid
              gap-5
              lg:grid-cols-[0.9fr_1.1fr]
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                p-7
                sm:p-9
              "
            >
              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-40
                  w-40
                  opacity-20
                  blur-[80px]
                "
                style={{
                  background: "var(--brand-blue)",
                }}
              />

              <div className="relative">
                <span
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[var(--text-muted)]
                  "
                >
                  The problem
                </span>

                <h3
                  className="
                    mt-5
                    max-w-lg
                    font-display
                    text-2xl
                    font-medium
                    leading-tight
                    tracking-[-0.035em]
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  The signal is everywhere.
                  <br />
                  The context isn&apos;t.
                </h3>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-body
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                  "
                >
                  Important information about Web3 projects is
                  spread across social platforms, communities,
                  repositories, funding announcements, websites,
                  and on-chain activity. Finding it is only part of
                  the problem. Understanding what it means is the
                  harder part.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                ease,
              }}
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                p-7
                sm:p-9
              "
            >
              <div
                className="
                  absolute
                  right-[-20px]
                  top-[-20px]
                  h-48
                  w-48
                  rounded-full
                  opacity-20
                  blur-[80px]
                "
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-blue), var(--brand-teal))",
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[var(--accent)]
                    "
                  >
                    The solution
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[var(--accent-soft)]
                      bg-[var(--accent-soft)]
                    "
                  >
                    <Sparkles
                      className="h-3.5 w-3.5"
                      style={{
                        color: "var(--accent)",
                      }}
                    />
                  </div>
                </div>

                <h3
                  className="
                    mt-5
                    max-w-xl
                    font-display
                    text-2xl
                    font-medium
                    leading-tight
                    tracking-[-0.035em]
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  One layer for discovering
                  <br />
                  what matters.
                </h3>

                <p
                  className="
                    mt-5
                    max-w-xl
                    font-body
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                  "
                >
                  Sorvis aggregates the signals around Web3
                  projects and turns them into structured,
                  discoverable intelligence. Funding, traction,
                  activity, ecosystems, and momentum become easier
                  to explore in one place.
                </p>

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-muted)]
                  "
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "var(--brand-green)",
                      boxShadow:
                        "0 0 8px var(--brand-green)",
                    }}
                  />

                  Signals connected
                </div>
              </div>
            </motion.div>
          </div>

          {/* TARGET USERS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="mt-24"
          >
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <Users
                    className="h-4 w-4"
                    style={{
                      color: "var(--accent)",
                    }}
                    strokeWidth={1.7}
                  />

                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.22em]
                      text-[var(--accent)]
                    "
                  >
                    Built for the ecosystem
                  </span>
                </div>

                <h3
                  className="
                    mt-4
                    font-display
                    text-3xl
                    font-medium
                    tracking-[-0.04em]
                    text-[var(--text-primary)]
                    sm:text-4xl
                  "
                >
                  Different roles.
                  <br />
                  One intelligence layer.
                </h3>
              </div>

              <p
                className="
                  max-w-md
                  font-body
                  text-sm
                  leading-6
                  text-[var(--text-secondary)]
                "
              >
                Sorvis is designed around the different people
                who discover, build, fund, and participate in
                Web3.
              </p>
            </div>

            <div
              className="
                mt-10
                grid
                gap-3
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {targetUsers.map((user, index) => (
                <motion.div
                  key={user.label}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.06,
                    ease,
                  }}
                  className="
                    group
                    rounded-2xl
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--surface-1)]
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[var(--accent-soft)]
                    hover:bg-[var(--surface-2)]
                  "
                >
                  <div
                    className="
                      mb-8
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-[var(--text-faint)]
                      "
                    >
                      0{index + 1}
                    </span>

                    <ArrowRight
                      className="
                        h-3.5
                        w-3.5
                        text-[var(--text-faint)]
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-[var(--accent)]
                      "
                      strokeWidth={1.6}
                    />
                  </div>

                  <h4
                    className="
                      font-display
                      text-lg
                      font-medium
                      tracking-[-0.02em]
                      text-[var(--text-primary)]
                    "
                  >
                    {user.label}
                  </h4>

                  <p
                    className="
                      mt-2
                      font-body
                      text-xs
                      leading-5
                      text-[var(--text-secondary)]
                    "
                  >
                    {user.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* =================================================
              PEOPLE LAYER
              ================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 32,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
            className="
              relative
              mt-32
              overflow-hidden
              rounded-[32px]
              border
              border-[var(--border-subtle)]
              bg-[var(--surface-1)]
            "
          >
            {/* PEOPLE ATMOSPHERE */}

            <div
              className="
                pointer-events-none
                absolute
                left-[-140px]
                top-[-160px]
                h-[420px]
                w-[420px]
                rounded-full
                opacity-20
                blur-[120px]
              "
              style={{
                background: "var(--brand-blue)",
              }}
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-180px]
                right-[-100px]
                h-[420px]
                w-[420px]
                rounded-full
                opacity-15
                blur-[120px]
              "
              style={{
                background: "var(--brand-green)",
              }}
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-30
                [mask-image:linear-gradient(to_bottom,black,transparent_90%)]
              "
            >
              <div className="sorvis-grid absolute inset-0" />
            </div>

            <div className="relative p-7 sm:p-10 lg:p-14">
              {/* PEOPLE HEADER */}

              <div
                className="
                  grid
                  gap-10
                  lg:grid-cols-[1fr_0.72fr]
                  lg:items-end
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-[var(--accent-soft)]
                        bg-[var(--accent-soft)]
                      "
                    >
                      <Users
                        className="h-3.5 w-3.5"
                        style={{
                          color: "var(--accent)",
                        }}
                        strokeWidth={1.7}
                      />
                    </div>

                    <span
                      className="
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.24em]
                        text-[var(--accent)]
                      "
                    >
                      People layer
                    </span>
                  </div>

                  <h2
                    className="
                      mt-6
                      max-w-3xl
                      font-display
                      text-4xl
                      font-medium
                      leading-[0.98]
                      tracking-[-0.055em]
                      text-[var(--text-primary)]
                      sm:text-5xl
                      lg:text-6xl
                    "
                  >
                    The people behind
                    <br />

                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(105deg, var(--brand-blue), var(--brand-teal), var(--brand-green))",
                      }}
                    >
                      what&apos;s being built.
                    </span>
                  </h2>
                </div>

                <p
                  className="
                    max-w-md
                    font-body
                    text-sm
                    leading-7
                    text-[var(--text-secondary)]
                  "
                >
                  Projects are only one part of the ecosystem.
                  Sorvis is also building a structured layer for
                  understanding the people, skills, and creative
                  talent moving Web3 forward.
                </p>
              </div>

              {/* PEOPLE SIGNAL HEADER */}

              <div
                className="
                  mt-14
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  border-y
                  border-[var(--border-subtle)]
                  py-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-muted)]
                  "
                >
                  <motion.span
                    animate={{
                      opacity: [0.35, 1, 0.35],
                      scale: [0.85, 1.1, 0.85],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "var(--brand-green)",
                      boxShadow:
                        "0 0 8px var(--brand-green)",
                    }}
                  />

                  People intelligence
                </div>

                <span className="h-3 w-px bg-[var(--border-subtle)]" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-faint)]
                  "
                >
                  Profiles
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-faint)]
                  "
                >
                  Skills
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-faint)]
                  "
                >
                  Platforms
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-[var(--text-faint)]
                  "
                >
                  Portfolio
                </span>
              </div>

              {/* PEOPLE FEATURE GRID */}

              <div
                className="
                  mt-10
                  grid
                  gap-px
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--border-subtle)]
                  md:grid-cols-2
                "
              >
                {peopleLayers.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.article
                      key={item.number}
                      initial={{
                        opacity: 0,
                        y: 22,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.08,
                        ease,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="
                        group
                        relative
                        min-h-[250px]
                        overflow-hidden
                        bg-[var(--bg-secondary)]
                        p-7
                        transition-colors
                        duration-500
                        hover:bg-[var(--bg-tertiary)]
                        sm:p-8
                      "
                    >
                      {/* Hover light */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.7,
                        }}
                        whileHover={{
                          opacity: 0.22,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease,
                        }}
                        className="
                          pointer-events-none
                          absolute
                          right-[-50px]
                          top-[-50px]
                          h-44
                          w-44
                          rounded-full
                          blur-[70px]
                        "
                        style={{
                          background: item.color,
                        }}
                      />

                      {/* Corner number */}

                      <div
                        className="
                          absolute
                          right-7
                          top-7
                          font-mono
                          text-[8px]
                          tracking-[0.18em]
                          text-[var(--text-faint)]
                        "
                      >
                        {item.number}
                      </div>

                      {/* Icon */}

                      <motion.div
                        whileHover={{
                          rotate: -4,
                          scale: 1.05,
                        }}
                        transition={{
                          duration: 0.3,
                          ease,
                        }}
                        className="
                          relative
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          border
                          bg-[var(--surface-1)]
                        "
                        style={{
                          borderColor: `color-mix(in srgb, ${item.color} 25%, transparent)`,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{
                            color: item.color,
                          }}
                          strokeWidth={1.6}
                        />

                        <motion.span
                          animate={{
                            opacity: [0.15, 0.5, 0.15],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="
                            absolute
                            inset-0
                            rounded-xl
                          "
                          style={{
                            boxShadow: `inset 0 0 20px ${item.color}`,
                          }}
                        />
                      </motion.div>

                      <h3
                        className="
                          relative
                          mt-9
                          font-display
                          text-xl
                          font-medium
                          tracking-[-0.025em]
                          text-[var(--text-primary)]
                        "
                      >
                        {item.label}
                      </h3>

                      <p
                        className="
                          relative
                          mt-3
                          max-w-md
                          font-body
                          text-sm
                          leading-6
                          text-[var(--text-secondary)]
                        "
                      >
                        {item.description}
                      </p>

                      <div
                        className="
                          relative
                          mt-7
                          flex
                          items-center
                          gap-2
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-[0.15em]
                          text-[var(--text-faint)]
                        "
                      >
                        <span
                          className="h-px w-8 transition-all duration-500 group-hover:w-14"
                          style={{
                            background: item.color,
                          }}
                        />

                        People signal
                      </div>
                    </motion.article>
                  )
                })}
              </div>

              {/* CREATOR PROFILE VISUAL */}

              <div
                className="
                  mt-5
                  grid
                  gap-5
                  lg:grid-cols-[1.15fr_0.85fr]
                "
              >
                {/* Profile mock */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -18,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.75,
                    ease,
                  }}
                  className="
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--bg-secondary)]
                    p-6
                    sm:p-8
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      opacity-30
                    "
                    style={{
                      background:
                        "radial-gradient(circle at 85% 15%, var(--accent-soft), transparent 35%)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{
                            y: [0, -2, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="
                            relative
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[var(--accent-soft)]
                            bg-[var(--surface-2)]
                          "
                        >
                          <div
                            className="
                              absolute
                              inset-0
                              opacity-40
                            "
                            style={{
                              background:
                                "linear-gradient(135deg, var(--brand-blue), var(--brand-teal))",
                            }}
                          />

                          <UserRound
                            className="relative h-5 w-5 text-white"
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        <div>
                          <div
                            className="
                              font-display
                              text-base
                              font-medium
                              tracking-[-0.02em]
                              text-[var(--text-primary)]
                            "
                          >
                            Creator profile
                          </div>

                          <div
                            className="
                              mt-1
                              font-mono
                              text-[8px]
                              uppercase
                              tracking-[0.14em]
                              text-[var(--text-muted)]
                            "
                          >
                            Identity · Skills · Work
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-[var(--accent-soft)]
                          bg-[var(--accent-soft)]
                          px-2.5
                          py-1
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.12em]
                          text-[var(--accent)]
                        "
                      >
                        <Radio className="h-2.5 w-2.5" />
                        Active
                      </div>
                    </div>

                    {/* Skills */}

                    <div className="mt-8">
                      <div
                        className="
                          mb-4
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          className="
                            font-mono
                            text-[8px]
                            uppercase
                            tracking-[0.16em]
                            text-[var(--text-muted)]
                          "
                        >
                          Signal profile
                        </span>

                        <span
                          className="
                            font-mono
                            text-[8px]
                            text-[var(--text-faint)]
                          "
                        >
                          LIVE
                        </span>
                      </div>

                      <div className="space-y-4">
                        {creatorSignals.map((signal) => (
                          <div key={signal.label}>
                            <div
                              className="
                                mb-1.5
                                flex
                                items-center
                                justify-between
                              "
                            >
                              <span
                                className="
                                  font-body
                                  text-[10px]
                                  text-[var(--text-secondary)]
                                "
                              >
                                {signal.label}
                              </span>

                              <span
                                className="
                                  font-mono
                                  text-[8px]
                                  text-[var(--text-muted)]
                                "
                              >
                                {signal.value}%
                              </span>
                            </div>

                            <div
                              className="
                                h-1
                                overflow-hidden
                                rounded-full
                                bg-[var(--surface-3)]
                              "
                            >
                              <motion.div
                                initial={{
                                  width: 0,
                                }}
                                whileInView={{
                                  width: `${signal.value}%`,
                                }}
                                viewport={{
                                  once: true,
                                }}
                                transition={{
                                  duration: 1,
                                  delay: 0.25,
                                  ease,
                                }}
                                className="h-full rounded-full"
                                style={{
                                  background: signal.color,
                                  boxShadow: `0 0 10px ${signal.color}`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Portfolio signals */}

                    <div
                      className="
                        mt-8
                        grid
                        grid-cols-3
                        gap-2
                      "
                    >
                      {[
                        {
                          label: "Projects",
                          value: "12",
                        },
                        {
                          label: "Platforms",
                          value: "08",
                        },
                        {
                          label: "Skills",
                          value: "14",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay: 0.35 + index * 0.08,
                            duration: 0.5,
                            ease,
                          }}
                          className="
                            rounded-xl
                            border
                            border-[var(--border-subtle)]
                            bg-[var(--surface-1)]
                            p-3
                          "
                        >
                          <div
                            className="
                              font-display
                              text-lg
                              font-medium
                              tracking-[-0.03em]
                              text-[var(--text-primary)]
                            "
                          >
                            {item.value}
                          </div>

                          <div
                            className="
                              mt-1
                              font-mono
                              text-[7px]
                              uppercase
                              tracking-[0.12em]
                              text-[var(--text-muted)]
                            "
                          >
                            {item.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Creator discovery */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.75,
                    ease,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[var(--border-subtle)]
                    bg-[var(--surface-1)]
                    p-7
                    sm:p-8
                  "
                >
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-[-80px]
                      top-[-80px]
                      h-64
                      w-64
                      rounded-full
                      opacity-15
                      blur-[80px]
                      transition-opacity
                      duration-700
                      group-hover:opacity-25
                    "
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-blue), var(--brand-green))",
                    }}
                  />

                  <div className="relative flex h-full flex-col">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[var(--accent-soft)]
                          bg-[var(--accent-soft)]
                        "
                      >
                        <BriefcaseBusiness
                          className="h-4 w-4"
                          style={{
                            color: "var(--accent)",
                          }}
                          strokeWidth={1.6}
                        />
                      </div>

                      <span
                        className="
                          font-mono
                          text-[8px]
                          uppercase
                          tracking-[0.15em]
                          text-[var(--text-faint)]
                        "
                      >
                        Eventually
                      </span>
                    </div>

                    <h3
                      className="
                        mt-10
                        font-display
                        text-2xl
                        font-medium
                        leading-tight
                        tracking-[-0.035em]
                        text-[var(--text-primary)]
                        sm:text-3xl
                      "
                    >
                      Find the right
                      <br />
                      people for the build.
                    </h3>

                    <p
                      className="
                        mt-4
                        font-body
                        text-sm
                        leading-6
                        text-[var(--text-secondary)]
                      "
                    >
                      Founders will eventually be able to discover
                      creators and talent by skills, experience,
                      platforms, projects, and contribution signals.
                    </p>

                    {/* Animated connection map */}

                    <div
                      className="
                        relative
                        mt-auto
                        h-40
                        overflow-hidden
                        pt-8
                      "
                    >
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-1/2
                          h-px
                          -translate-y-1/2
                        "
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, var(--border-subtle), var(--accent-soft), var(--border-subtle), transparent)",
                        }}
                      />

                      <motion.div
                        animate={{
                          x: ["0%", "100%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="
                          absolute
                          left-0
                          top-[calc(50%-1px)]
                          h-0.5
                          w-16
                          -translate-y-1/2
                          blur-[1px]
                        "
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, var(--brand-blue), transparent)",
                        }}
                      />

                      {[
                        {
                          left: "8%",
                          top: "30%",
                          color: "var(--brand-blue)",
                        },
                        {
                          left: "31%",
                          top: "68%",
                          color: "var(--brand-teal)",
                        },
                        {
                          left: "57%",
                          top: "25%",
                          color: "var(--brand-green)",
                        },
                        {
                          left: "82%",
                          top: "60%",
                          color: "var(--brand-blue)",
                        },
                      ].map((node, index) => (
                        <motion.div
                          key={index}
                          animate={{
                            y: [0, -5, 0],
                            opacity: [0.55, 1, 0.55],
                          }}
                          transition={{
                            duration: 2.8 + index * 0.35,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut",
                          }}
                          className="
                            absolute
                            h-2
                            w-2
                            rounded-full
                          "
                          style={{
                            left: node.left,
                            top: node.top,
                            background: node.color,
                            boxShadow: `0 0 12px ${node.color}`,
                          }}
                        />
                      ))}

                      <div
                        className="
                          absolute
                          bottom-1
                          left-0
                          right-0
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            font-mono
                            text-[7px]
                            uppercase
                            tracking-[0.13em]
                            text-[var(--text-faint)]
                          "
                        >
                          <Zap className="h-2.5 w-2.5" />
                          Skill signals
                        </div>

                        <ArrowRight
                          className="
                            h-3.5
                            w-3.5
                            text-[var(--text-faint)]
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:text-[var(--accent)]
                          "
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* PEOPLE FOOTER */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                  ease,
                }}
                className="
                  mt-8
                  flex
                  flex-col
                  gap-4
                  border-t
                  border-[var(--border-subtle)]
                  pt-6
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.12, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-[var(--accent-soft)]
                      bg-[var(--accent-soft)]
                    "
                  >
                    <Sparkles
                      className="h-3 w-3"
                      style={{
                        color: "var(--accent)",
                      }}
                    />
                  </motion.span>

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-[var(--text-muted)]
                    "
                  >
                    From project intelligence to people
                    intelligence
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.14em]
                    text-[var(--text-faint)]
                  "
                >
                  <span>Discover talent</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* =================================================
              VISION
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="
              relative
              mt-24
              overflow-hidden
              rounded-[28px]
              border
              border-[var(--border-subtle)]
              bg-[var(--surface-1)]
              px-7
              py-12
              sm:px-12
              sm:py-16
              lg:px-16
              lg:py-20
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[280px]
                w-[600px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                opacity-20
                blur-[110px]
              "
              style={{
                background:
                  "linear-gradient(90deg, var(--brand-blue), var(--brand-teal), var(--brand-green))",
              }}
            />

            <div className="relative mx-auto max-w-4xl text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[var(--accent-soft)]
                  bg-[var(--accent-soft)]
                "
              >
                <Eye
                  className="h-4 w-4"
                  style={{
                    color: "var(--accent)",
                  }}
                  strokeWidth={1.7}
                />
              </div>

              <span
                className="
                  mt-5
                  block
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.24em]
                  text-[var(--accent)]
                "
              >
                The vision
              </span>

              <h3
                className="
                  mt-5
                  font-display
                  text-3xl
                  font-medium
                  leading-[1.05]
                  tracking-[-0.045em]
                  text-[var(--text-primary)]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Make the Web3 ecosystem
                <br />
                easier to understand.
              </h3>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-2xl
                  font-body
                  text-sm
                  leading-7
                  text-[var(--text-secondary)]
                  sm:text-base
                "
              >
                Sorvis aims to become the intelligence layer
                connecting the people, projects, capital, and
                opportunities shaping Web3.
              </p>

              <div
                className="
                  mx-auto
                  mt-9
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span
                  className="h-px w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--brand-blue))",
                  }}
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-[var(--text-muted)]
                  "
                >
                  Discover · Understand · Connect
                </span>

                <span
                  className="h-px w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-teal), transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Hero