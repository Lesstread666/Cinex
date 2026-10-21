import Link from "next/link"

const CategoryButtons = () => {
    return (
        <div className="category-container">
            <h2 className="category-title">Filter Posts</h2>

            <div className="category-buttons">
                <Link href="/community/posts/all" className="category-button">
                    All Posts
                </Link>

                <Link href="/community/posts/movies" className="category-button">
                    Movies
                </Link>

                <Link href="/community/posts/series" className="category-button">
                    TV Series
                </Link>
            </div>
        </div>
    )
}

export default CategoryButtons