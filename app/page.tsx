import {
  ArrowRight,
  Bell,
  Boxes,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  LockKeyhole,
  MousePointer2,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  StickyNote,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vision Board - Collaborative whiteboard",
  description: "A real-time whiteboard for teams to sketch, plan, and shape work together.",
};

const featureCards = [
  {
    title: "Live boards",
    description: "Presence, selections, and canvas updates stay visible while the team works.",
    icon: UsersRound,
  },
  {
    title: "Board system",
    description: "Search, favorite, rename, and organize boards around the team that owns them.",
    icon: Boxes,
  },
  {
    title: "Protected workspace",
    description: "The landing page is public. The dashboard, boards, and org tools stay authenticated.",
    icon: ShieldCheck,
  },
];

const workflowItems = [
  {
    title: "Start loose",
    description: "Drop notes, rough shapes, and early sketches before the structure is obvious.",
    icon: StickyNote,
  },
  {
    title: "Shape the room",
    description: "Move from broad ideas into a shared canvas everyone can inspect.",
    icon: MousePointer2,
  },
  {
    title: "Keep the thread",
    description: "Save the board, return through search or favorites, and keep momentum.",
    icon: Clock3,
  },
];

const useCases = [
  "Research synthesis",
  "Sprint planning",
  "Product critique",
  "Journey mapping",
  "Architecture sketching",
  "Team workshops",
];

const accessItems = [
  "Clerk authentication",
  "Organization-scoped boards",
  "Protected board routes",
  "Public marketing route",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--color-paper)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-[var(--color-card)]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-full focus-visible:outline-none">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-ink)] bg-[var(--color-accent)]">
            <Image src="/logo.png" alt="Vision Board" width={36} height={36} className="h-8 w-8 object-contain" priority />
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">Vision Board</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] p-1 shadow-sm md:flex">
          <a href="#workspace" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]">Workspace</a>
          <a href="#workflow" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]">Workflow</a>
          <a href="#access" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]">Access</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="hidden whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-paper-2)] sm:inline-flex">
            Sign in
          </Link>
          <Link href="/dashboard" className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-ink)] bg-[var(--color-accent)] px-4 text-sm font-semibold text-[var(--color-accent-ink)] shadow-sm hover:-translate-y-0.5 hover:bg-[var(--color-accent)]/90">
            Open app
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-10 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:px-8 lg:pb-16">
        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-2)] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-focus)]" />
            Public landing. Protected workspace.
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.96] tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
            A sharper room for shared thinking.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-ink-2)] sm:text-lg">
            Vision Board is a fast collaborative canvas for sketches, sticky notes, planning, and team decisions. It opens with a clean public story, then moves people into a focused authenticated workspace.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-ink)] bg-[var(--color-accent)] px-6 text-sm font-semibold text-[var(--color-accent-ink)] shadow-sm hover:-translate-y-0.5 hover:bg-[var(--color-accent)]/90">
              Start a board
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/sign-up" className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-[var(--color-rule)] bg-[var(--color-card)] px-6 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:bg-[var(--color-paper-2)]">
              Create account
            </Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-[var(--color-ink-2)]">
              <Check className="h-4 w-4 text-[var(--color-focus)]" />
              Live multiplayer canvas
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-ink-2)]">
              <Check className="h-4 w-4 text-[var(--color-focus)]" />
              Organization-based boards
            </div>
          </div>
        </div>

        <div id="workspace" className="vision-panel min-w-0 rounded-xl p-3">
          <div className="vision-canvas-bg relative aspect-[4/3] min-h-[360px] overflow-hidden rounded-lg border border-[var(--color-rule)]">
            <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 shadow-sm">
              <div className="flex min-w-0 items-center gap-2">
                <CircleDot className="h-4 w-4 shrink-0 text-[var(--color-focus)]" />
                <span className="truncate text-xs font-semibold">Product workshop</span>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1 text-xs font-medium text-[var(--color-ink-2)] sm:flex">
                <Search className="h-3.5 w-3.5" />
                Search boards
              </div>
            </div>
            <div className="absolute right-6 top-20 flex -space-x-2">
              <span className="h-9 w-9 rounded-full border-2 border-[var(--color-card)] bg-[var(--color-accent)]" />
              <span className="h-9 w-9 rounded-full border-2 border-[var(--color-card)] bg-[var(--color-accent-2)]" />
              <span className="h-9 w-9 rounded-full border-2 border-[var(--color-card)] bg-[var(--color-accent-3)]" />
            </div>

            <div className="absolute left-[8%] top-[26%] w-56 rounded-lg border border-[var(--color-ink)] bg-[var(--color-accent)] p-4 shadow-sm">
              <div className="mb-4 h-2 w-16 rounded-full bg-[var(--color-ink)]/20" />
              <p className="text-sm font-semibold">Launch workshop</p>
              <p className="mt-2 text-xs leading-5 text-[var(--color-ink)]/80">Map the flow before the team starts building.</p>
            </div>
            <div className="absolute right-[10%] top-[33%] w-52 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-4 shadow-sm">
              <p className="text-sm font-semibold">Open questions</p>
              <ul className="mt-3 space-y-2 text-xs text-[var(--color-ink-2)]">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />Owner</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-3)]" />Decision</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />Next review</li>
              </ul>
            </div>
            <div className="absolute bottom-[14%] left-[18%] flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 shadow-sm">
              <PenLine className="h-4 w-4" />
              <span className="text-xs font-semibold">Sketch mode</span>
            </div>
            <div className="absolute bottom-[16%] right-[18%] h-24 w-36 rounded-full border-2 border-[var(--color-focus)] bg-transparent" />
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] px-3 py-2 shadow-sm">
              <Bell className="h-4 w-4 text-[var(--color-focus)]" />
              <span className="text-xs font-semibold">3 active collaborators</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-rule)] bg-[var(--color-card)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:px-6 md:grid-cols-3 lg:px-8">
          {featureCards.map((feature) => (
            <article key={feature.title} className="rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] p-5 shadow-sm">
              <feature.icon className="h-5 w-5 text-[var(--color-focus)]" />
              <h2 className="mt-4 text-base font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink-2)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From messy room to saved board.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--color-ink-2)]">
            The page presents the product clearly, then hands users into the dashboard where the real workspace lives.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {workflowItems.map((item, index) => (
            <article key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 rounded-lg border border-[var(--color-rule)] bg-[var(--color-card)] p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-paper-2)]">
                <item.icon className="h-5 w-5 text-[var(--color-focus)]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-ink-2)]">{item.description}</p>
              </div>
              <span className="hidden rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] px-2 py-1 text-xs font-semibold text-[var(--color-ink-2)] sm:inline-flex">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-rule)] bg-[var(--color-paper-2)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
          <div className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">Built for common board work.</h2>
              <Star className="h-5 w-5 text-[var(--color-accent-2)]" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-3 text-sm font-medium">
                  <ChevronRight className="h-4 w-4 text-[var(--color-focus)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="access" className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-ink)] p-6 text-[var(--color-accent-ink)] shadow-sm">
            <LockKeyhole className="h-6 w-6 text-[var(--color-accent)]" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Public story, private work.</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-accent-ink)]/75">
              Visitors can understand the product without signing in. Workspace routes stay protected so board content remains inside the authenticated app flow.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {accessItems.map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-ink)] bg-[var(--color-accent)]">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-7 w-7 object-contain" />
          </span>
          <div>
            <p className="text-sm font-semibold">Vision Board</p>
            <p className="text-xs text-[var(--color-ink-2)]">Collaborative drawing workspace.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/sign-in" className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--color-paper-2)]">Sign in</Link>
          <Link href="/dashboard" className="whitespace-nowrap rounded-full border border-[var(--color-rule)] bg-[var(--color-card)] px-4 py-2 text-sm font-semibold shadow-sm hover:bg-[var(--color-paper-2)]">Open dashboard</Link>
        </div>
      </footer>
    </main>
  );
}
