import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.BASE_URL;

export const ReadBlogPage = () => {
  const { blogId } = useParams()
  const [title,setTitle] = useState<string>('')
  const [content,setContent] = useState<string>('')
  const [author,setAuthor] = useState('')
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);

  
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/page/${blogId}`)
      setTitle(response.data.title)
      setContent(response.data.content)
      setAuthor(response.data.authorId)
      setPublishedAt(new Date(response.data.publishedAt))
    } catch {
      console.error("Cannot fetch the give blog!")
    }
  }
  useEffect(() => {
    fetchBlog()
  },[])

  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="mt-20 bg-gray-200 justify-center">
        <div className="bg-gray-200">
          <h1 className="text-6xl text-center font-bold">{title}</h1>
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="bg-slate-700 mr-4 rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
            <p className="text-white">AG</p>
          </div>
          <div className="">
            <h2>{author}</h2>
            <div className="flex">
              <p> {`${Math.ceil("hello".length / 100)}`} minute read</p>
              <span className="items-center">.</span>
              <p>Published Date</p>
            </div>
          </div>
        </div>
          <div className="flex justify-center max-w-1/2">
            {content}
          </div>
      </div>
    </div>
  );
};
