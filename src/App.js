import React from "react";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Forgot from "./pages/profile/Forgot";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/profile/Signin";
import Signup from "./pages/profile/Signup";
import useMyself from "./hooks/useMyself";
import Loading from "./shared/loading/LoadingXL";
import RequireAuth from "./components/profile/RequireAuth";
import MyOrder from "./pages/MyOrder";
import Analytics from "./pages/dashboard/Analytics";
import AddNewProduct from "./pages/dashboard/products/AddNewProduct";
import ManageProducts from "./pages/dashboard/products/ManageProducts";
import AddNewCategory from "./pages/dashboard/categories/AddNewCategory";
import ManageCategories from "./pages/dashboard/categories/ManageCategories";
import AddNewBrand from "./pages/dashboard/brands/AddNewBrand";
import ManageBrands from "./pages/dashboard/brands/ManageBrands";
import AccountMigrations from "./pages/dashboard/accounts/AccountMigrations";
import ManageUsers from "./pages/dashboard/accounts/ManageUsers";
import AddNewStore from "./pages/dashboard/stores/AddNewStore";
import ManageStores from "./pages/dashboard/stores/ManageStores";
import AddNewStock from "./pages/dashboard/stocks/AddNewStock";
import ManageStocks from "./pages/dashboard/stocks/ManageStocks";
import AddNewBanner from "./pages/dashboard/banners/AddNewBanner";
import ManageBanners from "./pages/dashboard/banners/ManageBanners";
import AddNewReview from "./pages/dashboard/reviews/AddNewReview";
import ManageReviews from "./pages/dashboard/reviews/ManageReviews";
import AddNewBlog from "./pages/dashboard/blogs/AddNewBlog";
import ManageBlogs from "./pages/dashboard/blogs/ManageBlogs";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Context API
export const UserContext = React.createContext({});

function App() {
  const { user, loading } = useMyself(localStorage?.getItem("accessToken"));

  return loading ? (
    <Loading />
  ) : (
    <>
      <UserContext.Provider value={user}>
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
            >
              <Route index element={<Analytics />} />
              <Route path="add-new-product" element={<AddNewProduct />} />
              <Route path="manage-products" element={<ManageProducts />} />
              <Route path="add-new-category" element={<AddNewCategory />} />
              <Route path="manage-categories" element={<ManageCategories />} />
              <Route path="add-new-brand" element={<AddNewBrand />} />
              <Route path="manage-brands" element={<ManageBrands />} />
              <Route
                path="account-migrations"
                element={<AccountMigrations />}
              />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="add-new-store" element={<AddNewStore />} />
              <Route path="manage-stores" element={<ManageStores />} />
              <Route path="add-new-stock" element={<AddNewStock />} />
              <Route path="manage-stocks" element={<ManageStocks />} />
              <Route path="add-new-banner" element={<AddNewBanner />} />
              <Route path="manage-banners" element={<ManageBanners />} />
              <Route path="add-new-review" element={<AddNewReview />} />
              <Route path="manage-reviews" element={<ManageReviews />} />
              <Route path="add-new-blog" element={<AddNewBlog />} />
              <Route path="manage-blogs" element={<ManageBlogs />} />
            </Route>

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

            {/* my orders */}
            <Route
              path="my-orders"
              element={
                <RequireAuth>
                  <MyOrder />
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
    </>
  );
}

export default App;
