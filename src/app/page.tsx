"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InspectionForm from "@/components/InspectionForm";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

// Basic schema validation
const validateSchema = (json: any) => {
  const errors: string[] = [];
  if (!json.title || typeof json.title !== 'string') {
    errors.push("Missing or invalid 'title' (must be a string).");
  }
  if (!Array.isArray(json.pages)) {
    errors.push("Missing or invalid 'pages' (must be an array).");
    return errors;
  }
  if (json.pages.length === 0) {
    errors.push("'pages' array cannot be empty.");
  }
  json.pages.forEach((page: any, pIndex: number) => {
    if (!Array.isArray(page.elements)) {
      errors.push(`Page ${pIndex + 1} is missing 'elements' array.`);
      return;
    }
    page.elements.forEach((el: any, eIndex: number) => {
      if (!el.type || typeof el.type !== 'string') {
        errors.push(`Element ${eIndex + 1} in Page ${pIndex + 1} is missing a 'type'.`);
      }
      if (!el.name || typeof el.name !== 'string') {
        errors.push(`Element ${eIndex + 1} in Page ${pIndex + 1} is missing a 'name'.`);
      }
    });
  });

  return errors;
};


export default function Home() {
  const [inspectionJson, setInspectionJson] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(Date.now());
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setInspectionJson(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("File content is not a string.");
        }
        const json = JSON.parse(text);

        // Validate schema
        const validationErrors = validateSchema(json);
        if (validationErrors.length > 0) {
            toast({
              variant: "destructive",
              title: "Invalid Template Structure",
              description: (
                <ul className="list-disc list-inside">
                  {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )
            });
            throw new Error("Schema validation failed.");
        }

        setInspectionJson(json);
        setFormKey(Date.now());
        toast({
          title: "Success",
          description: "Inspection template loaded successfully.",
        });
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        if (errorMessage !== "Schema validation failed.") {
          toast({
            variant: "destructive",
            title: "Error loading file",
            description: `Failed to parse JSON file. Error: ${errorMessage}`,
          });
        }
        setInspectionJson(null);
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Error reading file",
        description: "Could not read the selected file.",
      });
      setIsLoading(false);
    }
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onFileChange={handleFileChange} fileInputRef={fileInputRef} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading and validating inspection...</p>
            </div>
          ) : inspectionJson ? (
            <InspectionForm key={formKey} inspectionJson={inspectionJson} />
          ) : (
             <div className="text-center h-96 flex flex-col justify-center items-center border-2 border-dashed rounded-lg">
                <UploadCloud className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-xl font-semibold">Start by uploading an inspection file</h2>
                <p className="mt-2 text-muted-foreground">Upload your Dynamics 365 inspection JSON to preview and test it.</p>
                <Button onClick={handleUploadClick} className="mt-6">
                    Upload JSON File
                </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
