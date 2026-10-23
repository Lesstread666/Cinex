'use server'

import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "../lib/supabase/serverClient";
import { slugify } from "../lib/supabase/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "../lib/supabase/upload-image";

export const CreatePostAction = async (postdata: z.infer<typeof postSchema>) => {

    const parseData = postSchema.parse(postdata)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error("Unauthorized access!")

    const slug = slugify(parseData.title)

    const imageFiles = postdata.images?.getAll('images') || []

    const imageUrls: string[] = []

    for (const file of imageFiles) {

        if (!(file instanceof File)) {
            throw new Error("Invalid image format")
        }

        const imageUrl = await uploadImage(file)

        imageUrls.push(imageUrl)
    }

    const { data, error } = await supabase.from("Posts").insert({
        ...parseData,
        slug: slug,
        author: user.id,
        images: imageUrls
    })
    if (error) throw error

    revalidatePath('/community')
    redirect('/community')

}