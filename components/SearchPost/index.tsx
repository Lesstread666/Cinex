'use client'

import { searchPost, searchPostType } from "@/lib/supabase/queries"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const SearchPost = () => {
    const [input, setInput] = useState<string>("")
    const [searchResults, setSearchResults] = useState<searchPostType | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        setInput(event.target.value)
    }

    const handleClick = async () => {
        setError(null)

        const { data, error } = await searchPost(input)

        if (error) {
            setError("Failed to search posts")
            return
        }

        setSearchResults(data)
    }

    return (
        <div className="search-container">
            <div className="search-form">
                <input
                    className="search-input"
                    value={input}
                    onChange={handleChange}
                    placeholder="Search posts by title..."
                />

                <button className="search-button" onClick={handleClick}>
                    Search
                </button>
            </div>

            {error && <p className="search-error">{error}</p>}

            {searchResults && (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                            <Link
                                key={result.slug}
                                href={`/community/${result.slug}`}
                                className="search-result"
                            >
                                {result.title}
                            </Link>
                        )))
                        :
                        (
                            <p className="search-empty">No posts found.</p>
                        )}
                </div>
            )}
        </div>
    )
}

export default SearchPost