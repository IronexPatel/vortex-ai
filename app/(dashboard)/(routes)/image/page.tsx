"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Empty } from "@/components/empty";
import { cn } from "@/lib/utils";
import { UserAvatarComponent } from "@/components/user-avatar";
import { Botavatar } from "@/components/bot-avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Form validation schema
const formSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters"),
});

// Define available models and their logos.
const models = [
  { value: "black-forest-labs/FLUX.1-schnell", label: "FLUX.1-schnell" },
  // You can add more models here if needed.
];

const modelLogos: Record<string, string> = {
  "black-forest-labs/FLUX.1-schnell": "/flux-logo.png",
  "default-model": "/flux-logo.png",
};

const ImagePage = () => {
  const [generatedImages, setGeneratedImages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0].value);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Add the user's prompt to the message list
    setGeneratedImages((prev) => [...prev, { role: "user", content: values.prompt }]);

    try {
      // Example endpoint based on the selected model
      const res = await fetch("/api/flux1-schnell-black-forest-labs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          prompt: values.prompt,
        }),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status code ${res.status}`);
      }

      const data = await res.json();

      if (data && data.imageUrl) {
        // Append the generated image URL as the AI's response
        setGeneratedImages((prev) => [...prev, { role: "ai", content: data.imageUrl }]);
      } else {
        throw new Error("Invalid image response format");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setGeneratedImages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "⚠️ Error generating image. Too many requests. Please wait then try. Don't generate too many images at the same time.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Retrieve the friendly label for the selected model.
  const selectedModelLabel =
    models.find((model) => model.value === selectedModel)?.label || selectedModel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-400"
        bgColor="bg-pink-400/10"
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
                        placeholder="A futuristic city at night..."
                        {...field}
                        style={{ backgroundColor: isLoading ? "#F3F4F6" : "" }}
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

          {/* Animated Dropdown for Model Selection */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center bg-gray-200 hover:bg-gray-800 text-gray-800 hover:text-gray-100"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <Image
                  src={modelLogos[selectedModel] || modelLogos["default-model"]}
                  alt="Model Logo"
                  width={24}
                  height={24}
                  className="object-contain rounded"
                />
                <span className="ml-2">{selectedModelLabel}</span>
              </Button>
            </DropdownMenuTrigger>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DropdownMenuContent className="w-56 p-2 bg-gray-800 text-white rounded-lg shadow-xl">
                    <DropdownMenuLabel className="mb-2">Select AI Model</DropdownMenuLabel>
                    {models.map((model) => (
                      <DropdownMenuItem
                        key={model.value}
                        onClick={() => {
                          setSelectedModel(model.value);
                          setDropdownOpen(false);
                        }}
                        className="hover:bg-gray-100/10 transition-colors rounded p-2"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src="/flux-dark-logo.png"
                            alt="Model Logo"
                            width={24}
                            height={24}
                            className="object-contain rounded"
                          />
                          <div>
                            <span>{model.label}</span>
                            <p className="text-xs text-gray-300">
                              Offers fast, high-quality image generation.
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenu>
        </div>

        {generatedImages.length === 0 && !isLoading && <Empty label="No image generated yet." />}

        <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
          {generatedImages.map((message, index) => (
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
                    ? "bg-pink-50 border border-black/10"
                    : "bg-gray-100 border border-black/10"
                )}
              >
                {message.role === "user" ? <UserAvatarComponent /> : <Botavatar />}
                {message.role === "user" ? (
                  <p className="text-sm">{message.content}</p>
                ) : (
                  // If the AI response looks like a valid image URL, render the image and download button
                  message.content.startsWith("http") || message.content.startsWith("data:")
                    ? (
                      <div className="flex flex-col gap-2 w-full">
                        <Image
                          src={message.content}
                          alt="Generated Image"
                          className="w-full h-auto rounded-lg shadow-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = modelLogos["default-model"];
                          }}
                        />
                        <a
                          href={message.content}
                          download="generated-image"
                          className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-center"
                        >
                          Download Image
                        </a>
                      </div>
                    ) : (
                      // Otherwise, display the error message as text.
                      <p className="text-sm text-red-500">{message.content}</p>
                    )
                )}
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
                <Image
                  src="/logo1.png"
                  alt="Loading Logo"
                  className="w-full h-full"
                  onError={(e) => (e.currentTarget.src = modelLogos["default-model"])}
                />
              </div>
              <p className="text-pink-500">Whiz is generating your image...</p>
            </motion.div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex justify-center text-gray-400">
        Our AI models can sometimes make mistakes. Please verify important details.
      </p>
    </motion.div>
  );
};

export default ImagePage;
