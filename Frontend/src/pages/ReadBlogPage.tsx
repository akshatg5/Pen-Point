import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

export const ReadBlogPage = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState({
    firstName: "",
    lastName: "",
  });
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/page/${blogId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setTitle(response.data.title);
      setContent(response.data.content);
      setAuthor({
        firstName: response.data.publishedBy.firstName,
        lastName: response.data.publishedBy.lastName,
      });
      setPublishedAt(new Date(response.data.publishedAt));
    } catch {
      console.error("Cannot fetch the give blog!");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="bg-gray-200 mt-20 h-full flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="bg-gray-200 w-1/2 text-center">
          <h1 className="text-6xl font-bold">{title}</h1>
        </div>
        <div className="">
          <div className="flex mt-8">
            <div className="bg-slate-700 mr-4 rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
              <p className="text-white">
                {author.firstName[0]?.toUpperCase()}{" "}
                {author.lastName[0]?.toUpperCase()}
              </p>
            </div>
            <div>
              <h2>
                {author.firstName} {author.lastName}
              </h2>
              <div className="flex items-center">
                <p>{`${Math.ceil(content.length / 1000)}`} minute read</p>
                <span className="mx-2">·</span>
                <p>Published On {publishedAt?.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-8 prose prose-lg mb-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
