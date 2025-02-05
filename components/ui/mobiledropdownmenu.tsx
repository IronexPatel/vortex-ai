"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const modelLogos: { [key: string]: string } = {
  "Llama-3-8B": "/images/llama3.png",
  "Llama-3-70B": "/images/llama3.png",
  "DeepSeek-67B": "/images/deepseek.png",
};

export default function ModelDropdown() {
  const [selectedModel, setSelectedModel] = useState("Llama-3-8B");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center bg-gray-200 px-2 py-1 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 lg:px-2.5 lg:py-1 text-xs sm:text-xs md:text-sm lg:text-sm rounded-md">
          <Image
            src={modelLogos[selectedModel]}
            alt="Model Logo"
            width={16}
            height={16}
            className="object-contain rounded sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
          />
          <span className="ml-1 sm:ml-1 md:ml-2 lg:ml-2">{selectedModel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-36 sm:w-32 md:w-36 lg:w-40 p-1 sm:p-1 md:p-1.5 lg:p-2 bg-gray-800 text-white rounded-md shadow-xl">
        <DropdownMenuLabel className="mb-1 text-xs sm:text-xs md:text-sm lg:text-sm">
          Select AI Model
        </DropdownMenuLabel>
        {Object.keys(modelLogos).map((model) => (
          <DropdownMenuItem
            key={model}
            onClick={() => setSelectedModel(model)}
            className="hover:bg-violet-500 transition-colors rounded px-2 py-1 sm:px-1.5 sm:py-0.5 md:px-2 md:py-1 lg:px-2.5 lg:py-1 text-xs sm:text-xs md:text-sm lg:text-sm"
          >
            <div className="flex items-center gap-2">
              <Image
                src={modelLogos[model]}
                alt="Model Logo"
                width={14}
                height={14}
                className="object-contain rounded sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5"
              />
              <span>{model}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
