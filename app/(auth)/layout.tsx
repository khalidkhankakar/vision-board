import { Metadata } from "next"

interface AuthLayoutProps {
    children : React.ReactNode
}

export const metadata:Metadata = {
    title:'Auth'
}

const AuthLayout = ({children}:Readonly<AuthLayoutProps>) => {
  return (
    <main className="h-full flex items-center justify-center">
        {children}
    </main>
  )
}

export default AuthLayout
