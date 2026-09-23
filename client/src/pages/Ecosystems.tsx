import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Database,
  Layers3,
  Search,
  X,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "wouter"

import Navbar from "../components/layout/Navbar"

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000"

type Ecosystem = {
  id: string
  name: string
  slug: string
  _count: {
    projects: number
  }
}

type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  logoUrl: string | null
  category: {
    id: string
    name: string
    slug: string
  } | null
  ecosystems: Array<{
    projectId: string
    ecosystemId: string
    ecosystem: {
      id: string
      name: string
      slug: string
    }
  }>
  verification: {
    status: string
  } | null
  metrics: Array<{
    momentumScore: number | null
    users: number | null
    growth: number | null
    tvl: number | null
    recordedAt: string
  }>
}

type SortMode = "projects" | "name"

function formatProjectCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function EcosystemLogo({
  ecosystem,
  large = false,
}: {
  ecosystem: Ecosystem
  large?: boolean
}) {
  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-[14px]",
        "border border-[var(--border-subtle)]",
        "bg-[var(--surface-2)]",
        large ? "h-14 w-14 rounded-[16px]" : "h-10 w-10",
      ].join(" ")}
    >
      <span
        className={[
          "font-mono font-semibold tracking-[-0.04em] text-[var(--text-secondary)]",
          large ? "text-sm" : "text-[11px]",
        ].join(" ")}
      >
        {getInitials(ecosystem.name)}
      </span>
    </div>
  )
}

function ProjectLogo({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)

  if (!project.logoUrl || failed) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
        <span className="font-mono text-[10px] font-semibold uppercase text-[var(--text-secondary)]">
          {getInitials(project.name)}
        </span>
      </div>
    )
  }

  return (
    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-2)]">
      <img
        src={project.logoUrl}
        alt=""
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function Ecosystems() {
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([])
  const [search, setSearch] = useState("")
  const [sortMode, setSortMode] = useState<SortMode>("projects")
  const [sortOpen, setSortOpen] = useState(false)

  const [selected, setSelected] = useState<Ecosystem | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(false)
  const [projectsError, setProjectsError] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadEcosystems() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`${API_URL}/api/ecosystems`)

        if (!response.ok) {
          throw new Error("Failed to load ecosystems.")
        }

        const result = await response.json()

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid ecosystem response.")
        }

        if (!cancelled) {
          setEcosystems(result.data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load ecosystems.",
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadEcosystems()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredEcosystems = useMemo(() => {
    const query = search.trim().toLowerCase()

    const result = ecosystems.filter((ecosystem) =>
      ecosystem.name.toLowerCase().includes(query),
    )

    return [...result].sort((a, b) => {
      if (sortMode === "name") {
        return a.name.localeCompare(b.name)
      }

      return b._count.projects - a._count.projects
    })
  }, [ecosystems, search, sortMode])

  const activeEcosystems = useMemo(() => {
    return ecosystems.filter((ecosystem) => ecosystem._count.projects > 0)
  }, [ecosystems])

  const largestEcosystem = useMemo(() => {
    return [...ecosystems].sort(
      (a, b) => b._count.projects - a._count.projects,
    )[0]
  }, [ecosystems])

  const totalAssociations = useMemo(() => {
    return ecosystems.reduce(
      (total, ecosystem) => total + ecosystem._count.projects,
      0,
    )
  }, [ecosystems])

  async function openEcosystem(ecosystem: Ecosystem) {
    setSelected(ecosystem)
    setProjects([])
    setProjectsError("")
    setProjectsLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/api/projects?ecosystem=${encodeURIComponent(
          ecosystem.slug,
        )}&limit=6`,
      )

      if (!response.ok) {
        throw new Error("Failed to load ecosystem projects.")
      }

      const result = await response.json()

      if (!result.success || !Array.isArray(result.data)) {
        throw new Error("Invalid project response.")
      }

      setProjects(result.data)
    } catch (err) {
      setProjectsError(
        err instanceof Error
          ? err.message
          : "Unable to load projects.",
      )
    } finally {
      setProjectsLoading(false)
    }
  }

  function closeEcosystem() {
    setSelected(null)
    setProjects([])
    setProjectsError("")
  }

  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="pt-28">
        <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="sorvis-grid absolute inset-0" />

            <motion.div
              className="absolute left-[12%] top-24 h-px w-[76%] bg-[var(--border-default)]"
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute right-[16%] top-24 h-32 w-32 rounded-full border border-[var(--border-subtle)]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[var(--text-primary)]" />

                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Ecosystem intelligence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="max-w-4xl font-display text-[clamp(2.8rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.065em]"
              >
                Map the infrastructure
                <br />
                <span className="text-[var(--text-muted)]">
                  your projects build on.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-7 max-w-2xl text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base"
              >
                Explore the ecosystems powering the projects tracked by
                Sorvis. Compare activity by project presence and drill into
                the projects building across each network.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3"
            >
              <div className="bg-[var(--surface-1)] p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 text-[var(--text-muted)]">
                  <Layers3 className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                    Ecosystems
                  </span>
                </div>

                <div className="font-display text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                  {loading ? "—" : formatProjectCount(ecosystems.length)}
                </div>
              </div>

              <div className="bg-[var(--surface-1)] p-5 sm:p-6">
                <div className="mb-3 flex items-center gap-2 text-[var(--text-muted)]">
                  <Database className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                    Associations
                  </span>
                </div>

                <div className="font-display text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                  {loading
                    ? "—"
                    : formatProjectCount(totalAssociations)}
                </div>

                <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                  Projects across ecosystems
                </p>
              </div>

              <div className="col-span-2 bg-[var(--surface-1)] p-5 md:col-span-1 sm:p-6">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Largest ecosystem
                </div>

                <div className="truncate font-display text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                  {loading
                    ? "—"
                    : largestEcosystem?.name || "No data"}
                </div>

                {!loading && largestEcosystem && (
                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                    {formatProjectCount(
                      largestEcosystem._count.projects,
                    )}{" "}
                    project associations
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Directory
              </div>

              <h2 className="font-display text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                Ecosystem directory
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
                Browse the networks represented in the Sorvis project
                database. Project counts reflect the associations currently
                recorded by the platform.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label className="relative block min-w-0 sm:w-[300px]">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
                  strokeWidth={1.7}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search ecosystems..."
                  className="h-11 w-full rounded-[13px] border border-[var(--border-default)] bg-[var(--surface-1)] pl-10 pr-10 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)]"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((value) => !value)}
                  className="flex h-11 w-full items-center justify-between gap-5 rounded-[13px] border border-[var(--border-default)] bg-[var(--surface-1)] px-4 text-sm text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] sm:w-[190px]"
                >
                  <span>
                    {sortMode === "projects"
                      ? "Project count"
                      : "Alphabetical"}
                  </span>

                  <ChevronDown
                    className={[
                      "h-4 w-4 transition-transform",
                      sortOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+6px)] z-20 w-full overflow-hidden rounded-[13px] border border-[var(--border-default)] bg-[var(--surface-glass-heavy)] p-1.5 shadow-2xl backdrop-blur-xl sm:w-[190px]"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSortMode("projects")
                          setSortOpen(false)
                        }}
                        className={[
                          "w-full rounded-[9px] px-3 py-2.5 text-left text-sm transition",
                          sortMode === "projects"
                            ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]",
                        ].join(" ")}
                      >
                        Project count
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSortMode("name")
                          setSortOpen(false)
                        }}
                        className={[
                          "w-full rounded-[9px] px-3 py-2.5 text-left text-sm transition",
                          sortMode === "name"
                            ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]",
                        ].join(" ")}
                      >
                        Alphabetical
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-1)] p-8">
              <div className="font-display text-xl tracking-[-0.03em]">
                Unable to load ecosystems
              </div>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {error}
              </p>
            </div>
          ) : loading ? (
            <div className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[132px] animate-pulse bg-[var(--surface-1)] p-5"
                >
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-[12px] bg-[var(--surface-3)]" />
                    <div className="flex-1">
                      <div className="h-4 w-32 rounded bg-[var(--surface-3)]" />
                      <div className="mt-3 h-3 w-20 rounded bg-[var(--surface-2)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEcosystems.length === 0 ? (
            <div className="rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-1)] p-10 text-center">
              <div className="font-display text-xl tracking-[-0.03em]">
                No ecosystems found
              </div>

              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Try a different search term.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {formatProjectCount(filteredEcosystems.length)}{" "}
                  results
                </span>

                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  {activeEcosystems.length} active
                </span>
              </div>

              <motion.div
                layout
                className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEcosystems.map((ecosystem, index) => (
                    <motion.button
                      key={ecosystem.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(index * 0.015, 0.18),
                      }}
                      type="button"
                      onClick={() => openEcosystem(ecosystem)}
                      className="group relative min-h-[132px] bg-[var(--surface-1)] p-5 text-left transition-colors duration-200 hover:bg-[var(--surface-2)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <EcosystemLogo ecosystem={ecosystem} />

                        <ArrowRight
                          className="mt-1 h-4 w-4 -translate-x-1 text-[var(--text-muted)] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="mt-5">
                        <div className="truncate font-display text-[17px] font-medium tracking-[-0.025em]">
                          {ecosystem.name}
                        </div>

                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            {formatProjectCount(
                              ecosystem._count.projects,
                            )}{" "}
                            projects
                          </span>

                          {ecosystem._count.projects === 0 && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
                              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                                No projects
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-[var(--border-strong)] transition-transform duration-300 group-hover:scale-x-100" />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </section>
      </main>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEcosystem}
              className="fixed inset-0 z-[60] bg-black/35 backdrop-blur-[3px]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 34,
              }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[560px] flex-col border-l border-[var(--border-default)] bg-[var(--bg-root)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <EcosystemLogo ecosystem={selected} large />

                  <div>
                    <div className="font-display text-xl font-medium tracking-[-0.035em]">
                      {selected.name}
                    </div>

                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {formatProjectCount(
                        selected._count.projects,
                      )}{" "}
                      project associations
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeEcosystem}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                  aria-label="Close ecosystem panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                <div className="mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--text-muted)]">
                    Projects
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    Projects currently associated with this ecosystem in
                    the Sorvis database.
                  </p>
                </div>

                {projectsLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-[76px] animate-pulse rounded-[15px] border border-[var(--border-subtle)] bg-[var(--surface-1)]"
                      />
                    ))}
                  </div>
                ) : projectsError ? (
                  <div className="rounded-[15px] border border-[var(--border-default)] bg-[var(--surface-1)] p-5">
                    <div className="font-medium">
                      Unable to load projects
                    </div>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      {projectsError}
                    </p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="rounded-[15px] border border-[var(--border-default)] bg-[var(--surface-1)] p-7 text-center">
                    <div className="font-display text-lg tracking-[-0.025em]">
                      No projects recorded
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      There are currently no project records associated
                      with this ecosystem.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.035,
                        }}
                      >
                        <Link
                          href={`/project/${project.slug}`}
                          onClick={closeEcosystem}
                          className="group flex items-center gap-4 rounded-[15px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-3.5 transition-colors hover:border-[var(--border-default)] hover:bg-[var(--surface-2)]"
                        >
                          <ProjectLogo project={project} />

                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium text-[var(--text-primary)]">
                              {project.name}
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                              {project.category && (
                                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                  {project.category.name}
                                </span>
                              )}

                              {project.verification && (
                                <>
                                  <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />

                                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                    {project.verification.status}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--text-primary)]"
                            strokeWidth={1.6}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {!projectsLoading &&
                  !projectsError &&
                  projects.length > 0 &&
                  selected._count.projects > projects.length && (
                    <Link
                      href={`/explore?ecosystem=${encodeURIComponent(
                        selected.slug,
                      )}`}
                      onClick={closeEcosystem}
                      className="mt-5 flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-1)] text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                    >
                      Explore all projects
                      <ArrowRight
                        className="h-4 w-4"
                        strokeWidth={1.6}
                      />
                    </Link>
                  )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Ecosystems