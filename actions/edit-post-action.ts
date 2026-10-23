'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../lib/supabase/serverClient"
import { slugify } from "../lib/supabase/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadImage } from "../lib/supabase/upload-image"

export const EditPostAction = async ({ postData, postId, remainingImages }: { postData: z.infer<typeof postSchema>, postId: string, remainingImages: string[] }) => {

    const parseData = postSchema.parse(postData)
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from("Posts")
        .select("*")
        .eq("id", postId)
        .single()

    if (!post) throw new Error("Post doesn't exist!")

    const { data: { user } } = await supabase.auth.getUser()

    if (!user || post.author !== user.id) {
        throw new Error("Unauthorized access!")
    }

    const imageFiles = parseData.images?.getAll("images") || []

    const imageUrls: string[] = []

    for (const file of imageFiles) {
        if (!(file instanceof File)) {
            throw new Error("Invalid image format")
        }

        const imageUrl = await uploadImage(file)
        imageUrls.push(imageUrl)
    }

    const { data: updatePost } = await supabase
        .from("Posts")
        .update({
            ...parseData,
            slug: slugify(parseData.title),
            images: [
                ...remainingImages.filter(image => post.images.includes(image)),
                ...imageUrls
            ]
        })
        .select()
        .eq("id", postId)
        .single()
        .throwOnError()

    revalidatePath("/community")
    redirect(`/community/${updatePost.slug}`)
}