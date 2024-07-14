import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuotesCardComponent } from "@/components/quotesHalf";

const LandingPage: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-screen max-sm:grid-cols-1">
      <div className="flex flex-col justify-center items-center bg-white max-sm:w-full max-sm:p-4">
        <div className="mb-8 text-center max-sm:mb-4">
          <h1 className="text-4xl mb-6 font-bold max-sm:text-2xl">
            BloggingApp
          </h1>
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
  );
};

export default LandingPage;
