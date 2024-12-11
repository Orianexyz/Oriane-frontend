import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, MailIcon, BellIcon } from "lucide-react";
import logo from "/small.png";
import useApi from "@/hooks/useApi";

const Header = () => {
  const navigate = useNavigate();
  const { del } = useApi();
  const [user, setUser] = useState<{ email: string; token: string } | null>({
    email: "user@example.com",
    token: "fakeToken123",
  });

  const handleLogout = async () => {
    try {
      if (!user || !user.token) {
        throw new Error("User not authenticated");
      }

      await del.auth.logout(user.token);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
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
        {user ? (
          <>
            <span className="text-sm text-gray-700">{user.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            size="sm"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
