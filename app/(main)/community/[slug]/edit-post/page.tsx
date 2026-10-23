import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/serverClient"
import { getSingleCommunityPost } from "@/lib/supabase/queries"
import EditPageForm from "./form"


const EditPostPage = async ({ params }: { params: { slug: string } }) => {

    const { slug } = await params

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await getSingleCommunityPost(slug)
    if (!user || (data && user.id !== data.author.id)) {
        redirect("/")
    }

    return (
        <div className="form-page">
            {data &&

                <div className="form-container">
                    <h1 className="form-title">Edit: {data.title}</h1>
                    <EditPageForm initialValues={{ title: data.title, content: data.content, images: data.images, category: data.category }} postId={data.id} />
                </div>
            }
        </div>
    )
}

export default EditPostPage