import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, MailIcon, BellIcon } from "lucide-react";
import logo from "@/assets/logo.svg";
import useApi from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { token, setToken } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) return;

        console.log("Access token in useAuth:", token);

        const response = await api.get.auth();
        console.log("User data fetched:", response);

        setUserEmail(response.email || "Unknown");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserEmail(null);
      }
    };

    fetchUser();
  }, [api, token]);

  const handleLogout = async () => {
    try {
      await api.del.logout();
      setToken(null);
      localStorage.removeItem("access_token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-16 items-center px-4 gap-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <MenuIcon className="h-6 w-6" />
      </Button>
      <img src={logo} alt="Logo" className="h-8" />
      <h1 className="ml-5 mt-1 font-semibold text-black text-base">
        Asset Collector
      </h1>
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-100 text-gray-700"
        >
          <MailIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-100 text-gray-700"
        >
          <BellIcon className="h-5 w-5" />
        </Button>
        <span className="text-sm text-gray-700">{userEmail}</span>
        <Button onClick={handleLogout} variant="outline" size="sm">
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Header;
