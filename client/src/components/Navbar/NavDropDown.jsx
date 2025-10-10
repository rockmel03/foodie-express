import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { useAuth } from "../../features/auth/authSlice";
import useLogout from "../../features/auth/hooks/useLogout";
import { Link } from "react-router";

export function NavDropDown() {
  const { user } = useAuth();
  const logout = useLogout();

  const userLinks = [
    {
      title: "Profile",
      path: "/profile",
    },

    {
      title: "Cart",
      path: "/cart",
    },
    {
      title: "Settings",
      path: "/settings",
    },
  ];

  const adminLinks = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
    },
  ];

  const links =
    user?.role === "admin" ? [...userLinks, ...adminLinks] : userLinks;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-700 hover:text-orange-600 font-medium w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
        >
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {links.map((link) => (
            <Link to={link.path} key={link.title}>
              <DropdownMenuItem>{link.title}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {user?.role === "user" && (
          <>
            <DropdownMenuGroup>
              <Link to="/orders">
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Order History</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>View All</DropdownMenuItem>
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
