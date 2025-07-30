"use client";

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, RotateCcw } from "lucide-react";

type HeaderProps = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

export default function Header({ onFileChange, onReset }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="15" y1="3" x2="15" y2="21"></line>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
            </svg>
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Dynamics Inspector
            </h1>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Sample
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept=".json"
            />
            <Button onClick={handleUploadClick} variant="default">
              <FileUp className="mr-2 h-4 w-4" />
              Upload Inspection JSON
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
