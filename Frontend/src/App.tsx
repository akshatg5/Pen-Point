import { BrowserRouter,Route,Routes } from "react-router-dom";
import SignUp  from './pages/Signup'
import SignIn from "./pages/Signin.tsx";
import CreateBlogPost from "./pages/AddBlogPage.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/addblog' element={<CreateBlogPost/>} />
            <Route path='/blogs' element={<AllBlogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;