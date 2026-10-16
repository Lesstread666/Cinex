'use client'

import { DeleteCommentAction } from "@/actions/delete-comment-action"
import { useMutation } from "@tanstack/react-query"

const DeleteCommentButton = ({ commentid, postslug }: { commentid: string, postslug: string }) => {

    const { mutate, isPending } = useMutation({
        mutationFn: ({ commentid, postslug }: { commentid: string, postslug: string }) =>
            DeleteCommentAction(commentid, postslug)
    })

    return (
        <button
            onClick={() => mutate({ commentid, postslug })}
            disabled={isPending}
            className="delete-comment-button"
        >
            {isPending ? "Deleting..." : "Delete Comment"}
        </button>
    )
}

export default DeleteCommentButton