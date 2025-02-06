"use client";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowRight, CodeXml, ImageIcon, MessagesSquare, VenetianMaskIcon, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const tools = [
    {
        label: "Conversation",
        description: "Chat with the smartest AI - now live!",
        icon: MessagesSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",
        disabled: false,
    },
    {
        label: "Image Generation",
        description: "Create stunning AI-generated images.",
        icon: ImageIcon,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/image",
        disabled: false,
    },
     {
    label: "Vision Ai",
    description:"Generate description about the topic you want.",
    icon: VenetianMaskIcon,
    href: "/vision",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    disabled: true,
  },
    {
        label: "Video Generation",
        description: "Generate AI-powered videos with ease.",
        icon: Video,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        href: "/video",
        disabled: true,
    },
    {
        label: "Code Generation",
        description: "Generate and improve code with AI.",
        icon: CodeXml,
        color: "text-green-900",
        bgColor: "bg-green-900/10",
        href: "/code",
        disabled: true,
    },
];

const DashboardPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6 ">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold ">Explore the power of AI</h2>
                
                <p className="text-muted-foreground font-light text-md md:text-lg mt-2">
                    Unlock the power of AI with our intelligent tools.
                </p>
                <p className="mt-4 text-lg font-semibold text-pink-500">🚀 Our Image Generation is now live! Try it out.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-4xl space-y-4"
            >
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Card
                            onClick={() => {
                                if (!tool.disabled) router.push(tool.href);
                            }}
                            className={cn(
                                "p-6 border-black/5 flex items-center justify-between transition cursor-pointer rounded-xl shadow-md",
                                tool.disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
                            )}
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-3 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-10 h-10", tool.color)} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-semibold">{tool.label}</span>
                                    <span className="text-sm text-gray-500">{tool.description}</span>
                                    {tool.disabled && (
                                        <span className="text-xs text-gray-400 mt-1">Coming soon</span>
                                    )}
                                </div>
                            </div>
                            {!tool.disabled && <ArrowRight className="w-6 h-6 text-gray-600" />}
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default DashboardPage;
