import CommunityPosts from "@/app/components/CommunityPosts"
import { getCommunityPosts } from "@/app/lib/supabase/queries"
import { createClient } from "@/app/lib/supabase/serverClient"

const CommunityPage = async () => {

    const supabase = await createClient()
    const { data, error } = await getCommunityPosts(supabase)

    return (
        <>
            <h1 className="header-title text-center pt-6">Community Page</h1>
            {data && <CommunityPosts  posts = {data} />}
        </>

    )
}

export default CommunityPage