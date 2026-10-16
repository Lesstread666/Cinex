import { CommunityPostType } from "@/lib/supabase/queries"
import Link from "next/link"

const CommunityPosts = ({ posts }: { posts: CommunityPostType }) => {
    return (
        <div className="community-container">
            {posts.map((post) => (
                <Link
                    className="community-card"
                    key={post.slug}
                    href={`/community/${post.slug}`}
                >
                    <h3 className="community-card-title">
                        {post.title}
                    </h3>

                    <p className="community-card-author">
                        {post.author.username}
                    </p>
                </Link>
            ))}
        </div>
    )
}

export default CommunityPosts