import React from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Forgot from "./pages/profile/Forgot";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/profile/Signin";
import Signup from "./pages/profile/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import useMyself from "./utilities/useMyself";
import Loading from "./shared/loading/Loading";
import RequireAuth from "./components/profile/RequireAuth";

export const UserContext = React.createContext({});

function App() {
  const [user, loading] = useMyself(localStorage?.getItem("accessToken"));

  return loading ? (
    <Loading />
  ) : (
    <UserContext.Provider value={{ user, loading }}>
      <div className="App">
        <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* categories */}
          <Route path="/categories" element={<Categories />} />

          {/* blogs */}
          <Route path="/blogs" element={<Blogs />} />

          {/* profile */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          {/* account */}
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/reset-password" element={<Forgot />} />

          {/* not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* alert toast */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
