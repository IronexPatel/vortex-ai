import React from 'react';
import 'animate.css';
import Image from 'next/image';

const LandingSteps = () => {
    return ( 
        <section className="min-h-screen w-full bg-gray-50 py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl animate__animated animate__fadeIn">How Whiz Works?</h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600 animate__animated animate__fadeIn animate__delay-1s"> 
                        Unlock the power of AI in just three simple steps. Start creating, exploring, and innovating with Whiz.
                    </p>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <Image
                            className="w-full"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                            alt="Curved dotted line indicating steps"
                        />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                        <div className="animate__animated animate__fadeIn animate__delay-2s">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500 border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 1 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-gray-800 md:mt-10 animate__animated animate__fadeIn animate__delay-3s">
                                Create a free account
                            </h3>
                            <p className="mt-4 text-base text-gray-600 animate__animated animate__fadeIn animate__delay-4s">
                                Create your Whiz account in seconds and gain access to powerful AI tools for conversation, image, video, music, and code generation.
                            </p>
                        </div>

                        <div className="animate__animated animate__fadeIn animate__delay-2s">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500  border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 2 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-gray-800 md:mt-10 animate__animated animate__fadeIn animate__delay-3s">
                                Choose Your AI Tool
                            </h3>
                            <p className="mt-4 text-base text-gray-600 animate__animated animate__fadeIn animate__delay-4s">
                                Explore our AI-powered tools for different tasks. Whether it is chat, design, coding, or creativity—Whiz has it all.
                            </p>
                        </div>

                        <div className="animate__animated animate__fadeIn animate__delay-2s">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-500  border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700"> 3 </span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-gray-800 md:mt-10 animate__animated animate__fadeIn animate__delay-3s">
                                Create and Innovate.
                            </h3>
                            <p className="mt-4 text-base text-gray-600 animate__animated animate__fadeIn animate__delay-4s">
                                Start using AI to generate content, build apps, automate tasks, and more. Unleash your creativity with Whiz!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingSteps;
