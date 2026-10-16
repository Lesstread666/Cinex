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

    const imageFile = postdata.image?.get('image')

    if (imageFile != null && !(imageFile instanceof File)) {
        throw new Error("Invalid image format")
    }

    const imageUrl = imageFile instanceof File
        ? await uploadImage(imageFile)
        : null

    const { data, error } = await supabase.from("Posts").insert({
        ...parseData,
        slug: slug,
        author: user.id,
        image: imageUrl
    })
    if (error) throw error

    revalidatePath('/community')
    redirect('/community')

}