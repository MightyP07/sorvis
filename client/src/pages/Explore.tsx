import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  Filter,
  LayoutGrid,
  List,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "wouter"
import Navbar from "../components/layout/Navbar"

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000"

type ViewMode = "grid" | "list"

type ProjectMetric = {
  id: string
  projectId: string
  momentumScore: number | null
  users: number | null
  growth: number | null
  tvl: number | null
  recordedAt: string
}

type Category = {
  id: string
  name: string
  slug: string
  _count?: {
    projects: number
  }
}

type Ecosystem = {
  id: string
  name: string
  slug: string
  _count?: {
    projects: number
  }
}

type ProjectEcosystem = {
  projectId: string
  ecosystemId: string
  ecosystem: Ecosystem
}

type Verification = {
  id?: string
  projectId?: string
  status?: string
  verified?: boolean
  level?: string
  createdAt?: string
  updatedAt?: string
} | null

type Funding = {
  id?: string
  projectId?: string
  round?: string | null
  amount?: number | null
  currency?: string | null
  investor?: string | null
  announcedAt?: string | null
  createdAt?: string
}

type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  website: string | null
  logoUrl: string | null
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  category: Category
  ecosystems: ProjectEcosystem[]
  verification: Verification
  metrics: ProjectMetric[]
  fundings?: Funding[]
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

type ProjectsResponse = {
  success: boolean
  data: Project[]
  pagination: Pagination
  message?: string
}

type CategoriesResponse = {
  success: boolean
  data: Category[]
}

type EcosystemsResponse = {
  success: boolean
  data: Ecosystem[]
}

type ProjectResponse = {
  success: boolean
  data: Project
  message?: string
}

type SortMode =
  | "relevance"
  | "momentum"
  | "tvl"
  | "growth"
  | "newest"

type IntelligenceFilter = "all" | "momentum" | "growth" | "tvl" | "funding"

type Filters = {
  category: string
  ecosystem: string
  intelligence: IntelligenceFilter
}

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—"
  }

  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  }

  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }

  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value)
}

function formatUsd(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—"
  }

  const absolute = Math.abs(value)

  if (absolute >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }

  if (absolute >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }

  if (absolute >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }

  return `$${value.toFixed(0)}`
}

function formatGrowth(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—"
  }

  const sign = value > 0 ? "+" : ""

  return `${sign}${value.toFixed(1)}%`
}

function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "—"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "—"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function getLatestMetric(project: Project): ProjectMetric | null {
  if (!project.metrics?.length) {
    return null
  }

  return [...project.metrics].sort(
    (a, b) =>
      new Date(b.recordedAt).getTime() -
      new Date(a.recordedAt).getTime(),
  )[0]
}

function isVerified(project: Project): boolean {
  if (!project.verification) {
    return false
  }

  if (project.verification.verified === true) {
    return true
  }

  if (project.verification.status?.toLowerCase() === "verified") {
    return true
  }

  return Boolean(project.verification.level)
}

function getSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams()
  }

  return new URLSearchParams(window.location.search)
}

function getInitialState() {
  const params = getSearchParams()

  const pageValue = Number(params.get("page") || "1")

  return {
    search: params.get("search") || "",
    category: params.get("category") || "",
    ecosystem: params.get("ecosystem") || "",
    page:
      Number.isFinite(pageValue) && pageValue > 0
        ? Math.floor(pageValue)
        : 1,
  }
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
      <span className="h-px w-5 bg-[var(--border-default)]" />
      {children}
    </div>
  )
}

function MetricValue({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </div>

      <div
        className={[
          "truncate text-sm font-medium text-[var(--text-primary)]",
          mono ? "font-mono tabular-nums" : "",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  )
}

function ProjectLogo({
  project,
  size = "md",
}: {
  project: Project
  size?: "sm" | "md" | "lg"
}) {
  const dimensions = {
    sm: "h-9 w-9 rounded-[10px]",
    md: "h-11 w-11 rounded-[12px]",
    lg: "h-14 w-14 rounded-[15px]",
  }

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden border border-[var(--border-default)] bg-[var(--surface-2)]",
        dimensions[size],
      ].join(" ")}
    >
      {project.logoUrl ? (
        <img
          src={project.logoUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="font-display text-sm font-semibold text-[var(--text-secondary)]">
          {project.name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </div>
  )
}

function VerificationBadge({
  project,
}: {
  project: Project
}) {
  if (!isVerified(project)) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] bg-[var(--surface-2)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
      <Check className="h-3 w-3" />
      Verified
    </span>
  )
}

function MomentumBadge({
  value,
}: {
  value: number | null
}) {
  if (value === null || value === undefined) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[10px] text-[var(--text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]" />
        Momentum unavailable
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-1)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-secondary)]">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {Math.round(value)} momentum
    </span>
  )
}

function Stat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <div className="mb-1 text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </div>

      <div className="font-mono text-xs tabular-nums text-[var(--text-primary)]">
        {value}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
  onOpen,
  view,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
  view: ViewMode
}) {
  const shouldReduceMotion = useReducedMotion()
  const metric = getLatestMetric(project)

  const ecosystemNames = project.ecosystems
    .map((item) => item.ecosystem.name)
    .filter(Boolean)

  if (view === "list") {
    return (
      <motion.button
        type="button"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: shouldReduceMotion ? 0 : Math.min(index * 0.025, 0.2),
        }}
        onClick={() => onOpen(project)}
        className="group w-full border-b border-[var(--border-subtle)] py-5 text-left transition-colors hover:bg-[var(--surface-1)]"
      >
        <div className="grid grid-cols-[minmax(220px,1.8fr)_repeat(4,minmax(90px,1fr))_24px] items-center gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <ProjectLogo project={project} size="sm" />

            <div className="min-w-0">
              <div className="mb-1 flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-medium text-[var(--text-primary)]">
                  {project.name}
                </span>

                <VerificationBadge project={project} />
              </div>

              <div className="flex min-w-0 items-center gap-2 text-[10px] text-[var(--text-muted)]">
                <span>{project.category.name}</span>

                {ecosystemNames.length > 0 && (
                  <>
                    <span className="text-[var(--text-faint)]">/</span>
                    <span className="truncate">
                      {ecosystemNames.slice(0, 2).join(", ")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Stat
            label="Momentum"
            value={
              metric?.momentumScore === null ||
              metric?.momentumScore === undefined
                ? "—"
                : Math.round(metric.momentumScore).toString()
            }
          />

          <Stat
            label="TVL"
            value={formatUsd(metric?.tvl)}
          />

          <Stat
            label="Growth"
            value={formatGrowth(metric?.growth)}
          />

          <Stat
            label="Users"
            value={formatNumber(metric?.users)}
          />

          <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--text-primary)]" />
        </div>
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.035, 0.25),
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      onClick={() => onOpen(project)}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-5 text-left backdrop-blur-xl transition-colors hover:border-[var(--border-default)] hover:bg-[var(--surface-2)]"
    >
      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--border-strong)] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-4">
        <ProjectLogo project={project} />

        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--text-primary)]" />
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate font-display text-base font-semibold text-[var(--text-primary)]">
            {project.name}
          </h2>

          <VerificationBadge project={project} />
        </div>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-[var(--text-secondary)]">
          {project.description || "No project description available."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {project.category.name}
        </span>

        {ecosystemNames.slice(0, 2).map((name) => (
          <span
            key={name}
            className="rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]"
          >
            {name}
          </span>
        ))}
      </div>

      <div className="mt-auto border-t border-[var(--border-subtle)] pt-4">
        <div className="grid grid-cols-3 gap-4">
          <MetricValue
            label="TVL"
            value={formatUsd(metric?.tvl)}
            mono
          />

          <MetricValue
            label="Growth"
            value={formatGrowth(metric?.growth)}
            mono
          />

          <MetricValue
            label="Momentum"
            value={
              metric?.momentumScore === null ||
              metric?.momentumScore === undefined
                ? "—"
                : Math.round(metric.momentumScore).toString()
            }
            mono
          />
        </div>
      </div>
    </motion.button>
  )
}

function LoadingCard({
  index,
}: {
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="min-h-[280px] animate-pulse rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5"
    >
      <div className="h-11 w-11 rounded-[12px] bg-[var(--surface-3)]" />

      <div className="mt-5 h-4 w-2/5 rounded bg-[var(--surface-3)]" />
      <div className="mt-3 h-3 w-full rounded bg-[var(--surface-2)]" />
      <div className="mt-2 h-3 w-4/5 rounded bg-[var(--surface-2)]" />

      <div className="mt-6 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-[var(--surface-3)]" />
        <div className="h-6 w-20 rounded-full bg-[var(--surface-3)]" />
      </div>

      <div className="mt-20 grid grid-cols-3 gap-4">
        <div>
          <div className="h-2 w-10 rounded bg-[var(--surface-3)]" />
          <div className="mt-2 h-3 w-14 rounded bg-[var(--surface-2)]" />
        </div>

        <div>
          <div className="h-2 w-10 rounded bg-[var(--surface-3)]" />
          <div className="mt-2 h-3 w-14 rounded bg-[var(--surface-2)]" />
        </div>

        <div>
          <div className="h-2 w-14 rounded bg-[var(--surface-3)]" />
          <div className="mt-2 h-3 w-10 rounded bg-[var(--surface-2)]" />
        </div>
      </div>
    </motion.div>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: Array<{
    value: string
    label: string
  }>
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-[11px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-2.5 pr-9 text-xs text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--border-strong)]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
      </div>
    </label>
  )
}

function IntelligenceFilters({
  value,
  onChange,
}: {
  value: IntelligenceFilter
  onChange: (value: IntelligenceFilter) => void
}) {
  const options: Array<{
    value: IntelligenceFilter
    label: string
  }> = [
    { value: "all", label: "All signals" },
    { value: "momentum", label: "Momentum available" },
    { value: "growth", label: "Growth available" },
    { value: "tvl", label: "TVL available" },
    { value: "funding", label: "Funding available" },
  ]

  return (
    <div>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        Intelligence
      </span>

      <div className="space-y-1">
        {options.map((option) => {
          const active = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={[
                "flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-xs transition-colors",
                active
                  ? "bg-[var(--surface-strong)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]",
              ].join(" ")}
            >
              <span>{option.label}</span>

              {active && <Check className="h-3.5 w-3.5" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilterPanel({
  categories,
  ecosystems,
  filters,
  onChange,
  onClear,
}: {
  categories: Category[]
  ecosystems: Ecosystem[]
  filters: Filters
  onChange: (filters: Filters) => void
  onClear: () => void
}) {
  const hasFilters =
    filters.category ||
    filters.ecosystem ||
    filters.intelligence !== "all"

  return (
    <aside className="sticky top-24 hidden h-fit w-[230px] shrink-0 lg:block">
      <div className="rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-4 backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--text-secondary)]" />

            <span className="text-xs font-semibold text-[var(--text-primary)]">
              Filters
            </span>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="text-[10px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-5">
          <FilterSelect
            label="Category"
            value={filters.category}
            options={[
              { value: "", label: "All categories" },
              ...categories.map((category) => ({
                value: category.slug,
                label: `${category.name}${
                  category._count?.projects
                    ? ` · ${formatNumber(category._count.projects)}`
                    : ""
                }`,
              })),
            ]}
            onChange={(value) =>
              onChange({
                ...filters,
                category: value,
              })
            }
          />

          <FilterSelect
            label="Ecosystem"
            value={filters.ecosystem}
            options={[
              { value: "", label: "All ecosystems" },
              ...ecosystems.map((ecosystem) => ({
                value: ecosystem.slug,
                label: ecosystem.name,
              })),
            ]}
            onChange={(value) =>
              onChange({
                ...filters,
                ecosystem: value,
              })
            }
          />

          <IntelligenceFilters
            value={filters.intelligence}
            onChange={(value) =>
              onChange({
                ...filters,
                intelligence: value,
              })
            }
          />
        </div>
      </div>
    </aside>
  )
}

function MobileFilterSheet({
  open,
  onClose,
  categories,
  ecosystems,
  filters,
  onChange,
  onClear,
}: {
  open: boolean
  onClose: () => void
  categories: Category[]
  ecosystems: Ecosystem[]
  filters: Filters
  onChange: (filters: Filters) => void
  onClear: () => void
}) {
  useEffect(() => {
    if (!open) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/35 backdrop-blur-sm lg:hidden"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[90] max-h-[82vh] overflow-y-auto rounded-t-[24px] border-t border-[var(--border-default)] bg-[var(--surface-glass-heavy)] p-5 shadow-2xl lg:hidden"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[var(--border-strong)]" />

            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  Filters
                </div>

                <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                  Refine the current discovery view.
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              <FilterSelect
                label="Category"
                value={filters.category}
                options={[
                  { value: "", label: "All categories" },
                  ...categories.map((category) => ({
                    value: category.slug,
                    label: `${category.name}${
                      category._count?.projects
                        ? ` · ${formatNumber(category._count.projects)}`
                        : ""
                    }`,
                  })),
                ]}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    category: value,
                  })
                }
              />

              <FilterSelect
                label="Ecosystem"
                value={filters.ecosystem}
                options={[
                  { value: "", label: "All ecosystems" },
                  ...ecosystems.map((ecosystem) => ({
                    value: ecosystem.slug,
                    label: ecosystem.name,
                  })),
                ]}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    ecosystem: value,
                  })
                }
              />

              <IntelligenceFilters
                value={filters.intelligence}
                onChange={(value) =>
                  onChange({
                    ...filters,
                    intelligence: value,
                  })
                }
              />
            </div>

            <div className="mt-6 flex gap-2 border-t border-[var(--border-subtle)] pt-4">
              <button
                type="button"
                onClick={onClear}
                className="flex-1 rounded-[11px] border border-[var(--border-subtle)] px-4 py-3 text-xs text-[var(--text-secondary)]"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-[11px] bg-[var(--text-primary)] px-4 py-3 text-xs font-medium text-[var(--text-inverse)]"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortMode
  onChange: (value: SortMode) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as SortMode)
        }
        className="appearance-none rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-1)] py-2.5 pl-3 pr-8 text-xs text-[var(--text-secondary)] outline-none transition-colors hover:text-[var(--text-primary)]"
      >
        <option value="relevance">Relevance</option>
        <option value="momentum">Momentum</option>
        <option value="tvl">TVL</option>
        <option value="growth">Growth</option>
        <option value="newest">Newest</option>
      </select>

      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
    </div>
  )
}

function EmptyState({
  search,
  onClear,
}: {
  search: string
  onClear: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex min-h-[420px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[var(--border-default)] px-6 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-1)]">
        <Search className="h-4 w-4 text-[var(--text-muted)]" />
      </div>

      <h2 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
        No projects found
      </h2>

      <p className="mt-2 max-w-sm text-xs leading-5 text-[var(--text-secondary)]">
        {search
          ? `Nothing matched "${search}". Try a broader search or remove some filters.`
          : "Nothing matches the current filters. Try widening the discovery criteria."}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-[10px] border border-[var(--border-default)] px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-2)]"
      >
        Clear filters
      </button>
    </motion.div>
  )
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="col-span-full flex min-h-[420px] flex-col items-center justify-center rounded-[20px] border border-[var(--border-subtle)] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-default)]">
        <CircleAlert className="h-4 w-4 text-[var(--text-secondary)]" />
      </div>

      <h2 className="mt-5 text-base font-semibold text-[var(--text-primary)]">
        Discovery service unavailable
      </h2>

      <p className="mt-2 max-w-md text-xs leading-5 text-[var(--text-secondary)]">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-[10px] bg-[var(--text-primary)] px-4 py-2.5 text-xs font-medium text-[var(--text-inverse)]"
      >
        Retry
      </button>
    </div>
  )
}

function Pagination({
  pagination,
  onPageChange,
}: {
  pagination: Pagination
  onPageChange: (page: number) => void
}) {
  if (pagination.totalPages <= 1) {
    return null
  }

  const current = pagination.page
  const total = pagination.totalPages

  const pages: Array<number | "ellipsis"> = []

  if (total <= 7) {
    for (let page = 1; page <= total; page += 1) {
      pages.push(page)
    }
  } else {
    pages.push(1)

    if (current > 4) {
      pages.push("ellipsis")
    }

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let page = start; page <= end; page += 1) {
      pages.push(page)
    }

    if (current < total - 3) {
      pages.push("ellipsis")
    }

    pages.push(total)
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={current <= 1}
        onClick={() => onPageChange(current - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-9 w-9 items-center justify-center text-xs text-[var(--text-muted)]"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={[
              "h-9 min-w-9 rounded-[9px] border px-2 text-xs transition-colors",
              page === current
                ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--text-inverse)]"
                : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]",
            ].join(" ")}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={current >= total}
        onClick={() => onPageChange(current + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function IntelligenceRow({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] py-3 last:border-b-0">
      <span className="text-xs text-[var(--text-secondary)]">
        {label}
      </span>

      <div className="text-right">
        <div className="font-mono text-xs tabular-nums text-[var(--text-primary)]">
          {value}
        </div>

        {detail && (
          <div className="mt-0.5 text-[9px] text-[var(--text-muted)]">
            {detail}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: Project | null
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && project && (
        <>
          <motion.button
            type="button"
            aria-label="Close project intelligence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 14 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-x-3 bottom-3 top-3 z-[110] overflow-hidden rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-glass-heavy)] shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-[min(900px,calc(100vw-40px))] sm:-translate-x-1/2"
          >
            <div className="flex h-full flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4 sm:px-7">
                <div className="flex min-w-0 items-center gap-3">
                  <ProjectLogo project={project} size="md" />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate font-display text-base font-semibold text-[var(--text-primary)] sm:text-lg">
                        {project.name}
                      </h2>

                      <VerificationBadge project={project} />
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[var(--text-muted)]">
                      <span>{project.category.name}</span>

                      <span className="text-[var(--text-faint)]">
                        /
                      </span>

                      <span>{project.slug}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.5fr_0.85fr]">
                  <div>
                    <SectionLabel>Overview</SectionLabel>

                    <h3 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                      {project.description ||
                        "No project description is currently available."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <MomentumBadge
                        value={getLatestMetric(project)?.momentumScore ?? null}
                      />

                      {project.ecosystems.map((item) => (
                        <span
                          key={item.ecosystem.id}
                          className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] text-[var(--text-secondary)]"
                        >
                          {item.ecosystem.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <SectionLabel>Data signals</SectionLabel>

                      <div className="rounded-[16px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4">
                        <IntelligenceRow
                          label="Momentum score"
                          value={
                            getLatestMetric(project)?.momentumScore ===
                              null ||
                            getLatestMetric(project)?.momentumScore ===
                              undefined
                              ? "Unavailable"
                              : Math.round(
                                  getLatestMetric(project)!
                                    .momentumScore!,
                                ).toString()
                          }
                        />

                        <IntelligenceRow
                          label="TVL"
                          value={formatUsd(
                            getLatestMetric(project)?.tvl,
                          )}
                        />

                        <IntelligenceRow
                          label="Growth"
                          value={formatGrowth(
                            getLatestMetric(project)?.growth,
                          )}
                        />

                        <IntelligenceRow
                          label="Users"
                          value={formatNumber(
                            getLatestMetric(project)?.users,
                          )}
                        />

                        <IntelligenceRow
                          label="Latest observation"
                          value={formatDate(
                            getLatestMetric(project)?.recordedAt,
                          )}
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <SectionLabel>Ecosystems</SectionLabel>

                      {project.ecosystems.length > 0 ? (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {project.ecosystems.map((item) => (
                            <div
                              key={item.ecosystem.id}
                              className="flex items-center justify-between rounded-[13px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-3"
                            >
                              <span className="text-xs font-medium text-[var(--text-primary)]">
                                {item.ecosystem.name}
                              </span>

                              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                {item.ecosystem.slug}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-[13px] border border-dashed border-[var(--border-default)] px-4 py-5 text-xs text-[var(--text-muted)]">
                          No ecosystem association is currently recorded.
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="rounded-[17px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <SectionLabel>Project intelligence</SectionLabel>

                      <div className="space-y-4">
                        <MetricValue
                          label="Category"
                          value={project.category.name}
                        />

                        <MetricValue
                          label="Created"
                          value={formatDate(project.createdAt)}
                        />

                        <MetricValue
                          label="Last updated"
                          value={formatDate(project.updatedAt)}
                        />

                        <MetricValue
                          label="Verification"
                          value={
                            isVerified(project)
                              ? "Verified"
                              : "Unverified"
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4 rounded-[17px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <SectionLabel>Funding</SectionLabel>

                      {project.fundings &&
                      project.fundings.length > 0 ? (
                        <div className="space-y-3">
                          {project.fundings.map((funding, index) => (
                            <div
                              key={
                                funding.id ||
                                `${funding.round}-${index}`
                              }
                              className="border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs font-medium text-[var(--text-primary)]">
                                  {funding.round || "Funding round"}
                                </span>

                                <span className="font-mono text-xs text-[var(--text-primary)]">
                                  {funding.amount !== null &&
                                  funding.amount !== undefined
                                    ? `${formatUsd(
                                        funding.amount,
                                      )}${
                                        funding.currency
                                          ? ` ${funding.currency}`
                                          : ""
                                      }`
                                    : "Amount unavailable"}
                                </span>
                              </div>

                              {funding.investor && (
                                <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                                  {funding.investor}
                                </div>
                              )}

                              {funding.announcedAt && (
                                <div className="mt-1 text-[9px] text-[var(--text-muted)]">
                                  {formatDate(
                                    funding.announcedAt,
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-[12px] border border-dashed border-[var(--border-default)] px-3 py-4 text-xs text-[var(--text-muted)]">
                          No funding records are currently available.
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3.5 py-3 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                        >
                          <span>Visit project</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                      <a
                        href={`/project/${project.slug}`}
                        className="flex items-center justify-between rounded-[12px] bg-[var(--text-primary)] px-3.5 py-3 text-xs font-medium text-[var(--text-inverse)] transition-opacity hover:opacity-90"
                      >
                        <span>Open full profile</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ExploreHeader({
  search,
  onSearchChange,
  onOpenFilters,
  activeFilterCount,
}: {
  search: string
  onSearchChange: (value: string) => void
  onOpenFilters: () => void
  activeFilterCount: number
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="absolute inset-0 sorvis-grid opacity-40" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-32 sm:px-8 lg:px-10 lg:pb-12 lg:pt-36">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            <Sparkles className="h-3.5 w-3.5" />
            Sorvis intelligence
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-[-0.045em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Explore what’s being built.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            Search the Web3 project landscape through categories,
            ecosystems, traction signals, and measurable activity.
          </p>
        </div>

        <div className="mt-8 flex max-w-3xl flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />

            <input
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search projects..."
              className="h-12 w-full rounded-[13px] border border-[var(--border-default)] bg-[var(--surface-glass)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none backdrop-blur-xl transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)]"
            />
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[13px] border border-[var(--border-default)] bg-[var(--surface-glass)] px-4 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-xl transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] lg:hidden"
          >
            <Filter className="h-3.5 w-3.5" />
            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--text-primary)] px-1 text-[9px] text-[var(--text-inverse)]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Explore() {
  const [, setLocation] = useLocation()

  const initial = getInitialState()

  const [search, setSearch] = useState(initial.search)
  const [filters, setFilters] = useState<Filters>({
    category: initial.category,
    ecosystem: initial.ecosystem,
    intelligence: "all",
  })

  const [page, setPage] = useState(initial.page)
  const [view, setView] = useState<ViewMode>("grid")
  const [sort, setSort] = useState<SortMode>("relevance")

  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([])

  const [pagination, setPagination] = useState<Pagination>({
    page: initial.page,
    limit: 24,
    total: 0,
    totalPages: 0,
  })

  const [loading, setLoading] = useState(true)
  const [loadingTaxonomy, setLoadingTaxonomy] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false)

  const [searchInput, setSearchInput] = useState(initial.search)

  const activeFilterCount =
    Number(Boolean(filters.category)) +
    Number(Boolean(filters.ecosystem)) +
    Number(filters.intelligence !== "all")

  const updateUrl = ({
    nextSearch = search,
    nextCategory = filters.category,
    nextEcosystem = filters.ecosystem,
    nextPage = page,
  }: {
    nextSearch?: string
    nextCategory?: string
    nextEcosystem?: string
    nextPage?: number
  } = {}) => {
    const params = new URLSearchParams()

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim())
    }

    if (nextCategory) {
      params.set("category", nextCategory)
    }

    if (nextEcosystem) {
      params.set("ecosystem", nextEcosystem)
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage))
    }

    const query = params.toString()

    setLocation(query ? `/explore?${query}` : "/explore")
  }

  const fetchTaxonomy = async () => {
    setLoadingTaxonomy(true)

    try {
      const [categoriesResponse, ecosystemsResponse] =
        await Promise.all([
          fetch(`${API_BASE}/api/categories`),
          fetch(`${API_BASE}/api/ecosystems`),
        ])

      if (!categoriesResponse.ok) {
        throw new Error("Failed to load categories.")
      }

      if (!ecosystemsResponse.ok) {
        throw new Error("Failed to load ecosystems.")
      }

      const categoriesData =
        (await categoriesResponse.json()) as CategoriesResponse

      const ecosystemsData =
        (await ecosystemsResponse.json()) as EcosystemsResponse

      if (!categoriesData.success) {
        throw new Error("The category service returned an error.")
      }

      if (!ecosystemsData.success) {
        throw new Error("The ecosystem service returned an error.")
      }

      setCategories(categoriesData.data || [])
      setEcosystems(ecosystemsData.data || [])
    } catch (taxError) {
      console.error(taxError)
    } finally {
      setLoadingTaxonomy(false)
    }
  }

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()

      params.set("page", String(page))
      params.set("limit", "24")

      if (search.trim()) {
        params.set("search", search.trim())
      }

      if (filters.category) {
        params.set("category", filters.category)
      }

      if (filters.ecosystem) {
        params.set("ecosystem", filters.ecosystem)
      }

      const response = await fetch(
        `${API_BASE}/api/projects?${params.toString()}`,
      )

      if (!response.ok) {
        throw new Error(
          `Projects request failed with status ${response.status}.`,
        )
      }

      const result = (await response.json()) as ProjectsResponse

      if (!result.success) {
        throw new Error(
          result.message || "The project service returned an error.",
        )
      }

      setProjects(result.data || [])
      setPagination(
        result.pagination || {
          page,
          limit: 24,
          total: result.data?.length || 0,
          totalPages: 1,
        },
      )
    } catch (fetchError) {
      console.error(fetchError)

      setProjects([])

      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load projects.",
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchTaxonomy()
  }, [])

  useEffect(() => {
    void fetchProjects()
  }, [
    page,
    search,
    filters.category,
    filters.ecosystem,
  ])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchInput !== search) {
        setPage(1)
        setSearch(searchInput)
        updateUrl({
          nextSearch: searchInput,
          nextPage: 1,
        })
      }
    }, 350)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [searchInput])

  const visibleProjects = useMemo(() => {
    let result = [...projects]

    if (filters.intelligence !== "all") {
      result = result.filter((project) => {
        const metric = getLatestMetric(project)

        switch (filters.intelligence) {
          case "momentum":
            return metric?.momentumScore !== null &&
              metric?.momentumScore !== undefined

          case "growth":
            return (
              metric?.growth !== null &&
              metric?.growth !== undefined
            )

          case "tvl":
            return (
              metric?.tvl !== null &&
              metric?.tvl !== undefined
            )

          case "funding":
            return Boolean(
              project.fundings && project.fundings.length > 0,
            )

          default:
            return true
        }
      })
    }

    result.sort((a, b) => {
      const metricA = getLatestMetric(a)
      const metricB = getLatestMetric(b)

      switch (sort) {
        case "momentum":
          return (
            (metricB?.momentumScore ?? -Infinity) -
            (metricA?.momentumScore ?? -Infinity)
          )

        case "tvl":
          return (
            (metricB?.tvl ?? -Infinity) -
            (metricA?.tvl ?? -Infinity)
          )

        case "growth":
          return (
            (metricB?.growth ?? -Infinity) -
            (metricA?.growth ?? -Infinity)
          )

        case "newest":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          )

        default:
          return 0
      }
    })

    return result
  }, [projects, filters.intelligence, sort])

  const handleFiltersChange = (nextFilters: Filters) => {
    setFilters(nextFilters)
    setPage(1)

    updateUrl({
      nextCategory: nextFilters.category,
      nextEcosystem: nextFilters.ecosystem,
      nextPage: 1,
    })
  }

  const clearFilters = () => {
    const cleared: Filters = {
      category: "",
      ecosystem: "",
      intelligence: "all",
    }

    setFilters(cleared)
    setPage(1)

    updateUrl({
      nextCategory: "",
      nextEcosystem: "",
      nextPage: 1,
    })
  }

  const handlePageChange = (nextPage: number) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.totalPages ||
      nextPage === page
    ) {
      return
    }

    setPage(nextPage)

    updateUrl({
      nextPage,
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const openProject = async (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
    setModalLoading(true)
    setModalError(null)

    try {
      const response = await fetch(
        `${API_BASE}/api/project/${encodeURIComponent(
          project.slug,
        )}`,
      )

      if (!response.ok) {
        throw new Error(
          `Project request failed with status ${response.status}.`,
        )
      }

      const result = (await response.json()) as ProjectResponse

      if (!result.success) {
        throw new Error(
          result.message || "Unable to load project intelligence.",
        )
      }

      setSelectedProject(result.data)
    } catch (projectError) {
      console.error(projectError)

      setModalError(
        projectError instanceof Error
          ? projectError.message
          : "Unable to load project intelligence.",
      )
    } finally {
      setModalLoading(false)
    }
  }

  const closeProject = () => {
    setModalOpen(false)

    window.setTimeout(() => {
      setSelectedProject(null)
      setModalError(null)
    }, 220)
  }

  const resultLabel = loading
    ? "Scanning project index..."
    : `${formatNumber(pagination.total)} projects`

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-300">
        <ExploreHeader
          search={searchInput}
          onSearchChange={setSearchInput}
          onOpenFilters={() => setMobileFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <FilterPanel
              categories={categories}
              ecosystems={ecosystems}
              filters={filters}
              onChange={handleFiltersChange}
              onClear={clearFilters}
            />

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      Project index
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />

                    <span className="text-[10px] text-[var(--text-muted)]">
                      {resultLabel}
                    </span>
                  </div>

                  {(search ||
                    filters.category ||
                    filters.ecosystem) && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {search && (
                        <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[9px] text-[var(--text-muted)]">
                          Search: {search}
                        </span>
                      )}

                      {filters.category && (
                        <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[9px] text-[var(--text-muted)]">
                          Category: {filters.category}
                        </span>
                      )}

                      {filters.ecosystem && (
                        <span className="rounded-full border border-[var(--border-subtle)] px-2 py-1 text-[9px] text-[var(--text-muted)]">
                          Ecosystem: {filters.ecosystem}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <SortSelect
                    value={sort}
                    onChange={setSort}
                  />

                  <div className="flex rounded-[10px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-0.5">
                    <button
                      type="button"
                      aria-label="Grid view"
                      onClick={() => setView("grid")}
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors",
                        view === "grid"
                          ? "bg-[var(--surface-strong)] text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                      ].join(" ")}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      aria-label="List view"
                      onClick={() => setView("list")}
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors",
                        view === "list"
                          ? "bg-[var(--surface-strong)] text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                      ].join(" ")}
                    >
                      <List className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                view === "grid" ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <LoadingCard key={index} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-[var(--border-subtle)] rounded-[16px] border border-[var(--border-subtle)]">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex animate-pulse items-center gap-4 px-5 py-5"
                      >
                        <div className="h-9 w-9 rounded-[10px] bg-[var(--surface-2)]" />
                        <div className="flex-1">
                          <div className="h-3 w-1/4 rounded bg-[var(--surface-2)]" />
                          <div className="mt-2 h-2 w-1/3 rounded bg-[var(--surface-1)]" />
                        </div>
                        <div className="h-3 w-16 rounded bg-[var(--surface-2)]" />
                        <div className="h-3 w-16 rounded bg-[var(--surface-2)]" />
                        <div className="h-3 w-16 rounded bg-[var(--surface-2)]" />
                      </div>
                    ))}
                  </div>
                )
              ) : error ? (
                <div className="grid">
                  <ErrorState
                    message={error}
                    onRetry={fetchProjects}
                  />
                </div>
              ) : visibleProjects.length === 0 ? (
                <div className="grid">
                  <EmptyState
                    search={search}
                    onClear={clearFilters}
                  />
                </div>
              ) : view === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onOpen={openProject}
                      view="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden rounded-[16px] border border-[var(--border-subtle)]">
                  <div className="hidden border-b border-[var(--border-subtle)] bg-[var(--surface-1)] px-5 py-3 lg:grid lg:grid-cols-[minmax(220px,1.8fr)_repeat(4,minmax(90px,1fr))_24px] lg:gap-6">
                    <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Project
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Momentum
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      TVL
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Growth
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Users
                    </span>
                  </div>

                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onOpen={openProject}
                      view="list"
                    />
                  ))}
                </div>
              )}

              {!loading &&
                !error &&
                pagination.totalPages > 1 && (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-10">
          <div className="border-t border-[var(--border-subtle)] pt-5">
            <div className="flex flex-col gap-2 text-[10px] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <span>
                Sorvis indexes project data and associated intelligence
                signals.
              </span>

              <span className="font-mono">
                {loadingTaxonomy
                  ? "SYNCING TAXONOMY"
                  : "INDEX READY"}
              </span>
            </div>
          </div>
        </section>
      </main>

      <MobileFilterSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        ecosystems={ecosystems}
        filters={filters}
        onChange={handleFiltersChange}
        onClear={clearFilters}
      />

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onClose={closeProject}
      />

      <AnimatePresence>
        {modalOpen && modalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-glass-heavy)] px-4 py-2.5 text-xs text-[var(--text-secondary)] shadow-xl backdrop-blur-xl">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading intelligence
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && modalError && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[120] w-[calc(100%-32px)] max-w-md -translate-x-1/2"
          >
            <div className="flex items-start gap-3 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-glass-heavy)] p-4 shadow-xl backdrop-blur-xl">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-secondary)]" />

              <div className="min-w-0">
                <div className="text-xs font-medium text-[var(--text-primary)]">
                  Could not load full intelligence
                </div>

                <div className="mt-1 text-[10px] leading-4 text-[var(--text-muted)]">
                  {modalError}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalError(null)}
                className="ml-auto text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
