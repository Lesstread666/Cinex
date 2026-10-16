import { getCommunityPostComments } from "@/lib/supabase/queries"
import DeleteCommentButton from "../DeleteCommentButton"

const CommentCard = async ({ postid, isAuthor, userid, postslug}: { postid: string, isAuthor: boolean, userid: string | null, postslug: string }) => {

    const comments = await getCommunityPostComments(postid)
    return (
        <div className="comments-container">

            <h2 className="comments-title">Comments ({comments?.length || 0})</h2>

            {comments && comments.length > 0 ?
                comments.map(comment => (
                    <div key={comment.id} className="comment-card">

                        <p className="comment-content">
                            {comment.content}
                        </p>

                        <p className="comment-author">
                            by {comment.userid?.username}
                        </p>
                        {(isAuthor || (userid === comment.userid?.id)) && <DeleteCommentButton commentid={comment.id} postslug={postslug} />}

                    </div>
                ))
                :
                <p className="comments-empty">
                    No comments yet. Be the first to comment!
                </p>
            }

        </div>
    )
}

export default CommentCard