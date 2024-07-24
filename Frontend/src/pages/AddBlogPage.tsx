import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import MDEditor from "@uiw/react-md-editor";
import "../styles/editorStyles.css";
import { LoadingSpinner } from "@/components/loadingSpinner";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const CreateBlogPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [value, setValue] = useState<string>("**Hello world!!!**");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      // Upload the image first if it exists
      let uploadedImageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", upload_preset);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        uploadedImageUrl = res.data.secure_url;
      }

      await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: value,
          imageLink: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setSuccessMessage("Blog post created successfully!");
      setTitle("");
      setValue(""); // Clear the MDEditor content
      setImage(null);
      setImageUrl(""); // Clear the image URL
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("An error occurred while creating the blog post.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-24 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-[75%] ">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create a New Blog Post</h1>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="image" className="block font-bold mb-2">
                Upload Image
              </label>
              <input type="file" onChange={handleImageChange} />
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded" className="mt-4 w-[4rem] h-[4rem]" />
              )}
            </div>
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
            <div className="mb-6 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 lg:pr-2">
                <label htmlFor="content" className="block font-bold mb-2">
                  Content
                </label>
                <MDEditor
                  value={value}
                  preview="edit"
                  onChange={(val) => setValue(val || "")}
                  className="h-full"
                />
              </div>
              <div className="lg:w-1/2 lg:pl-2 mt-4 lg:mt-0">
                <label htmlFor="preview" className="block font-bold mb-2">
                  Preview
                </label>
                <div className="wmde-markdown h-full">
                  <MDEditor.Markdown
                    source={value}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
              </div>
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
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
              <LoadingSpinner className="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
