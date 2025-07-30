"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import InspectionForm with SSR turned off
const InspectionForm = dynamic(() => import("@/components/InspectionForm"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-96">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Formular wird geladen...</p>
    </div>
  ),
});

// Basic schema validation
const validateSchema = (json: any) => {
  const errors: string[] = [];
  if (!json.title || typeof json.title !== 'string') {
    errors.push("Fehlender oder ungültiger 'title' (muss ein String sein).");
  }
  if (!Array.isArray(json.pages)) {
    errors.push("Fehlende oder ungültige 'pages' (muss ein Array sein).");
    return errors;
  }
  if (json.pages.length === 0) {
    errors.push("'pages'-Array darf nicht leer sein.");
  }
  json.pages.forEach((page: any, pIndex: number) => {
    if (!Array.isArray(page.elements)) {
      errors.push(`Seite ${pIndex + 1} fehlt das 'elements'-Array.`);
      return;
    }
    page.elements.forEach((el: any, eIndex: number) => {
      if (!el.type || typeof el.type !== 'string') {
        errors.push(`Element ${eIndex + 1} auf Seite ${pIndex + 1} fehlt ein 'type'.`);
      }
      if (!el.name || typeof el.name !== 'string') {
        errors.push(`Element ${eIndex + 1} auf Seite ${pIndex + 1} fehlt ein 'name'.`);
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
          throw new Error("Der Dateiinhalt ist kein String.");
        }
        const json = JSON.parse(text);

        // Validate schema
        const validationErrors = validateSchema(json);
        if (validationErrors.length > 0) {
            toast({
              variant: "destructive",
              title: "Ungültige Vorlagenstruktur",
              description: (
                <ul className="list-disc list-inside">
                  {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )
            });
            throw new Error("Schema-Validierung fehlgeschlagen.");
        }

        setInspectionJson(json);
        setFormKey(Date.now());
        toast({
          title: "Erfolg",
          description: "Inspektionsvorlage erfolgreich geladen.",
        });
      } catch (error) {
        let errorMessage = "Ein unbekannter Fehler ist aufgetreten.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        if (errorMessage !== "Schema-Validierung fehlgeschlagen.") {
          toast({
            variant: "destructive",
            title: "Fehler beim Laden der Datei",
            description: `JSON-Datei konnte nicht verarbeitet werden. Fehler: ${errorMessage}`,
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
        title: "Fehler beim Lesen der Datei",
        description: "Die ausgewählte Datei konnte nicht gelesen werden.",
      });
      setIsLoading(false);
      setInspectionJson(null);
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
              <p className="mt-4 text-muted-foreground">Inspektion wird geladen und validiert...</p>
            </div>
          ) : inspectionJson ? (
            <InspectionForm key={formKey} inspectionJson={inspectionJson} />
          ) : (
             <div className="text-center h-96 flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-6">
                <UploadCloud className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-xl font-semibold">Beginnen Sie mit dem Hochladen einer Inspektionsdatei</h2>
                <p className="mt-2 text-muted-foreground">Laden Sie Ihre Dynamics 365 Inspektions-JSON hoch, um eine Vorschau anzuzeigen und sie zu testen.</p>
                <Button onClick={handleUploadClick} className="mt-6">
                    JSON-Datei hochladen
                </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
