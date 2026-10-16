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

export const getCommunityPostComments = async (postid: string) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("Comments")
        .select("id, content, userid(id, username)")
        .eq("postid", postid)
        .order('created_at', { ascending: false })

    if (error) throw Error
    return data
}

export type CommunityPostType = QueryData<ReturnType<typeof getCommunityPosts>>;

export type SingleCommunityPostType = QueryData<ReturnType<typeof getSingleCommunityPost>>;