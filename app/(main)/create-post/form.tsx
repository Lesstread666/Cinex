'use client'
import { CreatePostAction } from "@/actions/create-post-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const CreatePostForm = () => {

    const postImageSchema = postSchema.omit({ image: true })
        .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postImageSchema)
    })

    const { mutate, error } = useMutation({
        mutationFn: CreatePostAction
    })

    return (

        <form className="form"
            onSubmit={handleSubmit(values => {

                const imageForm = new FormData()
                if (values.image?.[0]) {
                    imageForm.append("image", values.image[0])
                }

                mutate({
                    title: values.title,
                    content: values.content,
                    image: imageForm
                })
            })}>

            <label className="form-label">Add a title</label>
            <input className="form-input" {...register("title")} />
            {errors.title && <ErrorMessage error={errors.title.message!} />}

            <label className="form-label">Add a content</label>
            <input className="form-input" {...register("content")} />
            {errors.content && <ErrorMessage error={errors.content.message!} />}

            <label className="form-label" htmlFor="image">Add an Image (optional)</label>
            <input className="form-input" type="file" {...register("image")} />
            {errors.image && <ErrorMessage error={errors.image.message!} />}

            <button className="form-button">Create a post</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default CreatePostForm