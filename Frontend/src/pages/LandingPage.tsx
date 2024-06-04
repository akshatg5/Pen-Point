import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QuotesCard } from "@/components/quotesHalf";

const LandingPage: React.FC = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      
      <QuotesCard />
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
