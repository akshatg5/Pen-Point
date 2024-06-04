import { Navbar } from "@/components/navbar";

export const ReadBlogPage = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="mt-20 bg-gray-200 justify-center">
        <div className="bg-gray-200">
          <h1 className="text-6xl text-center font-bold">Title of the blog</h1>
        </div>
        <div className="flex justify-center items-center my-4">
          <div className="bg-slate-700 mr-4 rounded-full w-[4rem] h-[4rem] flex justify-center items-center">
            <p className="text-white">AG</p>
          </div>
          <div className="">
            <h2>Akshat Girdhar</h2>
            <div className="flex">
              <p> {`${Math.ceil("hello".length / 100)}`} minute read</p>
              <span className="items-center">.</span>
              <p> May 04,2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
