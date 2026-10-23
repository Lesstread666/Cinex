'use client'
import { CreatePostAction } from "@/actions/create-post-action"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

const CreatePostForm = () => {

    const [selectedImages, setSelectedImages] = useState<File[]>([])

    const postImageSchema = postSchema.omit({ images: true })

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

                for (const file of selectedImages) {
                    imageForm.append("images", file)
                }

                mutate({
                    title: values.title,
                    content: values.content,
                    images: imageForm,
                    category: values.category
                })
            })}>

            <label className="form-label">Add a title</label>
            <input className="form-input" {...register("title")} />
            {errors.title && <ErrorMessage error={errors.title.message!} />}

            <label className="form-label">Add a content</label>
            <input className="form-input" {...register("content")} />
            {errors.content && <ErrorMessage error={errors.content.message!} />}

            <label className="form-label">Choose a category</label>

            <select className="form-input" defaultValue="" {...register("category")}>
                <option value="" disabled>Choose category</option>
                <option value="movies">Movies</option>
                <option value="series">TV Series</option>
            </select>
            {errors.category && <ErrorMessage error={errors.category.message!} />}

            <label className="form-label" htmlFor="images">Add Images (optional)</label>
            <input
                className="form-input"
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                    if (e.target.files) {
                        setSelectedImages([
                            ...selectedImages,
                            ...Array.from(e.target.files)
                        ])
                    }
                    e.target.value = ""
                }}
            />

            {selectedImages.map((image, index) => (
                <div key={index}>
                    <p>{image.name}</p>

                    <button type="button" onClick={() => setSelectedImages(selectedImages.filter(file => file !== image))}>
                        Remove
                    </button>
                </div>
            ))}

            <button className="form-button">Create a post</button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default CreatePostForm