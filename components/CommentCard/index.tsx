import { getCommunityPostComments } from "@/lib/supabase/queries"
import DeleteCommentButton from "../DeleteCommentButton"
import AddComment from "@/app/(main)/community/[slug]/add-comment/form"

const CommentCard = async ({ postid, isAuthor, userid, postslug }: { postid: string, isAuthor: boolean, userid: string | null, postslug: string }) => {

    const comments = await getCommunityPostComments(postid)

    const renderComments = (parentid: string | null) => {

        const filteredComments = comments?.filter(comment => comment.parentid === parentid)

        return filteredComments?.map(comment => (
            <div key={comment.id} className="comment-card">

                <p className="comment-content">
                    {comment.content}
                </p>

                <p className="comment-author">
                    by {comment.userid?.username}
                </p>

                {(isAuthor || userid === comment.userid?.id) &&
                    <DeleteCommentButton commentid={comment.id} postslug={postslug} />
                }

                {userid && (
                    <details>
                        <summary className="cursor-pointer text-neon-purple">
                            Reply
                        </summary>

                        <AddComment postid={postid} parentid={comment.id} />
                    </details>
                )}

                <div className="ml-6 mt-4">
                    {renderComments(comment.id)}
                </div>

            </div>
        ))
    }

    return (
        <div className="comments-container">

            <h2 className="comments-title">
                Comments ({comments?.length || 0})
            </h2>

            {comments && comments.length > 0 ?
                renderComments(null)
                :
                <p className="comments-empty">
                    No comments yet. Be the first to comment!
                </p>
            }

        </div>
    )
}

export default CommentCard