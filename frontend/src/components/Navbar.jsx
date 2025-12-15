import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const userName =
    localStorage.getItem("userName") || "U";

  // Sync auth across tabs
  useEffect(() => {
    const syncAuth = () =>
      setToken(localStorage.getItem("token"));

    window.addEventListener("storage", syncAuth);
    return () =>
      window.removeEventListener("storage", syncAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          SkillExchange
        </Link>

        {/* RIGHT */}
        {token && (
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm">
              <Link to="/matches" className={isActive("/matches")}>
                Matches
              </Link>
              <Link to="/sessions" className={isActive("/sessions")}>
                Sessions
              </Link>
              <Link to="/messages" className={isActive("/messages")}>
                Messages
              </Link>
              <Link to="/profile" className={isActive("/profile")}>
                Profile
              </Link>
            </div>

            {/* Avatar */}
            <Avatar name={userName} size={34} />

            {/* Logout (VISIBLE ON ALL DEVICES ✅) */}
            <button
              onClick={logout}
              className="
                text-red-500 hover:text-red-600
                text-sm font-medium
                hidden sm:block
              "
            >
              Logout
            </button>

            {/* Mobile Logout Icon */}
            <button
              onClick={logout}
              className="
                sm:hidden
                text-red-500
                text-lg
              "
              title="Logout"
            >
              ⎋
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
