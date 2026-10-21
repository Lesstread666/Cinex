'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const Navigation = () => {

    const pathname = usePathname()
    return (
        <nav className="navigation">
            <Link className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}
                href="/">
                Home
            </Link>
            <Link className={`nav-link ${pathname === "/movies" ? "nav-link-active" : ""}`}
                href="/movies">
                Movies
            </Link>
            <Link className={`nav-link ${pathname === "/series" ? "nav-link-active" : ""}`}
                href="/series">
                Series
            </Link>
            <Link className={`nav-link ${pathname.startsWith("/community") ? "nav-link-active" : ""}`}
                href="/community">
                Community
            </Link>
        </nav>
    )
}

export default Navigation