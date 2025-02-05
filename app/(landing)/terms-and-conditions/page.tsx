'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
    return (
        <motion.div 
            className="max-w-5xl mx-auto p-8 text-gray-200 bg-gray-50 min-h-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1 
                className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-purple-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Terms and Conditions
            </motion.h1>
            
            <section className="mb-12">
                <motion.h2 
                    className="text-2xl sm:text-3xl font-semibold text-purple-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >1. Introduction</motion.h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-300">
                    Welcome to Whiz. These Terms and Conditions (Terms) govern your use of our platform and its associated services. 
                    By accessing or utilizing Whiz, you acknowledge and agree to comply with these Terms. 
                    If you do not agree to these Terms, you must refrain from using the platform.
                </p>
            </section>

            <section className="mb-12">
                <motion.h2 
                    className="text-2xl sm:text-3xl font-semibold text-purple-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >2. Use of Services</motion.h2>
                <ul className="list-disc ml-6 sm:ml-8 mt-4 text-base sm:text-lg leading-relaxed text-gray-300">
                    <li>Users must be at least 13 years of age to access Whiz.</li>
                    <li>All services provided by Whiz must be used in compliance with applicable laws and regulations.</li>
                    <li>Whiz reserves the right to modify, suspend, or discontinue any service feature at its discretion, with or without notice.</li>
                </ul>
            </section>

            <section className="mb-12">
                <motion.h2 
                    className="text-2xl sm:text-3xl font-semibold text-purple-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >3. User Accounts</motion.h2>
                <ul className="list-disc ml-6 sm:ml-8 mt-4 text-base sm:text-lg leading-relaxed text-gray-300">
                    <li>Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.</li>
                    <li>Users must provide accurate and complete registration information and update it as necessary to ensure it remains current.</li>
                    <li>Whiz reserves the right to suspend or terminate any account that violates these Terms or engages in unlawful or harmful activities.</li>
                </ul>
            </section>

            <section className="mb-12">
                <motion.h2 
                    className="text-2xl sm:text-3xl font-semibold text-purple-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >4. Contact Information</motion.h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-300">
                    If you have any questions regarding these Terms, please contact our support team at 
                    <a href="mailto:support@whiz.com" className="text-purple-400 underline">ironex75@gmail.com</a>.
                </p>
            </section>
        </motion.div>
    );
};

export default TermsAndConditions;
