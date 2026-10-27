import { Logout } from "@/actions/logout-action"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"

const Header = async () => {

    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    return (
        <header className="header">
            <div>
                <Link href="/" className="header-title">
                    Cinex
                </Link>
                <p className="header-subtitle">
                    Discover movies. Share your thoughts.
                </p>
            </div>
            {user ?
                <div className="auth-container">
                    <form action={Logout}>
                        <button type="submit" className="auth-link">
                            Log out
                        </button>
                    </form>
                    <Link className="auth-link" href="/create-post">
                        Create Post
                    </Link>
                </div>
                :
                <div className="auth-container">
                    <Link className="auth-link" href="/auth/login">
                        Login
                    </Link>

                    <Link className="auth-link" href="/auth/signup">
                        Sign Up
                    </Link>
                </div>
            }


        </header>
    )
}

export default Header