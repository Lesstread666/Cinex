'use client'

import { EditPostAction } from "@/actions/edit-post-action";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { Tables } from "@/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";

const EditPostForm = ({ initialValues, postId }: { initialValues: Pick<Tables<"Posts">, "title" | "content" | "images" | "category">, postId: string }) => {

    const postImageSchema = postSchema.omit({ images: true })
        .extend({ images: z.unknown().transform(value => { return value as FileList }).optional() })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postImageSchema),
        defaultValues: {
            title: initialValues.title,
            content: initialValues.content || undefined,
            category: initialValues.category === "movies" || initialValues.category === "series"
                ? initialValues.category
                : undefined
        }
    })

    const [remainingImages, setRemainingImages] = useState(initialValues.images || [])

    const { mutate, error } = useMutation({
        mutationFn: EditPostAction
    })

    return (
        <form className="form" onSubmit={handleSubmit(values => {

            const imageForm = new FormData()

            if (values.images) {
                for (const file of Array.from(values.images)) {
                    imageForm.append("images", file)
                }
            }

            mutate({
                postData: {
                    title: values.title,
                    content: values.content,
                    images: imageForm,
                    category: values.category
                },
                postId,
                remainingImages
            })
        })}>

            <label className="form-label">Edit title</label>
            <input className="form-input" {...register("title")} />
            {errors.title && <ErrorMessage error={errors.title.message!} />}

            <label className="form-label">Edit content</label>
            <input className="form-input" {...register("content")} />

            <label className="form-label">Edit category</label>
            <select className="form-input" {...register("category")}>
                <option value="" disabled>Choose category</option>
                <option value="movies">Movies</option>
                <option value="series">TV Series</option>
            </select>
            {errors.category && <ErrorMessage error={errors.category.message!} />}

            <label className="form-label">Edit images</label>

            {remainingImages.map((image) => (
                <div key={image}>
                    <img
                        src={image}
                        alt={initialValues.title}
                        className="edit-post-image"
                    />

                    <button
                        type="button"
                        onClick={() => setRemainingImages(remainingImages.filter(url => url !== image))}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <input
                className="form-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                {...register("images")}
            />

            {errors.images && <ErrorMessage error={errors.images.message!} />}

            <button className="form-button">Update a post</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default EditPostForm