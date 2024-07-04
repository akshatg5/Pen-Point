import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate()
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);

  const rerouteToEditPage = () => {
    navigate(`/editBlog/${blogId}`)
  }

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
        <hr className="border border-black mt-4 w-[40rem]"></hr>
        <div className="py-2 flex justify-center items-center">
          <div className="mr-10">
            <button className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              5
            </button>
          </div>
          <div className="ml-10">
            <button onClick={ () => rerouteToEditPage() } className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Blog
            </button>
          </div>
        </div>
        <hr className="border border-black w-[40rem]"></hr>
        <div className=" mt-8 prose prose-lg mb-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
