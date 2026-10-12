import { ReactNode } from "react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <Navigation />
            {children}
        </>
    )
}

export default MainLayout