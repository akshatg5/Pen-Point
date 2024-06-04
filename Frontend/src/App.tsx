import { BrowserRouter,Route,Routes } from "react-router-dom";
import SignUp  from './pages/Signup'
import SignIn from "./pages/Signin.tsx";
import CreateBlogPost from "./pages/AddBlogPage.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { ReadBlogPage } from "./pages/ReadBlogPage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/addblog' element={<CreateBlogPost/>} />
            <Route path='/blogs' element={<AllBlogs/>} />
            <Route path='/blog' element={<ReadBlogPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;