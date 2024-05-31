import { BlogCard } from "@/components/blogCard";
import React from "react"

const AllBlogs : React.FC = () => {
    
    return (
        <div className="flex flex-col bg-gray-100 h-screen items-center">
            <div>
                <h1 className="text-2xl font-bold">All Blogs</h1>
            </div>
            <div>
                <BlogCard />
            </div>

        </div>
    )
}

export default AllBlogs;