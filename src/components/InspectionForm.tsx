"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import "survey-core/defaultV2.min.css";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartyPopper, RotateCcw } from "lucide-react";

type InspectionFormProps = {
  inspectionJson: object;
};

export default function InspectionForm({ inspectionJson }: InspectionFormProps) {
  const [surveyResult, setSurveyResult] = useState<any>(null);

  const survey = useMemo(() => {
    const surveyModel = new Model(inspectionJson);
    surveyModel.applyTheme({
      cssVariables: {
        "--sjs-primary-backcolor": "hsl(var(--primary))",
        "--sjs-primary-backcolor-dark": "hsl(var(--primary))",
        "--sjs-primary-forecolor": "hsl(var(--primary-foreground))",
        "--sjs-primary-forecolor-light": "hsl(var(--primary-foreground))",
        "--sjs-secondary-backcolor": "hsl(var(--secondary))",
        "--sjs-secondary-forecolor": "hsl(var(--secondary-foreground))",
        "--sjs-border-default": "hsl(var(--border))",
        "--sjs-editor-background": "hsl(var(--card))",
        "--sjs-font-size": "1rem",
        "--sjs-font-family": "Inter, sans-serif",
        "--sjs-question-background": "hsl(var(--card))",
        "--sjs-background-dim": "hsl(var(--card))",
        "--sjs-questionpanel-backcolor": "hsl(var(--card))",
        "--sjs-panel-background": "hsl(var(--card))",
      },
      isPanelless: false
    });
    surveyModel.locale = "de";
    return surveyModel;
  }, [inspectionJson]);

  const handleComplete = useCallback((sender: any) => {
    setSurveyResult(sender.data);
  }, []);

  survey.onComplete.add(handleComplete);

  const restartSurvey = () => {
    setSurveyResult(null);
    survey.clear(true, true);
  };

  if (surveyResult) {
    return (
      <Card className="shadow-lg animate-in fade-in-50">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PartyPopper className="text-accent" />
                Inspektion abgeschlossen!
              </CardTitle>
              <CardDescription>
                Hier sind die Ergebnisse im JSON-Format.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={restartSurvey}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Erneut durchführen
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-md p-4 relative">
             <pre className="text-sm overflow-x-auto">
              <code>{JSON.stringify(surveyResult, null, 2)}</code>
             </pre>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg animate-in fade-in-50 bg-card">
      <CardContent className="p-0 sm:p-2 md:p-4">
        <Survey model={survey} />
      </CardContent>
    </Card>
  );
}