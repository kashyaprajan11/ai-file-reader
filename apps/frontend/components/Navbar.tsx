"use client";
import { useAppContext } from "@/app/appContext";

export default function Navbar() {
  const { user, handleLogout } = useAppContext();
  const isUserLoggedIn = !!user;
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <a href="/" className="btn btn-ghost text-xl">
        Read your Files
      </a>
      {!isUserLoggedIn && (
        <div className="flex gap-2">
          <a href="/login" className="btn hover:bg-[rgba(255,255,255,0.1)]">
            Login
          </a>
          <a href="/register" className="btn hover:bg-[rgba(255,255,255,0.3)]">
            Register
          </a>
        </div>
      )}
      {isUserLoggedIn && (
        <button
          onClick={handleLogout}
          className="btn hover:bg-[rgba(255,255,255,0.1)]"
        >
          Logout
        </button>
      )}
    </div>
  );
}
