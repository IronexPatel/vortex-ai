"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../vision/constants";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { VenetianMaskIcon } from "lucide-react";
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
import Image from "next/image";

const VisionPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]); // Store messages
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [image, setImage] = useState<File | null>(null); // Store the uploaded image
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Add the user's message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: values.prompt },
    ]);

    try {
      const formData = new FormData();
      formData.append("prompt", values.prompt);
      if (image) {
        formData.append("image", image); // Add the image to the form data
      }

      // Send the user's prompt and image to the API
      const res = await fetch("/api/llama-vision", {
        method: "POST",
        body: formData, // Send as form data to handle the image
      });

      const data = await res.json();
      console.log(data); // Log the response to check its structure

      // Add the AI's response to the conversation
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}  // Initial state of the page (slightly below and transparent)
      animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and top position
      exit={{ opacity: 0, y: -20 }}   // Exit animation (optional)
      transition={{ duration: 0.6 }}  // Adjust the duration of the animation
    >
      <Heading
        title="Vision ai"
        description="Generate description about the topic you want. Vision AI is a type of artificial intelligence (AI) that uses computer vision to analyze images and videos."
        icon={VenetianMaskIcon}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
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
                          backgroundColor: isLoading ? "#E0F7FA" : "", // Light blue for active input
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
        </div>

        {/* Image Upload Section */}
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-100 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
          />
          {imagePreview && (
            <div className="mt-4">
              <Image src={imagePreview} alt="Image preview" className="max-w-full h-auto" />
            </div>
          )}
        </div>

        {messages.length === 0 && !isLoading && <Empty label="No conversation started." />}

        {/* Messages Section */}
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
                    message.role === "user" ? "bg-emerald-500/10 border w-90 border-black/10" : "bg-gray-100 border-black/10 rounded-lg"
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
                  <Image src="/logo1.png" alt="Whiz Logo" className="w-full h-full" />
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

export default VisionPage;
