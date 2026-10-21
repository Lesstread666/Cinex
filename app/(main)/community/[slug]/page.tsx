import CommentCard from "@/components/CommentCard"
import DeletePostButton from "@/components/DeletePostButton"
import { getSingleCommunityPost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import AddComment from "./add-comment/form"


const CommunityPostPage = async ({ params }: { params: { slug: string } }) => {

    const { slug } = await params

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await getSingleCommunityPost(slug)
    const isAuthor: boolean = user && data && user.id === data.author.id ? true : false

    return (
        <div className="single-post-container">
            {data &&
                <div className="single-post">

                    <h1 className="single-post-title">
                        {data.title}
                    </h1>

                    {data.image && (
                        <img className="single-post-image" src={data.image} alt={data.title} />
                    )}

                    {data.content && (
                        <p className="single-post-text">
                            {data.content}
                        </p>
                    )}

                    <div className="single-post-info">
                        <p className="single-post-category">
                            {data.category === "movies" ? "Movies" : "TV Series"}
                        </p>

                        <p className="single-post-author">
                            {data.author.username}
                        </p>
                    </div>

                    {isAuthor && (
                        <div className="post-actions">

                            <Link className="edit-button" href={`/community/${slug}/edit-post`}>
                                Edit Post
                            </Link>

                            <DeletePostButton id={data.id} />
                        </div>
                    )}
                    <CommentCard postid={data.id} postslug={slug} isAuthor={isAuthor} userid={user ? user.id : null} />
                    {user && <AddComment postid={data.id} />}
                </div>
            }
        </div>
    )
}

export default CommunityPostPage