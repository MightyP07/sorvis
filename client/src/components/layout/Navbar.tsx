import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "wouter"

import { useTheme } from "../theme/ThemeProvider"

/*
 * =========================================================
 * LOGO
 * =========================================================
 *
 * When your real logo is ready, put it in:
 *
 * client/public/sorvis-logo.png
 *
 * Then change this to:
 *
 * const LOGO_SRC = "/sorvis-logo.png"
 *
 * Until then, leave it null to use the temporary mark.
 */

const LOGO_SRC: string | null = "/sorvis-logo.png"

const navItems = [
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "Ecosystems",
    href: "/ecosystems",
  },
  {
    label: "About",
    href: "/about",
  },
]

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.65, 0, 0.35, 1] as const,
      when: "afterChildren",
    },
  },
}

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()

  const { theme, toggleTheme } = useTheme()

  const isDark = theme === "dark"

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/"
    }

    return location.startsWith(href)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Ambient navbar fade */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-24
          bg-gradient-to-b
          from-[var(--glow-soft)]
          to-transparent
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-4 pt-3 sm:px-6 lg:px-8">
        {/* =================================================
            NAVBAR FRAME
            ================================================= */}

        <div
          className="
            relative flex h-[68px] items-center justify-between
            overflow-hidden rounded-[18px]
            border border-[var(--border-subtle)]
            bg-[var(--surface-glass)]
            px-4
            shadow-[var(--shadow-md)]
            backdrop-blur-xl
            transition-colors duration-300
            sm:px-5 lg:px-6
          "
        >
          {/* Top highlight */}
          <div
            className="
              pointer-events-none absolute inset-x-0 top-0 h-px
              bg-gradient-to-r
              from-transparent
              via-[var(--border-accent)]
              to-transparent
            "
          />

          {/* =================================================
              BRAND
              ================================================= */}

          <div className="flex min-w-0 items-center">
            <Link
              href="/"
              onClick={closeMenu}
              className="group relative flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="flex items-center gap-3"
              >
                {/* Logo slot */}
                <div
                  className="
                    relative flex h-8 w-8 shrink-0
                    items-center justify-center
                    overflow-hidden rounded-[10px]
                    border border-[var(--border-default)]
                    bg-[var(--surface-2)]
                  "
                >
                  {LOGO_SRC ? (
                    <img
                      src={LOGO_SRC}
                      alt="Sorvis"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <>
                      {/* Temporary logo mark */}
                      <motion.div
                        className="
                          absolute inset-[5px]
                          rounded-[5px]
                          border border-[var(--border-strong)]
                        "
                        animate={{
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{
                          duration: 16,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <motion.div
                        className="
                          relative h-2 w-2 rounded-full
                          bg-[var(--accent)]
                        "
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.75, 1, 0.75],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut" as const,
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Brand name */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="
                      font-display text-[16px] font-semibold
                      tracking-[-0.045em]
                      text-[var(--text-primary)]
                    "
                  >
                    SORVIS
                  </span>

                  <span
                    className="
                      hidden font-mono text-[8px] font-medium
                      tracking-[0.22em]
                      text-[var(--text-muted)]
                      sm:inline
                    "
                  >
                    INTELLIGENCE
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav
            className="
              absolute left-1/2 hidden
              -translate-x-1/2
              items-center
              md:flex
            "
          >
            <div
              className="
                flex items-center rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                p-1
              "
            >
              {navItems.map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <motion.div
                      whileHover={{
                        color: "var(--text-primary)",
                      }}
                      transition={{ duration: 0.2 }}
                      className={`
                        relative flex h-9 items-center
                        rounded-full px-4
                        font-body text-[11px] font-medium
                        transition-colors duration-200
                        ${
                          active
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                        }
                      `}
                    >
                      {active && (
                        <motion.div
                          layoutId="navbar-active"
                          className="
                            absolute inset-0 rounded-full
                            border border-[var(--border-subtle)]
                            bg-[var(--surface-2)]
                          "
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                            mass: 0.7,
                          }}
                        />
                      )}

                      <span className="relative z-10">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}

          <div className="hidden items-center gap-2 md:flex">
            {/* Theme toggle */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="
                relative flex h-9 w-9
                items-center justify-center
                overflow-hidden rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                text-[var(--text-tertiary)]
                transition-colors duration-200
                hover:bg-[var(--surface-2)]
                hover:text-[var(--text-primary)]
              "
              aria-label={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.65,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.65,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                  >
                    <Sun className="h-[14px] w-[14px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.65,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.65,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1 as const],
                    }}
                  >
                    <Moon className="h-[14px] w-[14px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Sign in */}
            <Link
              href="/login"
              className="
                group flex h-9 items-center
                rounded-full px-3.5
                font-body text-[11px] font-medium
                text-[var(--text-tertiary)]
                transition-colors
                hover:text-[var(--text-primary)]
              "
            >
              Sign in
            </Link>

            {/* Signup */}
            <Link href="/register">
              <motion.div
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                className="
                  group relative flex h-10
                  items-center gap-2
                  overflow-hidden rounded-full
                  border border-[var(--border-strong)]
                  bg-[var(--accent)]
                  px-4
                  font-body text-[11px] font-semibold
                  text-[var(--text-inverse)]
                "
              >
                <motion.div
                  variants={{
                    hover: {
                      x: 0,
                      opacity: 1,
                    },
                  }}
                  initial={{
                    x: "-100%",
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="
                    absolute inset-0
                    bg-[var(--accent-hover)]
                  "
                />

                <span className="relative z-10">
                  Register
                </span>

                <motion.span
                  variants={{
                    hover: {
                      x: 2,
                      y: -2,
                    },
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="relative z-10"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.span>
              </motion.div>
            </Link>
          </div>

          {/* =================================================
              MOBILE ACTIONS
              ================================================= */}

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile theme toggle */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="
                relative flex h-9 w-9
                items-center justify-center
                overflow-hidden rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                text-[var(--text-tertiary)]
                transition-colors
                hover:text-[var(--text-primary)]
              "
              aria-label={
                isDark
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="mobile-sun"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.65,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.65,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-[14px] w-[14px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile-moon"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.65,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.65,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-[14px] w-[14px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Search */}
            <Link
              href="/explore"
              onClick={closeMenu}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                text-[var(--text-tertiary)]
                transition-colors
                hover:text-[var(--text-primary)]
              "
              aria-label="Explore"
            >
              <Search className="h-[15px] w-[15px]" />
            </Link>

            {/* Menu */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setOpen((value) => !value)}
              className="
                relative flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-[var(--border-subtle)]
                bg-[var(--surface-1)]
                text-[var(--text-secondary)]
              "
              aria-label={
                open
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-[15px] w-[15px]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 45,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -45,
                      scale: 0.7,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-[15px] w-[15px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
            ================================================= */}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                relative mt-2 overflow-hidden
                rounded-[18px]
                border border-[var(--border-subtle)]
                bg-[var(--surface-glass-heavy)]
                shadow-[var(--shadow-lg)]
                backdrop-blur-xl
                md:hidden
              "
            >
              <div className="p-2">
                {/* Menu label */}
                <motion.div
                  variants={mobileItemVariants}
                  className="
                    mb-2 border-b
                    border-[var(--border-subtle)]
                    px-3 py-4
                  "
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="
                        h-1.5 w-1.5 rounded-full
                        bg-[var(--text-tertiary)]
                      "
                    />

                    <span
                      className="
                        font-mono text-[8px]
                        uppercase tracking-[0.2em]
                        text-[var(--text-muted)]
                      "
                    >
                      Web3 intelligence layer
                    </span>
                  </div>
                </motion.div>

                {/* Navigation links */}
                {navItems.map((item, index) => {
                  const active = isActive(item.href)

                  return (
                    <motion.div
                      key={item.href}
                      variants={mobileItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`
                          group flex items-center
                          justify-between rounded-[13px]
                          px-3 py-3.5
                          transition-colors
                          ${
                            active
                              ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`
                              font-mono text-[8px]
                              ${
                                active
                                  ? "text-[var(--text-tertiary)]"
                                  : "text-[var(--text-muted)]"
                              }
                            `}
                          >
                            0{index + 1}
                          </span>

                          <span className="font-body text-sm font-medium">
                            {item.label}
                          </span>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            x: active ? 0 : -3,
                            opacity: active ? 1 : 0.25,
                          }}
                          whileHover={{
                            x: 2,
                            opacity: 1,
                          }}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Sign in */}
                <motion.div
                  variants={mobileItemVariants}
                  className="
                    mt-2 border-t
                    border-[var(--border-subtle)]
                    pt-2
                  "
                >
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="
                      flex items-center
                      justify-between rounded-[13px]
                      px-3 py-3.5
                      text-[var(--text-secondary)]
                      transition-colors
                      hover:bg-[var(--surface-1)]
                      hover:text-[var(--text-primary)]
                    "
                  >
                    <span className="font-body text-sm font-medium">
                      Sign in
                    </span>

                    <ChevronDown
                      className="
                        h-4 w-4
                        -rotate-90
                        opacity-30
                      "
                    />
                  </Link>
                </motion.div>

                {/* Signup */}
                <motion.div
                  variants={mobileItemVariants}
                  className="mt-2"
                >
                  <Link
                    href="/submit"
                    onClick={closeMenu}
                    className="
                      group flex items-center
                      justify-between rounded-[13px]
                      bg-[var(--accent)]
                      px-4 py-3.5
                      text-[var(--text-inverse)]
                    "
                  >
                    <span className="font-body text-sm font-semibold">
                      Register
                    </span>

                    <motion.span
                      initial={false}
                      whileHover={{
                        x: 3,
                        y: -3,
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar