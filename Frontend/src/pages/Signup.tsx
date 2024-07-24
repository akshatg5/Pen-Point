import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { QuotesCardComponent } from "@/components/quotesHalf";
import { LoadingSpinner } from "@/components/loadingSpinner";

// Add this declaration to avoid TypeScript errors
declare global {
  interface Window {
    gapi: any;
  }
}

const BACKEND_URL = import.meta.env.VITE_BASE_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
      }).then(() => {
        window.gapi.signin2.render('google-signin-button', {
          scope: 'profile email',
          width: 240,
          height: 50,
          longtitle: true,
          theme: 'dark',
          onsuccess: handleGoogleSignIn,
        });
      });
    });
  }, []);

  const handleGoogleSignIn = async (googleUser: any) => {
    const idToken = googleUser.getAuthResponse().id_token;

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/google`, {
        token: idToken,
      });

      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      setError("Error signing in with Google, please try again or raise a ticket!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
        username,
      });

      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError("Invalid Email or Password. Try again!");
      } else {
        setError("Error signing up, please try again or raise a ticket!");
      }
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen max-sm:grid-cols-1">
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
        <form onSubmit={handleSubmit} className="w-96 max-sm:ml-4 max-sm:w-3/4">
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
            <label htmlFor="username" className="block font-bold mb-2">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="firstName" className="block font-bold mb-2">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="lastName" className="block font-bold mb-2">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
        <div className="mt-4 text-center">
          <h1 className="text-xl font-bold mb-2">Sign In With Google</h1>
          <div id="google-signin-button"></div>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
          <LoadingSpinner className="" />
        </div>
      )}
      <QuotesCardComponent />
    </div>
  );
};

export default SignUp;
