# Dynamics Inspector - Testwerkzeug für Inspektionsvorlagen

Willkommen beim Dynamics Inspector! Dieses webbasierte Werkzeug wurde entwickelt, um das Erstellen und Testen von **Microsoft Dynamics 365 Inspektionsvorlagen** zu vereinfachen. Laden Sie Ihre JSON-Vorlagendateien hoch, um eine interaktive Vorschau des Formulars zu erhalten, die Funktionalität zu testen und die Syntax zu validieren, bevor Sie sie in Ihrer Dynamics 365-Umgebung bereitstellen.

![Dynamics Inspector Screenshot](https://placehold.co/800x450.png?text=App+Screenshot)

---

## ✨ Hauptfunktionen

- **JSON-Upload**: Laden Sie Ihre Inspektionsvorlagen einfach per Drag-and-Drop oder über einen Dateiauswahldialog hoch.
- **Dynamische Formular-Vorschau**: Das Tool rendert Ihre Vorlage sofort als interaktives Formular mithilfe von [SurveyJS](https://surveyjs.io/), genau wie in Dynamics 365.
- **Funktions- und Logik-Test**: Füllen Sie das Formular aus, testen Sie bedingte Logik, erforderliche Felder und verschiedene Fragetypen.
- **Ergebnis-Ansicht**: Nach dem Absenden des Testformulars werden die erfassten Daten übersichtlich im JSON-Format angezeigt.
- **Syntax-Validierung**: Eine grundlegende Prüfung beim Hochladen stellt sicher, dass Ihre JSON-Datei eine gültige Struktur für Inspektionsvorlagen hat und hilft, häufige Fehler zu vermeiden.

## 🤔 Warum dieses Werkzeug verwenden?

Die Erstellung von Inspektionsvorlagen für Dynamics 365 kann komplex sein. Ein kleiner Syntaxfehler kann dazu führen, dass die Vorlage fehlschlägt. Dieses Tool hilft Ihnen:

- **Zeit zu sparen**: Testen und debuggen Sie Ihre Vorlagen in Sekundenschnelle, ohne den langwierigen Prozess des Hochladens in Dynamics.
- **Fehler zu vermeiden**: Identifizieren Sie Probleme in der Struktur oder Logik Ihrer Vorlagen frühzeitig.
- **Bessere Vorlagen zu erstellen**: Visualisieren Sie Ihre Formulare direkt und optimieren Sie das Benutzererlebnis für die Inspektoren.

## 🚀 Erste Schritte

Um das Projekt lokal auszuführen, folgen Sie diesen Schritten.

### Voraussetzungen

Stellen Sie sicher, dass [Node.js](https://nodejs.org/) (Version 18 oder höher wird empfohlen) auf Ihrem System installiert ist. Dies schließt den Node Package Manager (`npm`) mit ein.

### Installation

1.  **Klonen Sie das Repository** (oder laden Sie die Dateien herunter):
    ```bash
    git clone https://github.com/IHR_BENUTZERNAME/IHR_REPO_NAME.git
    ```

2.  **Navigieren Sie in das Projektverzeichnis**:
    ```bash
    cd IHR_REPO_NAME
    ```

3.  **Installieren Sie die Abhängigkeiten**:
    ```bash
    npm install
    ```

4.  **Starten Sie den Entwicklungsserver**:
    ```bash
    npm run dev
    ```

5.  **Öffnen Sie die Anwendung im Browser**:
    Navigieren Sie zu [http://localhost:9002](http://localhost:9002), um das Tool zu verwenden.

## 🛠️ Benutzung

1.  Öffnen Sie die Webanwendung.
2.  Klicken Sie auf die Schaltfläche **"JSON-Vorlage hochladen"**.
3.  Wählen Sie eine `.json`-Datei von Ihrem Computer aus.
4.  Wenn die Datei gültig ist, wird das Inspektionsformular angezeigt. Andernfalls erhalten Sie eine Fehlermeldung mit Hinweisen zur Korrektur.
5.  Interagieren Sie mit dem Formular, um es zu testen.
6.  Klicken Sie am Ende auf **"Inspektion absenden"**.
7.  Die Ergebnisse werden Ihnen im JSON-Format angezeigt.

## 💻 Verwendete Technologien

- **Next.js**: React-Framework für serverseitiges Rendering und eine moderne Entwicklungserfahrung.
- **React** & **TypeScript**: Für eine robuste und typsichere Benutzeroberfläche.
- **SurveyJS**: Die Kernbibliothek zur Darstellung der dynamischen Formulare.
- **Tailwind CSS** & **ShadCN UI**: Für ein modernes und anpassbares Designsystem.
