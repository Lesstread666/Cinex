'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const DeleteCommentAction = async (commentid: string, postslug: string) => {

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("You must be logged in to delete a comment")

    const { error } = await supabase
        .from("Comments")
        .delete()
        .eq("id", commentid)

    if (error) throw error

    revalidatePath(`/community/${postslug}`)
    redirect(`/community/${postslug}`)
}