import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Container from "../Container";
import { Link } from "react-router";
import { useAuth } from "../../features/auth/authSlice";
import { NavDropDown } from "./NavDropDown";

const navlinks = [
  {
    name: "Menu",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <nav className="w-full py-5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Foodie Express
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navlinks.map((link) => (
            <Link to={link.path} key={link.name}>
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-orange-600 font-medium"
              >
                {link.name}
              </Button>
            </Link>
          ))}

          {isAuthenticated ? (
            <NavDropDown />
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </nav>
    </Container>
  );
};

export default Navbar;
