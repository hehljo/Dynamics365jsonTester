"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, TestTubeDiagonal } from "lucide-react";

type HeaderProps = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
};

export default function Header({ onFileChange, fileInputRef }: HeaderProps) {
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <TestTubeDiagonal className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-foreground">
              Inspection Tester
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept=".json"
            />
            <Button onClick={handleUploadClick} variant="default">
              <FileUp className="mr-2 h-4 w-4" />
              Upload New Inspection
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
