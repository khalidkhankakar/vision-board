import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function Page() {
  return <SignUp appearance={{
    elements: {
      cardBox: 'shadow-[var(--shadow-panel)]',
      card: 'border border-[var(--color-rule)] bg-[var(--color-card)]',
      headerTitle: 'text-[var(--color-ink)]',
      headerSubtitle: 'text-[var(--color-ink-2)]',
      formButtonPrimary: 'bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:bg-[var(--color-accent)]/90',
    }
  }} />
}
