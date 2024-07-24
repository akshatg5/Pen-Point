import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuotesCardComponent } from "@/components/quotesHalf";
import { Navbar } from "@/components/navbar";

const LandingPage: React.FC = () => {
  return (
    <>
    <Navbar/>
    <div className="grid grid-cols-2 h-screen max-sm:grid-cols-1">
      <div className="flex flex-col justify-center items-center bg-white max-sm:w-full max-sm:p-4">
        <div className="mb-8 text-center max-sm:mb-4">
          <div className="flex justify-center items-center mb-4">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          <h1 className="text-4xl ml-4 font-bold max-sm:text-2xl">
            PenPoint
          </h1>
          </div>
          <h1 className="text-xl mb-2 max-sm:text-lg">
            Start your blogging journey!
          </h1>
          <div className="my-4 max-sm:my-2">
            <Link to="/signup">
              <Button className="w-[25rem] h-15 max-sm:w-full max-sm:h-12">
                Sign Up
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/signin">
              <Button className="w-[25rem] h-15 max-sm:w-full max-sm:h-12">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <QuotesCardComponent />
    </div>
    </>
  );
};

export default LandingPage;
