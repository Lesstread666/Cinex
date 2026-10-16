'use client'

import { AddCommentAction } from "@/actions/add-comment-action"
import { commentSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddComment = ({ postid }: { postid: string }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(commentSchema)
    })

    const { mutate, error, isPending } = useMutation({
        mutationFn: AddCommentAction,
        onSuccess: () => {
            reset()
            toast.success("Comment added successfully")
        },
        onError: () => {
            toast.error("Failed to add comment")
        }
    })

    return (
        <form onSubmit={handleSubmit(values => mutate({ commentdata: { content: values.content }, postid }))}
            className="form">

            <label className="form-label">Add content</label>
            <textarea className="form-textarea" placeholder="your comment" {...register("content")} />
            {errors.content && <ErrorMessage error={errors.content.message!} />}

            <button className="form-button" disabled={isPending}>
                {isPending ? "Adding..." : "Add Comment"}
            </button>
            {error && <ErrorMessage error={error.message} />}
        </form>
    )
}

export default AddComment