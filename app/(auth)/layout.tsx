import { Metadata } from "next"

interface AuthLayoutProps {
    children : React.ReactNode
}

export const metadata:Metadata = {
    title:'Auth'
}

const AuthLayout = ({children}:Readonly<AuthLayoutProps>) => {
  return (
    <main className="flex h-full items-center justify-center bg-[var(--color-paper)] px-4">
        {children}
    </main>
  )
}

export default AuthLayout
