import { Route, Routes } from "react-router-dom";
import "./App.css";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Forgot from "./pages/profile/Forgot";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/profile/Signin";
import Signup from "./pages/profile/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* categories */}
        <Route path="/categories" element={<Categories />} />

        {/* blogs */}
        <Route path="/blogs" element={<Blogs />} />

        {/* profile */}
        <Route path="/profile" element={<Profile />} />

        {/* account */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/reset-password" element={<Forgot />} />

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
