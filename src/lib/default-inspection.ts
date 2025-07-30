export const defaultInspection = {
  title: "Sample Vehicle Inspection",
  description: "This is a default inspection form. Upload your own Dynamics 365 inspection JSON to see it rendered here.",
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "inspectorName",
          title: "Inspector Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "inspectionDate",
          title: "Date of Inspection",
          inputType: "date",
          isRequired: true,
        },
        {
            type: "text",
            name: "vehicleId",
            title: "Vehicle ID / VIN",
            isRequired: true
        }
      ],
    },
    {
        name: "page2",
        title: "Exterior Check",
        elements: [
            {
                type: "radiogroup",
                name: "tiresCondition",
                title: "Tires Condition",
                choices: ["Good", "Fair", "Poor", "Needs Replacement"],
                isRequired: true
            },
            {
                type: "checkbox",
                name: "lightsCheck",
                title: "Lights Check (select all that apply)",
                choices: ["Headlights", "Tail Lights", "Brake Lights", "Turn Signals"],
                hasOther: true,
                otherText: "Other (specify)"
            },
            {
                type: "comment",
                name: "exteriorNotes",
                title: "Additional Exterior Notes"
            }
        ]
    },
    {
        name: "page3",
        title: "Interior Check",
        elements: [
            {
                type: "boolean",
                name: "isClean",
                title: "Is the interior clean?",
                labelTrue: "Yes",
                labelFalse: "No",
                isRequired: true
            },
            {
                type: "rating",
                name: "dashboardCondition",
                title: "Dashboard Condition",
                rateCount: 5,
                rateMax: 5,
                minRateDescription: "Very Poor",
                maxRateDescription: "Excellent"
            }
        ]
    },
    {
        name: "page4",
        title: "Finalization",
        elements: [
            {
                type: "signaturepad",
                name: "inspectorSignature",
                title: "Inspector Signature",
                isRequired: true
            }
        ]
    }
  ],
  showQuestionNumbers: "off",
  completeText: "Submit Inspection"
};
