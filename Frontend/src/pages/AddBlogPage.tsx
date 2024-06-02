import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/navbar";

const CreateBlogPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://backend.akshatgirdhar05.workers.dev/api/v1/blog",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setSuccessMessage("Blog post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the blog post.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Create a New Blog Post</h1>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter your blog post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block font-bold mb-2">
              Content
            </label>
            <Textarea
              placeholder="Write your blog post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
              rows={8}
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;