import { ReactNode } from "react"
import Header from "../../components/Header"

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default AuthLayout