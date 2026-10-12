import Link from "next/link"
import LogInForm from "./form"

const LogInPage = () => {
    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">Log in Page</h1>
                <LogInForm />
                <p className="form-footer"> Don't have any account?</p>
                <Link className="form-link" href="/signup">
                    Sign up here
                </Link>
            </div>
        </div>
    )
}

export default LogInPage