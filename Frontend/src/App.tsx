import { BrowserRouter,Route,Routes } from "react-router-dom";
import { SignUp } from './pages/Signup.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<SignUp/>} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;