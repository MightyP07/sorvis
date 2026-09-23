import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
  ArrowUpRight,
  Check,
  CircleDollarSign,
  Code2,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  Radio,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react"

const ease = [0.16, 1, 0.3, 1] as const

type Source = {
  name: string
  type: string
  icon: LucideIcon
  signalDelay: number
}

const sources: Source[] = [
  {
    name: "X",
    type: "Activity",
    icon: Radio,
    signalDelay: 0,
  },
  {
    name: "GitHub",
    type: "Development",
    icon: Code2,
    signalDelay: 0.7,
  },
  {
    name: "Discord",
    type: "Community",
    icon: MessageCircle,
    signalDelay: 1.4,
  },
  {
    name: "Website",
    type: "Project",
    icon: Globe2,
    signalDelay: 0.35,
  },
  {
    name: "Funding",
    type: "Capital",
    icon: CircleDollarSign,
    signalDelay: 1.05,
  },
  {
    name: "On-chain",
    type: "Activity",
    icon: Database,
    signalDelay: 1.75,
  },
]

const metrics = [
  {
    label: "Funding",
    value: "$18.5M",
    icon: CircleDollarSign,
  },
  {
    label: "Users",
    value: "284K",
    icon: Users,
  },
  {
    label: "Growth",
    value: "+42.8%",
    icon: TrendingUp,
  },
]

function SignalPulse({
  delay,
  size = "normal",
}: {
  delay: number
  size?: "small" | "normal"
}) {
  return (
    <motion.span
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: [0.5, 1.8, 2.4],
        opacity: [0, 0.3, 0],
      }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8,
      }}
      className={`
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-[var(--accent)]
        ${
          size === "small"
            ? "h-5 w-5"
            : "h-7 w-7"
        }
      `}
    />
  )
}

function SourceNode({
  source,
  index,
}: {
  source: Source
  index: number
}) {
  const Icon = source.icon

  const isLeft = index < 3

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -12 : 12,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.55,
        delay: 0.08 + index * 0.06,
        ease,
      }}
      whileHover={{
        y: -2,
      }}
      className="group"
    >
      <div
        className="
          relative
          flex
          items-center
          gap-2.5
          rounded-xl
          border
          border-[var(--border-subtle)]
          bg-[var(--surface-1)]
          px-3
          py-2.5
          shadow-[var(--shadow-sm)]
          transition-all
          duration-300
          group-hover:border-[var(--border-default)]
          group-hover:bg-[var(--surface-2)]
          group-hover:shadow-[var(--shadow-md)]
        "
      >
        <div
          className="
            relative
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-[var(--border-subtle)]
            bg-[var(--surface-2)]
            text-[var(--text-secondary)]
            transition-colors
            duration-300
            group-hover:text-[var(--text-primary)]
          "
        >
          <SignalPulse
            delay={source.signalDelay}
            size="small"
          />

          <Icon className="relative z-10 h-3.5 w-3.5" />
        </div>

        <div className="min-w-0">
          <p
            className="
              font-body
              text-[10px]
              font-semibold
              tracking-[-0.01em]
              text-[var(--text-primary)]
            "
          >
            {source.name}
          </p>

          <p
            className="
              mt-0.5
              font-mono
              text-[7px]
              uppercase
              tracking-[0.12em]
              text-[var(--text-muted)]
            "
          >
            {source.type}
          </p>
        </div>

        <motion.span
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: source.signalDelay,
            ease: "easeInOut",
          }}
          className="
            ml-auto
            h-1.5
            w-1.5
            shrink-0
            rounded-full
            bg-[var(--success)]
          "
        />
      </div>
    </motion.div>
  )
}

function ActivityField() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Horizontal atmospheric sweep */}
      <motion.div
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
        className="
          absolute
          left-0
          top-[34%]
          h-px
          w-[45%]
          bg-gradient-to-r
          from-transparent
          via-[var(--border-strong)]
          to-transparent
        "
      />

      {/* Second sweep */}
      <motion.div
        initial={{
          x: "100%",
          opacity: 0,
        }}
        animate={{
          x: ["100%", "-100%"],
          opacity: [0, 0.22, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut",
          repeatDelay: 4,
        }}
        className="
          absolute
          right-0
          top-[68%]
          h-px
          w-[38%]
          bg-gradient-to-l
          from-transparent
          via-[var(--border-strong)]
          to-transparent
        "
      />

      {/* Vertical scan */}
      <motion.div
        initial={{
          y: "-100%",
          opacity: 0,
        }}
        animate={{
          y: ["-100%", "100%"],
          opacity: [0, 0.14, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut",
          repeatDelay: 5,
        }}
        className="
          absolute
          left-[58%]
          top-0
          h-[35%]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[var(--border-default)]
          to-transparent
        "
      />

      {/* Floating micro-points */}
      <motion.span
        animate={{
          y: [0, -12, 0],
          x: [0, 4, 0],
          opacity: [0.15, 0.45, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[28%]
          top-[21%]
          h-1
          w-1
          rounded-full
          bg-[var(--accent)]
        "
      />

      <motion.span
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: 1.4,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[27%]
          top-[25%]
          h-1
          w-1
          rounded-full
          bg-[var(--accent)]
        "
      />

      <motion.span
        animate={{
          y: [0, -8, 0],
          opacity: [0.12, 0.35, 0.12],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[35%]
          bottom-[25%]
          h-1
          w-1
          rounded-full
          bg-[var(--text-muted)]
        "
      />

      <motion.span
        animate={{
          y: [0, 7, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          delay: 0.8,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[34%]
          bottom-[21%]
          h-1
          w-1
          rounded-full
          bg-[var(--text-muted)]
        "
      />
    </div>
  )
}

function IntelligenceLogo() {
  return (
    <div
      className="
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-[var(--border-default)]
        bg-[var(--surface-2)]
      "
    >
      {/* Outer rotating frame */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[18px]
          w-[18px]
          rounded-md
          border
          border-[var(--border-strong)]
        "
      />

      {/* Inner frame */}
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-2.5
          w-2.5
          rounded-sm
          border
          border-[var(--border-subtle)]
        "
      />

      {/* Core */}
      <motion.span
        animate={{
          scale: [0.8, 1.15, 0.8],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-1.5
          w-1.5
          rounded-full
          bg-[var(--accent)]
          shadow-[0_0_8px_var(--accent)]
        "
      />
    </div>
  )
}

function IntelligenceScan() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        rounded-[20px]
      "
    >
      {/* Top-to-bottom scanning beam */}
      <motion.div
        initial={{
          y: "-120%",
          opacity: 0,
        }}
        animate={{
          y: ["-120%", "120%"],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 2,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-x-0
          top-0
          h-[35%]
          bg-gradient-to-b
          from-transparent
          via-[var(--accent)]
          to-transparent
          opacity-20
        "
      />

      {/* Fine horizontal scan */}
      <motion.div
        initial={{
          x: "-110%",
        }}
        animate={{
          x: ["-110%", "110%"],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          delay: 5,
          repeatDelay: 7,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-0
          top-[58%]
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[var(--border-strong)]
          to-transparent
          opacity-30
        "
      />
    </div>
  )
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <div
      className="
        min-w-0
        border-l
        border-[var(--border-subtle)]
        pl-3
        first:border-l-0
        first:pl-0
      "
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className="
            h-3
            w-3
            shrink-0
            text-[var(--text-muted)]
          "
        />

        <span
          className="
            truncate
            font-mono
            text-[7px]
            uppercase
            tracking-[0.1em]
            text-[var(--text-muted)]
          "
        >
          {label}
        </span>
      </div>

      <motion.p
        initial={{
          opacity: 0,
          y: 4,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          ease,
        }}
        className="
          mt-1
          font-display
          text-sm
          font-semibold
          tracking-[-0.04em]
          text-[var(--text-primary)]
        "
      >
        {value}
      </motion.p>
    </div>
  )
}

function MomentumScore() {
  return (
    <div
      className="
        relative
        mx-4
        mb-4
        mt-4
        overflow-hidden
        rounded-xl
        border
        border-[var(--border-subtle)]
        bg-[var(--surface-2)]
        px-3
        py-2.5
        transition-colors
        duration-300
      "
    >
      {/* Progress sweep */}
      <motion.div
        initial={{
          x: "-100%",
        }}
        whileInView={{
          x: "0%",
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
          delay: 0.45,
          ease,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-[87%]
          bg-[var(--success)]
        "
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-[var(--border-subtle)]
              bg-[var(--surface-1)]
            "
          >
            <TrendingUp
              className="
                h-3.5
                w-3.5
                text-[var(--success)]
              "
            />
          </div>

          <div>
            <p
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.1em]
                text-[var(--text-muted)]
              "
            >
              Momentum
            </p>

            <p
              className="
                mt-0.5
                font-body
                text-[9px]
                text-[var(--text-secondary)]
              "
            >
              Strong growth signal
            </p>
          </div>
        </div>

        <div className="flex items-baseline">
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease,
            }}
            className="
              font-display
              text-2xl
              font-semibold
              tracking-[-0.06em]
              text-[var(--text-primary)]
            "
          >
            87
          </motion.span>

          <span
            className="
              ml-1
              font-mono
              text-[7px]
              text-[var(--text-muted)]
            "
          >
            /100
          </span>
        </div>
      </div>
    </div>
  )
}

function IntelligenceCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        ease,
      }}
      className="
        relative
        z-20
        w-full
        max-w-[390px]
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[20px]
          border
          border-[var(--border-default)]
          bg-[var(--surface-1)]
          shadow-[var(--shadow-lg)]
          transition-colors
          duration-300
        "
      >
        <IntelligenceScan />

        {/* Project header */}
        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            border-b
            border-[var(--border-subtle)]
            px-4
            py-3.5
          "
        >
          <div className="flex items-center gap-3">
            <IntelligenceLogo />

            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className="
                    font-display
                    text-sm
                    font-semibold
                    tracking-[-0.025em]
                    text-[var(--text-primary)]
                  "
                >
                  Meridian
                </span>

                <span
                  className="
                    flex
                    h-3.5
                    w-3.5
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--success-soft)]
                  "
                >
                  <Check
                    className="
                      h-2.5
                      w-2.5
                      text-[var(--success)]
                    "
                  />
                </span>
              </div>

              <p
                className="
                  mt-0.5
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.12em]
                  text-[var(--text-muted)]
                "
              >
                Infrastructure · Ethereum
              </p>
            </div>
          </div>

          <ArrowUpRight
            className="
              h-3.5
              w-3.5
              text-[var(--text-muted)]
            "
          />
        </div>

        {/* Description */}
        <div className="relative z-10 px-4 pt-4">
          <p
            className="
              max-w-[320px]
              font-body
              text-[10px]
              leading-5
              text-[var(--text-secondary)]
            "
          >
            Cross-chain infrastructure connecting applications,
            liquidity and verifiable on-chain activity.
          </p>
        </div>

        {/* Verification */}
        <div
          className="
            relative
            z-10
            mx-4
            mt-4
            flex
            items-center
            justify-between
            border-y
            border-[var(--border-subtle)]
            py-3
          "
        >
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="
                h-3.5
                w-3.5
                text-[var(--success)]
              "
            />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.12em]
                text-[var(--text-muted)]
              "
            >
              Verified signals
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1
                w-1
                rounded-full
                bg-[var(--success)]
              "
            />

            <span
              className="
                font-mono
                text-[8px]
                font-semibold
                text-[var(--success)]
              "
            >
              94%
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div
          className="
            relative
            z-10
            grid
            grid-cols-3
            gap-3
            px-4
            pt-4
          "
        >
          {metrics.map((metric) => (
            <Metric
              key={metric.label}
              {...metric}
            />
          ))}
        </div>

        <MomentumScore />
      </div>
    </motion.div>
  )
}

function MobileSource({
  source,
  index,
}: {
  source: Source
  index: number
}) {
  const Icon = source.icon

  return (
    <motion.div
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
        duration: 0.4,
        delay: index * 0.05,
        ease,
      }}
      className="
        relative
        flex
        min-w-0
        items-center
        gap-2
        rounded-lg
        border
        border-[var(--border-subtle)]
        bg-[var(--surface-2)]
        px-2.5
        py-2
        transition-colors
        duration-300
      "
    >
      <div className="relative shrink-0">
        <Icon
          className="
            h-3
            w-3
            text-[var(--text-muted)]
          "
        />

        <motion.span
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.7, 2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: source.signalDelay,
            ease: "easeOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[var(--accent)]
          "
        />
      </div>

      <span
        className="
          truncate
          font-mono
          text-[7px]
          uppercase
          tracking-[0.08em]
          text-[var(--text-secondary)]
        "
      >
        {source.name}
      </span>

      <motion.span
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay: source.signalDelay,
          ease: "easeInOut",
        }}
        className="
          ml-auto
          h-1
          w-1
          shrink-0
          rounded-full
          bg-[var(--success)]
        "
      />
    </motion.div>
  )
}

function DesktopSources() {
  return (
    <>
      <div
        className="
          absolute
          left-[3%]
          top-1/2
          z-10
          flex
          w-[175px]
          -translate-y-1/2
          flex-col
          gap-5
        "
      >
        {sources.slice(0, 3).map((source, index) => (
          <SourceNode
            key={source.name}
            source={source}
            index={index}
          />
        ))}
      </div>

      <div
        className="
          absolute
          right-[3%]
          top-1/2
          z-10
          flex
          w-[175px]
          -translate-y-1/2
          flex-col
          gap-5
        "
      >
        {sources.slice(3).map((source, index) => (
          <SourceNode
            key={source.name}
            source={source}
            index={index + 3}
          />
        ))}
      </div>
    </>
  )
}

function IntelligenceOrbit() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-[8]
        h-[300px]
        w-[300px]
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* Outer orbital ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-0
          rounded-full
          border
          border-[var(--border-subtle)]
          opacity-50
        "
      >
        <motion.span
          animate={{
            opacity: [0.1, 0.65, 0.1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-0
            h-1.5
            w-1.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--accent)]
            shadow-[0_0_8px_var(--accent)]
          "
        />
      </motion.div>

      {/* Inner orbital ring */}
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-[38px]
          rounded-full
          border
          border-dashed
          border-[var(--border-subtle)]
          opacity-40
        "
      >
        <span
          className="
            absolute
            bottom-0
            left-1/2
            h-1
            w-1
            -translate-x-1/2
            translate-y-1/2
            rounded-full
            bg-[var(--text-muted)]
          "
        />
      </motion.div>
    </div>
  )
}

function DesktopVisual() {
  return (
    <div
      className="
        relative
        hidden
        h-[480px]
        sm:block
      "
    >
      <ActivityField />

      {/* Status */}
      <div
        className="
          absolute
          left-6
          top-6
          z-30
          flex
          items-center
          gap-2
        "
      >
        <motion.span
          animate={{
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-[var(--success)]
          "
        />

        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-[var(--text-muted)]
          "
        >
          Signals active
        </span>
      </div>

      {/* Sources */}
      <DesktopSources />

      {/* Central orbital intelligence */}
      <IntelligenceOrbit />

      {/* Intelligence card */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          flex
          w-[min(78%,390px)]
          -translate-x-1/2
          -translate-y-1/2
          justify-center
        "
      >
        <IntelligenceCard />
      </div>

      {/* Bottom explanation */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-30
          -translate-x-1/2
          rounded-full
          border
          border-[var(--border-subtle)]
          bg-[var(--surface-1)]
          px-3
          py-1.5
          shadow-[var(--shadow-sm)]
        "
      >
        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.12em]
            text-[var(--text-muted)]
          "
        >
          6 signals · continuous intelligence
        </span>
      </div>
    </div>
  )
}

function MobileVisual() {
  return (
    <div className="relative p-4 sm:hidden">
      <ActivityField />

      {/* Mobile status */}
      <div
        className="
          relative
          z-10
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[var(--success)]
            "
          />

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-[var(--text-muted)]
            "
          >
            Live signal layer
          </span>
        </div>

        <span
          className="
            font-mono
            text-[7px]
            text-[var(--text-faint)]
          "
        >
          06 sources
        </span>
      </div>

      {/* Sources */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-3
          gap-2
        "
      >
        {sources.map((source, index) => (
          <MobileSource
            key={source.name}
            source={source}
            index={index}
          />
        ))}
      </div>

      {/* Transition */}
      <div
        className="
          relative
          z-10
          my-5
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            relative
            h-8
            w-px
            overflow-hidden
            bg-[var(--border-subtle)]
          "
        >
          <motion.div
            animate={{
              y: ["-100%", "400%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-1/2
              h-3
              w-px
              -translate-x-1/2
              bg-[var(--accent)]
              shadow-[0_0_8px_var(--accent)]
            "
          />
        </div>
      </div>

      {/* Intelligence */}
      <div className="relative z-20">
        <IntelligenceCard />
      </div>

      {/* Bottom label */}
      <div
        className="
          relative
          z-10
          mt-4
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <span
          className="
            h-px
            w-6
            bg-[var(--border-default)]
          "
        />

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.12em]
            text-[var(--text-muted)]
          "
        >
          Aggregated intelligence
        </span>

        <span
          className="
            h-px
            w-6
            bg-[var(--border-default)]
          "
        />
      </div>
    </div>
  )
}

function EcosystemVisual() {
  return (
    <section
      className="
        border-y
        border-[var(--border-subtle)]
        bg-[var(--bg-root)]
        text-[var(--text-primary)]
        transition-colors
        duration-300
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-8
          sm:px-8
          sm:py-12
          lg:px-10
          lg:py-16
        "
      >
        {/* Section label */}
        <div className="mb-5 flex items-center gap-2">
          <Layers3
            className="
              h-3.5
              w-3.5
              text-[var(--text-muted)]
            "
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
            Project intelligence
          </span>

          <span
            className="
              h-px
              w-8
              bg-[var(--border-default)]
            "
          />
        </div>

        {/* Main visual */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[var(--border-subtle)]
            bg-[var(--surface-1)]
            shadow-[var(--shadow-lg)]
            transition-colors
            duration-300
          "
        >
          {/* Background grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-60
            "
          >
            <div className="sorvis-grid absolute inset-0" />
          </div>

          {/* Ambient intelligence glow */}
          <motion.div
            animate={{
              opacity: [0.07, 0.13, 0.07],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[360px]
              w-[360px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[var(--glow-soft)]
              blur-[110px]
            "
          />

          <DesktopVisual />

          <MobileVisual />

          {/* Bottom statement */}
          <div
            className="
              relative
              z-30
              flex
              flex-col
              gap-3
              border-t
              border-[var(--border-subtle)]
              bg-[var(--surface-1)]
              px-5
              py-4
              transition-colors
              duration-300
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7
            "
          >
            <p
              className="
                max-w-xl
                font-body
                text-xs
                leading-5
                text-[var(--text-secondary)]
              "
            >
              Sorvis turns scattered project signals into a
              clearer picture of what is being built.
            </p>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--surface-2)]
                  px-2.5
                  py-1
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--text-muted)]
                "
              >
                Verified
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--surface-2)]
                  px-2.5
                  py-1
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--text-muted)]
                "
              >
                Momentum
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EcosystemVisual