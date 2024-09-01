import Home from "./pages/home/Home";
import User from "./pages/users/User";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import CreateCategory from "./pages/createCategory/CreateCategory";
import ErrorPage from "./pages/error/ErrorPage";
import EditCategory from "./pages/editCategory/EditCategory";
import CreatePost from "./pages/createPost/CreatePost";
import EditPost from "./pages/editPost/EditPost";
// This is how to use env variables in vite
export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route path="/dashboard" element={!user ? <Login /> : <Home />} />
          <Route path="/users" element={<User />} />
          <Route
            path="/createCategory"
            element={!user ? <Login /> : <CreateCategory />}
          />
          <Route
            path="/editCategory/:id"
            element={!user ? <Login /> : <EditCategory />}
          />
          <Route
            path="/createPost"
            element={!user ? <Login /> : <CreatePost />}
          />
          <Route
            path="/editPost/:id"
            element={!user ? <Login /> : <EditPost />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
