import { QueryData } from "@supabase/supabase-js"
import { createClient } from "./browserClient";

export const getCommunityPosts = async (supabase: ReturnType<typeof createClient>) => {

    return await supabase.from('Posts')
        .select('id, title, slug, image, author("id","username")')
        .order('created_at', { ascending: false })
}

export const getSingleCommunityPost = async (slug: string) => {
    const supabase = createClient()
    return await supabase.from('Posts')
        .select('id, title, content, image, author("id","username")')
        .eq('slug', slug)
        .single()
}

export type CommunityPostType = QueryData<ReturnType<typeof getCommunityPosts>>;

export type SingleCommunityPostType = QueryData<ReturnType<typeof getSingleCommunityPost>>;