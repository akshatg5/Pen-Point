import { BlogCard } from "@/components/blogCard";
import { Navbar } from "@/components/navbar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const AllBlogs: React.FC = () => {
  const [error, setError] = useState("");
  const [blogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await axios.get(
        "https://backend.akshatgirdhar05.workers.dev/api/v1/blog/bulk",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAllBlogs(allBlogs.data.allBlogs);
      setLoading(false);
    } catch (error) {
      setError("Cannot fetch the blogs");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <Navbar />
      <div className="p-2 mt-20">
        <h1 className="text-4xl font-bold">All Blogs</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Skeleton />}
      <div className="flex flex-col items-center justify-center">
        {loading ? (
          <>
            <Skeleton className="w-1/2 h-24 mb-4" />
            <Skeleton className="w-1/2 h-24 mb-4" />
            <Skeleton className="w-1/2 h-24 mb-4" />
          </>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              title={blog.title}
              content={blog.content}
              key={blog.id}
              toLink={'/blog'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
