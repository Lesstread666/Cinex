'use client'

import { LogIn } from "@/actions/login-action"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const LogInForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(logInSchema)
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: LogIn
    })

    return (
        <form className="form" onSubmit={handleSubmit((values) => mutate(values))}>
            <label className="form-label" htmlFor="email">Enter your email</label>
            <input className="form-input" id="email" {...register("email")} placeholder="email" />
            {errors.email && <ErrorMessage error={errors.email.message!} />}

            <label className="form-label" htmlFor="password">Enter your password</label>
            <input className="form-input" id="email" {...register("password")} placeholder="password" />
            {errors.password && <ErrorMessage error={errors.password.message!} />}

            <button className="form-button">{isPending ? "Logging In" : "Log In"}</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default LogInForm