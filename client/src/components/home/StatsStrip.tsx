import { motion } from "framer-motion"

const stats = [
  ["3,352", "Projects indexed"],
  ["100+", "Ecosystems"],
  ["8", "Core categories"],
  ["24/7", "Discovery layer"],
]

const ease = [0.16, 1, 0.3, 1] as const

function StatsStrip() {
  return (
    <section
      className="
        border-y
        border-[var(--border-subtle)]
        bg-[var(--bg-root)]
        transition-colors
        duration-300
      "
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {stats.map(([value, label], index) => (
          <motion.div
            key={label}
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease,
            }}
            whileHover={{
              backgroundColor: "var(--surface-1)",
            }}
            className={`
              group
              relative
              overflow-hidden
              px-5
              py-7
              transition-colors
              duration-300
              sm:px-8
              sm:py-8

              ${
                index < stats.length - 1
                  ? "border-r border-[var(--border-subtle)]"
                  : ""
              }

              ${
                index === 1
                  ? "border-r-0 lg:border-r"
                  : ""
              }

              ${
                index === 2
                  ? "border-t border-[var(--border-subtle)] lg:border-t-0"
                  : ""
              }

              ${
                index === 3
                  ? "border-t border-[var(--border-subtle)] lg:border-t-0"
                  : ""
              }
            `}
          >
            {/* Top accent signal */}
            <motion.div
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              whileHover={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.35,
                ease,
              }}
              className="
                absolute
                inset-x-0
                top-0
                h-px
                origin-left
                bg-[var(--accent)]
              "
            />

            {/* Subtle ambient accent */}
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-[var(--glow-soft)]
                opacity-0
                blur-2xl
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            <div className="relative flex items-baseline justify-between gap-4">
              <motion.p
                whileHover={{
                  x: 2,
                }}
                transition={{
                  duration: 0.25,
                  ease,
                }}
                className="
                  font-mono
                  text-xl
                  font-medium
                  tracking-[-0.04em]
                  text-[var(--accent)]
                  transition-colors
                  duration-300
                  sm:text-2xl
                "
              >
                {value}
              </motion.p>

              <span
                className="
                  hidden
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.16em]
                  text-[var(--text-faint)]
                  transition-colors
                  duration-300
                  group-hover:text-[var(--accent)]
                  sm:block
                "
              >
                0{index + 1}
              </span>
            </div>

            <p
              className="
                relative
                mt-1
                font-mono
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-[var(--text-muted)]
                transition-colors
                duration-300
                group-hover:text-[var(--text-secondary)]
              "
            >
              {label}
            </p>

            {/* Bottom activity line */}
            <div
              className="
                relative
                mt-5
                h-px
                w-full
                overflow-hidden
                bg-[var(--border-subtle)]
              "
            >
              <motion.div
                initial={{
                  x: "-100%",
                }}
                whileInView={{
                  x: "0%",
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.25 + index * 0.08,
                  ease,
                }}
                className="
                  h-full
                  w-1/3
                  bg-[var(--accent)]
                  opacity-70
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />
            </div>

            {/* Active indicator */}
            <div
              className="
                absolute
                bottom-0
                right-5
                h-1
                w-1
                rounded-full
                bg-[var(--accent)]
                opacity-30
                transition-all
                duration-300
                group-hover:opacity-100
                group-hover:shadow-[0_0_8px_var(--accent)]
                sm:right-8
              "
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default StatsStrip