'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "../lib/supabase/serverClient"

export const DeletePostAction = async (postId: string) => {
    const supabase = await createClient()


    await supabase.from("Posts")
        .delete()
        .eq("id", postId)
        .throwOnError()

    revalidatePath("/community")
    redirect("/community")
}