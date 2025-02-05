"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { Empty } from "@/components/empty";
import { cn } from "@/lib/utils";
import { UserAvatarComponent } from "@/components/user-avatar";
import { Botavatar } from "@/components/bot-avatar";
import Image from "next/image"; // Next.js Image Component
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Model logos for the dropdown (ensure the file paths match your assets)
const modelLogos: Record<string, string> = {
  "Llama-70B": "/meta-logo.png", // Meta logo for Llama 70B
  "DeepSeek-R1-Distilled": "/deepseek-logo.png", // DeepSeek logo for DeepSeek R1 Distilled
  "Llama-Vision": "/meta-logo.png", // Meta logo for Llama Vision
  "default-model": "/meta-logo.png", // Default model logo
  
};

const ConversationPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("Llama-70B");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Add the user's prompt to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: values.prompt },
    ]);

    try {
      let endpoint = "";

      // Choose API endpoint based on the selected model
      switch (selectedModel) {
        case "Llama-70B":
          endpoint = "/api/llama-70b";
          break;
        case "DeepSeek-R1-Distilled":
          endpoint = "/api/deepseek-70b";
          break;
        case "Llama-Vision":
          endpoint = "/api/llama-vision";
          break;
        default:
          endpoint = "/api/llama-70b";
          break;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      const data = await res.json();

      // Append the AI's response to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: data.message || "No response from AI" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: "Error fetching response." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <Heading
        title="Conversation"
        description="Our most advanced conversational models."
        icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border-transparent w-full p-4 px-3 md:px-6 focus-within:shadow-lg grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-transparent rounded-lg shadow-sm focus:ring-2 outline-transparent"
                        disabled={isLoading}
                        placeholder="Ask me anything..."
                        {...field}
                        style={{
                          backgroundColor: isLoading ? "#E0F7FA" : "",
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 bg-gray-800 text-white rounded-lg shadow-md transition-transform transform active:scale-95"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </form>
          </Form>

          {/* Dropdown for selecting the AI model */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center bg-gray-200 hover:bg-gray-800 text-gray-800 hover:text-gray-100">
                <Image
                  src={modelLogos[selectedModel] || `/default-model`}
                  alt="Model Logo"
                  width={24}
                  height={24}
                  className="object-contain rounded"
                />
                <span className="ml-2">{selectedModel}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 bg-gray-800 text-white rounded-lg shadow-xl transition-all duration-200">
              <DropdownMenuLabel className="mb-2">Select AI Model</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setSelectedModel("DeepSeek-R1-Distilled")}
                className="hover:bg-gray-100/10 transition-colors rounded p-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/deepseek-logo.png"
                    alt="DeepSeek Logo"
                    width={24}
                    height={24}
                    className="object-contain rounded"
                  />
                  <div>
                    <span>DeepSeek-R1-Distilled</span>
                    <p className="text-xs text-gray-300">
                      An efficient, lightweight AI model optimized for fast and accurate language processing.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedModel("Llama-70B")}
                className="hover:bg-gray-100/10 transition-colors rounded p-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/meta-logo.png"
                    alt="Meta Logo"
                    width={24}
                    height={24}
                    className="object-contain rounded"
                  />
                  <div>
                    <span>Llama-70B</span>
                    <p className="text-xs text-gray-300">
                      A powerful, optimized large language model offering high-speed, cost-free AI-driven text generation.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedModel("Llama-Vision")}
                className="hover:bg-gray-100/10 transition-colors rounded p-2"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/meta-logo.png"
                    alt="Meta Logo"
                    width={24}
                    height={24}
                    className="object-contain rounded"
                  />
                  <div>
                    <span>Llama-Vision</span>
                    <p className="text-xs text-gray-300">
                      An AI-powered model for advanced description generation, image analysis, and object detection.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {messages.length === 0 && !isLoading && <Empty label="No conversation started." />}

        <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "bg-violet-50 border border-black/10"
                      : "bg-gray-100 border border-black/10 rounded-lg"
                  )}
                >
                  {message.role === "user" ? <UserAvatarComponent /> : <Botavatar />}
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                className="flex justify-center items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 animate-spin">
                  <Image src="/logo1.png" alt="Whiz Logo" width={48} height={48} />
                </div>
                <p className="text-violet-500">Whiz is thinking...</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex justify-center text-gray-400">
        Our models can make mistakes. Check important info.
      </p>
    </motion.div>
  );
};

export default ConversationPage;
