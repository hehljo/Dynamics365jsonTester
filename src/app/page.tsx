"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { defaultInspection } from "@/lib/default-inspection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InspectionForm from "@/components/InspectionForm";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [inspectionJson, setInspectionJson] = useState<object>(defaultInspection);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(Date.now()); // To force re-render of InspectionForm
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("File content is not a string.");
        }
        const json = JSON.parse(text);
        setInspectionJson(json);
        setFormKey(Date.now()); // Update key to remount the component with new JSON
        toast({
          title: "Success",
          description: "Inspection template loaded successfully.",
        });
      } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast({
          variant: "destructive",
          title: "Error loading file",
          description: `Failed to parse JSON file. Please ensure it's a valid Dynamics 365 inspection template. Error: ${errorMessage}`,
        });
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
    event.target.value = ''; // Reset file input
  };

  const handleResetToDefault = () => {
    setInspectionJson(defaultInspection);
    setFormKey(Date.now());
    toast({
      title: "Reset",
      description: "Loaded the default sample inspection.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onFileChange={handleFileChange} onReset={handleResetToDefault} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading inspection...</p>
            </div>
          ) : (
            <InspectionForm key={formKey} inspectionJson={inspectionJson} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
