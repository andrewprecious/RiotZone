import Home from "./pages/home/Home";
import CategoryContents from "./pages/categoryContents/CategoryContents";
import SinglePost from "./pages/singlePost/SinglePost";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import { useAuth } from "./context/AuthContext";
import RequestReset from "./pages/requestReset/RequestReset";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// This is how to use env variables in vite
export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryContents />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/request-reset"
            element={!user ? <RequestReset /> : <Navigate to="/" />}
          />
          <Route
            path="user/reset-password/:token"
            element={!user ? <ResetPassword /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
