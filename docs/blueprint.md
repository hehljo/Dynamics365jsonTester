# **App Name**: Dynamics Inspector

## Core Features:

- JSON Import: Enable the user to upload a Microsoft Dynamics 365 inspection template JSON file directly through a file selection dialog.
- Dynamic Inspection Rendering: Dynamically render an interactive inspection form in the main display area based on the uploaded JSON, utilizing SurveyJS.
- Inspection Result Export: Show results in JSON format once the inspection form is submitted.
- Error Handling: Clear error messages display upon failing to load/parse a user provided json file.
- Default Inspection: Provides a sample inspection form will be displayed before a file is uploaded, and it persists until new file is uploaded.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) to provide a sense of focus and clarity, aligning with Dynamics 365 branding.
- Background color: Light Grey (#ECEFF1) to ensure the interface is unobtrusive and the inspection form stands out.
- Accent color: Cyan (#00BCD4) for interactive elements and important actions, providing a modern touch.
- Body and headline font: 'Inter' sans-serif font to provide a modern and readable text.
- The layout will feature a header with the app title, a file selection button, a main area for the dynamic inspection form, and a footer for tool information.
- Loading animations provide user feedback, improving UX. Also subtle animations can be used to provide interactivity feedback on various elements.