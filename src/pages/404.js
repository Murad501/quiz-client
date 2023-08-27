import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md mx-auto p-8 rounded shadow-lg text-center">
        <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-300 my-10">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you back to safety.
        </p>
        <Link
          href="/"
          className="px-4 py-2 border text-white rounded transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
