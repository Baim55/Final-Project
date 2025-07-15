import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Destination from "./pages/Destination";
import Contact from "./pages/contact/Contact";
import Wishlist from "./pages/wishlist/Wishlist";
import TourDetail from "./pages/TourDetail/TourDetail";
import ForgotPassword from "./pages/auth/forgotpassword/ForgotPassword";
import Resetpassword from "./pages/auth/resetpassword/Resetpassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/userSlice";
import axios from "axios";
import RequireAdmin from "./components/auth/RequireAdmin";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import AdminTours from "./pages/admin/adminTours/AdminTours";
import AdminUsers from "./pages/admin/adminUsers/AdminUsers";
import NewTour from "./pages/admin/newTour/NewTour";
import EditTour from "./pages/admin/editTour/EditTour";
import Tour3DView from "./pages/3D/Tour3DView";
import MyBookings from "./pages/myBookings/MyBookings";
import AdminBookings from "./pages/admin/booking/AdminBookings";
import AdminMessages from "./pages/admin/messages/AdminMessages";
import AdminComments from "./pages/admin/comments/AdminComments";
import CountryTours from "./pages/countryTours/CountryTours";
import About from "./pages/About";
import Blog from "./pages/Blog";
import AdminBlog from "./pages/admin/adminBlog/AdminBlog";
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import FAQ from "./pages/FAQ/FAQ";
import Success from "./pages/payment/Success";
import Cancel from "./pages/payment/Cancel";
import NotFound from "./pages/notFound/NotFound";
import AdminChat from "./pages/admin/chat/AdminChat";
import AdminLogin from "./pages/admin/login/AdminLogin";
import NotificationListener from "./components/notification/NotificationListener";
import Chat from "./components/chat/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destinations",
        element: <Destination />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/FAQ",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/mybooking",
        element: <MyBookings />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/detail/:id",
        element: <TourDetail />,
      },
      {
        path: "/detail/:id/3d-view",
        element: <Tour3DView />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword",
        element: <Resetpassword />,
      },
      {
        path: "/tours/country/:country",
        element: <CountryTours />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/blog",
        element: <BlogList />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },
       {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
        children: [
          { index: true, element: <h2>Welcome, Admin!</h2> },
          { path: "tours", element: <AdminTours /> },
          { path: "tours/new", element: <NewTour /> },
          { path: "tours/:id/edit", element: <EditTour /> },
          { path: "users", element: <AdminUsers /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "comments", element: <AdminComments /> },
          { path: "messages", element: <AdminMessages /> },
          { path: "blogs", element: <AdminBlog /> },
          { path: "chat", element: <AdminChat /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  { path: "/admin/login", element: <AdminLogin /> },
]);
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", {
          withCredentials: true,
        });
        dispatch(setUser(res.data.user));
      } catch (error) {
        console.log("İstifadəçi login olmayıb");
      }
    }

    fetchUser();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <NotificationListener />
    </>
  );
}

export default App;
