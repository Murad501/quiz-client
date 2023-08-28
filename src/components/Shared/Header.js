import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container max-w-5xl mx-auto flex flex-row items-center justify-between py-4 border-b">
        {/* Left side logo */}
        <div className="flex items-center mb-4 lg:mb-0">
          {/* <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
          <Link href={"/"} className="text-2xl font-semibold">
            Quiz App
          </Link>
        </div>

        {/* Right side menus */}
        <nav className="flex space-x-10">
          <Link
            href="/quiz"
            className="text-gray-800 hover:text-gray-900 font-semibold"
          >
            Take Quiz
          </Link>
          {/* <a href="#" className="text-gray-200 hover:text-gray-100">
            About
          </a> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
