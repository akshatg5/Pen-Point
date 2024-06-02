import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Random blog titles */}
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <div className="mt-8 text-center">
            <div className="justify-center items-center flex">
                <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-10 mb-5"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
              </svg>
                  </Link>
            </div>
            <blockquote className="text-gray-600 italic">
              "The customer service I received was exceptional. The support team
              went above and beyond to address my concerns."
            </blockquote>
            <p className="font-bold mt-2">Julia Wingfield, CEO - Acme Inc.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white">
        <div className="mb-8 text-center">
          <h1 className="text-4xl mb-6 font-bold">BloggingApp</h1>
          <h1 className="text-xl mb-2 ">Start your bloggin journey!</h1>
          <div className="my-4 ">
            <Link to="/signup">
              <Button className="w-[25rem] h-15">Sign Up</Button>
            </Link>
          </div>
          <div>
            <Link to="/signin">
              <Button className="w-[25rem] h-15">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
