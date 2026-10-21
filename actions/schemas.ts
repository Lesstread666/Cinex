import z from "zod";

export const signUpSchema = z.object({
    email: z.email("Incorrect email"),
    password: z.string().min(6, "Your password must be at least 6 characters"),
    username: z.string().min(3, "You need at least 3 characters")
})

export const logInSchema = z.object({
    email: z.email("Incorrect email"),
    password: z.string().min(6, "Your password must be at least 6 characters")
})

export const postSchema = z.object({
    title: z.string().min(6, "Your title must be at least 6 characters long"),
    content: z.string().optional(),
    image: z.instanceof(FormData).optional(),
    category: z.enum(["movies", "series"], { error: "Please choose a category" })
})

export const commentSchema = z.object({
    content: z.string().min(3, "Your comment must be at least 3 characters long")
})