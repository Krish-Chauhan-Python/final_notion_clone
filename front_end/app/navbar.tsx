"use client";
import { usePathname } from "next/navigation";
import { logout } from "./login/actions";

const Navbar = () => {
  const pathname = usePathname();
  const isLoggedIn = pathname.includes("dashboard");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-1 py-2 bg-white shadow-md">
      <div className="text-4xl font-extrabold text-blue-700 tracking-wide hover:bg-gray-300 transition-all delay-100 rounded p-2 py-3">
        Notion Clone
      </div>

      <div className="flex gap-0.5 text-gray-700 font-semibold text-lg">
        <a
          href="/"
          className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-2 after:rounded after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-700 hover:bg-gray-200 text-2xl transition delay-10 rounded px-20 py-3"
        >
          Home
        </a>
        <a
          href="/about"
          className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-2 after:rounded after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-700 hover:bg-gray-200 text-2xl transition delay-10 rounded px-20 py-3"
        >
          About Us
        </a>
        <a
          href="/features"
          className="relative inline-block after:absolute after:left-0 after:bottom-0 after:h-2 after:rounded after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-700 hover:bg-gray-200 text-2xl transition delay-10 rounded px-20 py-3"
        >
          Features
        </a>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={() => logout()}
            className="px-15 py-2 text-4xl bg-red-500 text-white rounded relative inline-block after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:bg-red-400 transition delay-75 font-semibold shadow"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="px-15 py-2 text-4xl bg-blue-600 text-white rounded relative inline-block after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:bg-blue-700 transition delay-75 font-semibold shadow"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
