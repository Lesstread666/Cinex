'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../lib/supabase/serverClient"
import { slugify } from "../lib/supabase/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "../lib/supabase/upload-image"

export const EditPostAction = async ({ postData, postId, removeImage }: { postData: z.infer<typeof postSchema>, postId: string, removeImage: boolean }) => {

    const parseData = postSchema.parse(postData)
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", postId)
        .single()

    if (!post) throw new Error("Post doesn't exist!")

    const imageFile = parseData.image?.get("image")

    if (imageFile != null && !(imageFile instanceof File)) {
        throw new Error("Invalid image format")
    }

    const imageUrl = removeImage
        ? null
        : imageFile instanceof File
            ? await uploadImage(imageFile)
            : post.image

    const { data: updatePost } = await supabase
        .from("Posts")
        .update({ ...parseData, slug: slugify(parseData.title), image: imageUrl })
        .select()
        .eq("id", postId)
        .single()
        .throwOnError()

    revalidatePath("/community")
    redirect(`/community/${updatePost.slug}`)
}