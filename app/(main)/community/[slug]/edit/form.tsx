'use client'
import { EditPostAction } from "@/app/actions/edit-post-action";
import { postSchema } from "@/app/actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Tables } from "@/app/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";

const EditPostForm = ({ initialValues, postId }: { initialValues: Pick<Tables<"Posts">, "title" | "content" | "image">, postId: string }) => {

    const postImageSchema = postSchema.omit({ image: true })
        .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postImageSchema),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined
        }
    })

    const [removeImage, setRemoveImage] = useState(false)

    const { mutate, error } = useMutation({
        mutationFn: EditPostAction
    })

    return (
        <form className="form" onSubmit={handleSubmit(values => {
            const imageForm = new FormData()

            if (values.image?.[0]) {
                imageForm.append("image", values.image[0])
            }
            mutate({
                postData: {
                    title: values.title,
                    content: values.content,
                    image: imageForm
                }, postId,
                removeImage
            })
        })}>
            <label className="form-label">Edit title</label>
            <input className="form-input" {...register("title")}></input>
            {errors.title && <ErrorMessage error={errors.title.message!} />}

            <label className="form-label">Edit content</label>
            <input className="form-input" {...register("content")}></input>

            <label className="form-label">Edit image</label>
            {initialValues.image && !removeImage && (
                <img
                    src={initialValues.image}
                    alt={initialValues.title}
                    className="edit-post-image"
                />
            )}
            {initialValues.image && (
                <label>
                    <input
                        className="remove-post-image"
                        type="checkbox"
                        checked={removeImage}
                        onChange={(e) => setRemoveImage(e.target.checked)}
                    />
                    Remove current image
                </label>
            )}
            {!removeImage && (
                <input className="form-input" type="file" accept="image/jpeg,image/png,image/webp" {...register("image")}></input>
            )}

            <button className="form-button">Update a post</button>
            {error && <ErrorMessage error={error.message} />}
        </form>

    )
}

export default EditPostForm