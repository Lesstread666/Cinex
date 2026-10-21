import { QueryData } from "@supabase/supabase-js"
import { createClient } from "./browserClient";

export const getCommunityPosts = async (supabase: ReturnType<typeof createClient>) => {

    return await supabase
        .from('Posts')
        .select('id, title, slug, category, image, author("id","username")')
        .order('created_at', { ascending: false })
}

export const getSingleCommunityPost = async (slug: string) => {
    const supabase = createClient()
    return await supabase
        .from('Posts')
        .select('id, title, content, image, category, author("id","username")')
        .eq('slug', slug)
        .single()
}

export const searchPost = async (searchTerm: string) => {
    const supabase = createClient()
    return await supabase
        .from("Posts")
        .select('title, slug')
        .ilike('title', `%${searchTerm}%`)
}

export const getCommunityPostComments = async (postid: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from("Comments")
        .select("id, content, userid(id, username)")
        .eq("postid", postid)
        .order('created_at', { ascending: false })

    if (error) throw Error
    return data
}

export const getPostsByCategories = async (supabase: ReturnType<typeof createClient>, category: string) => {

    return await supabase
        .from("Posts")
        .select('id, title, slug, image, category, author("id","username")')
        .eq("category", category)
        .order('created_at', { ascending: false })
}

export type CommunityPostType = QueryData<ReturnType<typeof getCommunityPosts>>;

export type SingleCommunityPostType = QueryData<ReturnType<typeof getSingleCommunityPost>>;

export type searchPostType = QueryData<ReturnType<typeof searchPost>>;

export type CommunityPostComments = QueryData<ReturnType<typeof getCommunityPostComments>>;

export type CategoryPostsType = QueryData<ReturnType<typeof getPostsByCategories>>