"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between relative">
      <Link href="/" className="flex items-center">
        {/* Only SVG Logo (without text) */}
        <div className="relative h-8 w-auto mr-4">
          <Image
            src="/logo-colorful.svg" // Path to your SVG logo
            alt="Whiz Logo"
            width={150} // Adjust width to your preference
            height={40} // Adjust height to your preference
          />
        </div>
      </Link>

      {/* Desktop Navbar Items */}
      <div className="hidden lg:flex items-center gap-x-6">
        {/* Terms and Conditions Text Link with Animation */}
        <Link href="/terms-and-conditions">
          <span className="text-purple-500 text-sm font-semibold hover:text-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Terms & Conditions
          </span>
        </Link>

        {/* Get Started Button with Animation */}
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            className="text-white bg-gradient-to-r from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 rounded-md px-6 py-3 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-gray-800"
        aria-label="Toggle menu">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Navbar Items */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 bg-white p-4 w-3/4 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform">
          {/* Terms and Conditions Text Link */}
          <Link href="/terms-and-conditions">
            <span className="w-full text-center text-purple-500 text-xs hover:text-purple-700">
              Terms & Conditions
            </span>
          </Link>

          {/* Get Started Button */}
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"} passHref>
            <Button className="w-full text-center text-purple-500 p-3">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
