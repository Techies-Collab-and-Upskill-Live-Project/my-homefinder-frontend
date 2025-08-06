import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbarRoutes = ["/messages"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const stored = localStorage.getItem("user");
        if (!stored) return;

        const parsed = JSON.parse(stored);
        const token = parsed?.token?.token;
        const userId = parsed?.user?.id;

        if (!token || !userId) {
          console.warn("Missing token or user ID.");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = res.data?.data?.user || res.data?.user;
        if (userData) {
          const updatedUser = {
            ...parsed,
            user: userData,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          localStorage.setItem("authUser", JSON.stringify(userData));
        } else {
          console.warn("User data not found in response", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch authenticated user:", err);
        if (err.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchAuthUser();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!shouldHideNavbar && <Footer />}
    </div>
  );
};

export default Layout;
