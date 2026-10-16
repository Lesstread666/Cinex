'use client'

import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/signup-action"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema)
    })


    const { mutate, error, isPending } = useMutation({
        mutationFn: SignUp
    })

    return (
        <form className="form" onSubmit={handleSubmit((values) => mutate(values))}>
            <label className="form-label" htmlFor="username">Enter your username</label>
            <input className="form-input" {...register("username")} placeholder="username" />
            {errors.username && <ErrorMessage error={errors.username.message!} />}

            <label className="form-label" htmlFor="email">Enter your email</label>
            <input className="form-input"  {...register("email")} placeholder="email" />
            {errors.email && <ErrorMessage error={errors.email.message!} />}

            <label className="form-label" htmlFor="password">Enter your password</label>
            <input className="form-input"  {...register("password")} type="password" placeholder="password" />
            {errors.password && <ErrorMessage error={errors.password.message!} />}

            <button className="form-button">Sign up</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default SignUpForm