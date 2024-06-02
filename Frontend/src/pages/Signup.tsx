import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend.akshatgirdhar05.workers.dev/api/v1/auth/signup",
        {
          email,
          password,
          name,
        }
      );

      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      alert("Signup Successful!");
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-up");
    }
  };

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
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 underline">
              Login
            </a>
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="w-96">
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block font-bold mb-2">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
