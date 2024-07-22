import { BlogCard } from "@/components/blogCard";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

interface Blog {
  publishedBy: any;
  id: string;
  title: string;
  content: string;
  authorId: string;
  publishedAt: string;
  firstName: string;
  lastName: string;
}

const AllBlogs: React.FC = () => {
  const [error, setError] = useState("");
  const [blogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const blogsSortedByPublishedDate = allBlogs.data.allBlogs.sort(
        (a: any, b: any) => a.publishedAt - b.publishedAt
      );
      setAllBlogs(blogsSortedByPublishedDate);
      setLoading(false);
    } catch (error) {
      setError("Cannot fetch the blogs");
      navigate("/");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <Navbar />
      <div className="mt-20 flex justify-center items-center">
        <h1 className="font-extrabold text-slate-900 text-center text-4xl sm:text-2xl">
          All Blogs
        </h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <Skeleton />}
      <div className="mt-2 flex flex-col items-center justify-center px-2">
        {loading ? (
          <>
            <Skeleton className="w-full sm:w-4/5 h-24 mb-4" />
            <Skeleton className="w-full sm:w-4/5 h-24 mb-4" />
            <Skeleton className="w-full sm:w-4/5 h-24 mb-4" />
            <Skeleton className="w-full sm:w-4/5 h-24 mb-4" />
          </>
        ) : blogs.length === 0 ? (
          <Link to={"/addblog"} className="text-center mt-10">
            <h1 className="text-2xl font-bold underline">No blogs on your feed!</h1>
            <p className="text-md font-semibold">Write some yourself, come on!</p>
          </Link>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              title={blog.title}
              content={blog.content}
              key={blog.id}
              authorId={blog.authorId}
              publishedAt={new Date(blog.publishedAt)}
              firstName={blog.publishedBy.firstName}
              lastName={blog.publishedBy.lastName}
              toLink={`/blog/${blog.id}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
