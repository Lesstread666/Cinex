import CommunityContent from "@/components/CommunityContent"

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {

    const { category } = await params

    return <CommunityContent category={category === "all" ? undefined : category} />
}

export default CategoryPage