import Link from "next/link"
import SignUpForm from "./form"

const SignUpPage = () => {
    return (
        <div className="form-page">
            <div className="form-container">
                <h1 className="form-title">Sign Up Page</h1>
                <SignUpForm />
                <p className="form-footer">Already have an account?</p>
                <Link className="form-link" href="/auth/login">
                    Log in here
                </Link>
            </div>
        </div>
    )
}

export default SignUpPage