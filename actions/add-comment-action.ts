'use server'

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

export const AddCommentAction = async ({ commentdata, postid, parentid }: { commentdata: z.infer<typeof commentSchema>, postid: string, parentid?: string }) => {
    const supabase = await createClient()
    const parseData = commentSchema.parse(commentdata)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw Error("You need to log in to add the comment")

    await supabase
        .from("Comments")
        .insert({ postid: postid, userid: user.id, parentid: parentid ?? null, ...parseData })
        .throwOnError()

    revalidatePath("/community")
}