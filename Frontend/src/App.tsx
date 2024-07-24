import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/Signin.tsx";
import CreateBlogPost from "./pages/AddBlogPage.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { ReadBlogPage } from "./pages/ReadBlogPage.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Services from "./pages/Services.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import EditBlogPost from "./pages/EditBlog.tsx";
import ProtectedRoute from "./Utils/ProtectedRoutes.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/addblog"
          element={
            <ProtectedRoute>
              <CreateBlogPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <AllBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:blogId"
          element={
            <ProtectedRoute>
              <ReadBlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBlog/:blogId"
          element={
            <ProtectedRoute>
              <EditBlogPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
