import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" text-white max-w-5xl mx-auto">
      <div className="container mx-auto py-8 border-t">
        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-900">123 Street, City</p>
            <p className="text-gray-900">Email: contact@example.com</p>
            <p className="text-gray-900">Phone: +1 234 5678</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-700 hover:font-semibold transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-700 hover:font-semibold transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-700 hover:font-semibold transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-700 hover:font-semibold transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6" />
        <p className="text-center text-gray-800">
          &copy; 2023 Quiz App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
