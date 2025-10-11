import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../features/auth/authSlice";
import useLogout from "../../features/auth/hooks/useLogout";
import { useNavigate } from "react-router";

const MobileNav = ({ navlinks, toggle, userLinks, adminLinks }) => {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const links =
    user?.role === "admin" ? [...userLinks, ...adminLinks] : userLinks;

  return (
    <>
      <div
        className="md:hidden fixed left-0 top-0 w-full h-screen bg-black z-50 opacity-50 transition-all duration-200"
        onClick={() => toggle(false)}
      />
      <div
        className="md:hidden fixed left-0 top-0 h-screen bg-white z-50 transition-all duration-200"
        onClick={() => toggle(false)}
      >
        <div className="flex items-center justify-between p-4 gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Foodie Express
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {navlinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="text-lg font-medium hover:text-orange-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <hr />
        <div className="flex flex-col gap-4 p-4">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="text-lg font-medium hover:text-orange-500"
            >
              {link.title}
            </Link>
          ))}
          <hr />
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
