import { Navbar } from "@/components/navbar";
import axios from "axios";
import { useState } from "react";

export const ReadBlogPage = () => {
  const [title,setTitle] = useState<string>('')
  const [content,setContent] = useState<string>('')
  
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://backend.akshatgirdhar05.workers.dev/api/v1/blog/page/${blogId}`)
    } catch {

    }
  }

  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="mt-20 bg-gray-200 justify-center">
        <div className="bg-gray-200">
          <h1 className="text-6xl text-center font-bold">{title}</h1>
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="bg-slate-700 mr-4 rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
            <p className="text-white">{intitals}</p>
          </div>
          <div className="">
            <h2>{username}</h2>
            <div className="flex">
              <p> {`${Math.ceil("hello".length / 100)}`} minute read</p>
              <span className="items-center">.</span>
              <p>{publishedDate}</p>
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
