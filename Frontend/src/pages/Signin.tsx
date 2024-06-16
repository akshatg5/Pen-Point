import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { QuotesCardComponent } from "@/components/quotesHalf";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/signin`,
        {
          email,
          password,
        }
      );
      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs")
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-in");
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <QuotesCardComponent />
      <div className="flex flex-col justify-center items-center bg-white">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p>
            Don't have an account?{" "}
            <a className="text-blue-500 underline" href="/signup">
              Sign Up
            </a>{" "}
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
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

export default SignIn;
