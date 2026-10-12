'use client'
import { DeletePostAction } from "@/app/actions/delete-post-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeletePostButton = ({ id }: { id: string }) => {

    const { mutate } = useMutation({
        mutationFn: DeletePostAction,

        onSettled: () => toast("Your post successfully deleted")
    })

    return (
        <button className="delete-button" onClick={() => mutate(id)}>
            Delete Post
        </button>
    )
}

export default DeletePostButton