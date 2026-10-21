import CommunityPosts from "@/components/CommunityPosts"
import SearchPost from "@/components/SearchPost"
import CategoryButtons from "@/components/CategoryButtons"
import { getCommunityPosts, getPostsByCategories } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const CommunityContent = async ({ category }: { category?: string }) => {

    const supabase = await createClient()

    const { data, error } = category
        ? await getPostsByCategories(supabase, category)
        : await getCommunityPosts(supabase)

    if (error) throw error

    return (
        <>
            <h1 className="header-title text-center pt-6">Community Page</h1>
            <SearchPost />
            <CategoryButtons />
            {data && <CommunityPosts posts={data} />}
        </>
    )
}

export default CommunityContent