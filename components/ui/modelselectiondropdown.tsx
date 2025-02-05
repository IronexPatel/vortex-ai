"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu"; // Ensure the path is correct
import Image from "next/image";

// Example aiModels array, replace it with your actual data
const aiModels = [
  {
    id: "model1",
    name: "Model 1",
    description: "Description of Model 1",
    logo: "/path/to/model1-logo.png",
  },
  {
    id: "model2",
    name: "Model 2",
    description: "Description of Model 2",
    logo: "/path/to/model2-logo.png",
  },
  // Add more models as needed
];

const ModelSelectionDropdown = ({ onModelSelect }: { onModelSelect: (modelId: string) => void }) => {
  const [selectedModel, setSelectedModel] = React.useState(aiModels[0].id);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    onModelSelect(modelId); // Propagate the model selection
  };

  // Find the selected model
  const selectedModelData = aiModels.find((model) => model.id === selectedModel);

  // Fallback for when model is not found
  const logo = selectedModelData?.logo || "/default-logo.png";  // Default logo if not found
  const modelName = selectedModelData?.name || "Default Model";  // Default model name if not found

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 px-4 border rounded-lg bg-gray-200 flex items-center space-x-2">
          <Image
            src={logo}
            alt={modelName}  // Fallback name for alt text
            className="w-6 h-6"
          />
          <span className="ml-2">{modelName}</span>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent className="w-full bg-white border rounded-lg shadow-md">
          <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {aiModels.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => handleModelSelect(model.id)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <Image src={model.logo} alt={model.name} className="w-8 h-8" />
              <div className="ml-4">
                <p className="font-semibold">{model.name}</p>
                <p className="text-sm text-gray-500">{model.description}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ModelSelectionDropdown;
