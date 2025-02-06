import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useAuth } from "@clerk/nextjs";
import { RainbowButton } from "./ui/rainbow-button";
import 'animate.css';
import Image from "next/image";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-gray-800 font-bold py-36 text-center space-y-5">
      
      {/* Header with animation */}
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold animate__animated animate__fadeIn animate__delay-1s">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <Typewriter
            options={{
              strings: [
                "Chatbot",
                "Image Generation",
                "Code Generation",
                "Vision Ai",
                "Video Generation",
              ],
              autoStart: true,
              loop: true,
              cursor: "_",
              delay: 100,
              deleteSpeed: 50,
            }}
          />
        </div>
      </div>

      {/* Subheader with fade-in animation */}
      <div className="text-sm md:text-xl font-light text-gray-600 animate__animated animate__fadeIn animate__delay-2s">
        Create content using AI 10x faster.
      </div>

      {/* Call-to-action button with bounce effect */}
      <div className="flex justify-center space-x-4 animate__animated animate__bounceIn animate__delay-2s">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <RainbowButton className="md:text-lg p-4 md:p-6 font-semibold bg-gradient-to-r from-purple-400 to-pink-600">
            Start Generating for Free
          </RainbowButton>
        </Link>
      </div>

      {/* No credit card text with slide-in animation */}
      <div className="text-gray-600 text-xs md:text-sm font-normal animate__animated animate__slideInUp animate__delay-2s">
        No credit card required.
      </div>

      {/* Hero Image with fade-in and scaling animation */}
      <div className="flex justify-center items-center animate__animated animate__fadeIn animate__delay-3s">
        <div className="relative w-full max-w-4xl lg:max-w-6xl">
          <Image
            className="transform scale-90 lg:scale-100 animate__animated animate__zoomIn"
            src="/hero-image.png" // Ensure the path is correct
            alt="Vortex Hero Illustration"
            width={1200} // Adjust the width for larger screens
            height={800} // Adjust the height to match the aspect ratio
            objectFit="cover" // Ensure the image covers its container
            objectPosition="center" // Position the image correctly
          />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
