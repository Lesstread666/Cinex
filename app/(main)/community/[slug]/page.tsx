import DeletePostButton from "@/app/components/DeletePostButton"
import { getSingleCommunityPost } from "@/app/lib/supabase/queries"
import { createClient } from "@/app/lib/supabase/serverClient"
import Link from "next/link"


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

                    <p className="single-post-author">
                        {data.author.username}
                    </p>

                    {isAuthor && (
                        <div className="post-actions">

                            <Link
                                className="edit-button"
                                href={`/community/${slug}/edit`}
                            >
                                Edit Post
                            </Link>

                            <DeletePostButton id={data.id} />

                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default CommunityPostPage