# TabGrab 🚀

**TabGrab** is a browser extension designed to help you save, restore, and share your open tabs. Perfect for those who love keeping their tabs organized and hate losing their browsing sessions. (Only tested in Firefox)

---

## Features 🌟

-   **Save All Tabs**: Quickly save all open tabs, grouped by window, into a neatly structured JSON file.
-   **Restore Tabs**: Reopen previously saved tabs, preserving their original order and grouping.
-   **Generate QR Code**: Create a QR code for your tab data, making it easy to transfer sessions across devices.
-   **Simple UI**: Lightweight and intuitive design for seamless tab management.

---

## Installation 🛠️

1. Clone this repository:

    ```bash
    git clone https://github.com/robmcelhinney/TabGrab.git
    cd TabSaver
    ```

1. Load the extension in your browser:

    - Firefox:
        - Open about:debugging#/runtime/this-firefox.
        - Click "Load Temporary Add-on".
        - Select the manifest.json file from this project.
    - Chrome: - Open chrome://extensions/. - Enable Developer Mode. - Click "Load unpacked" and select this project folder.

1. Enjoy saving your tabs! ✨

## Usage 📖

1. Save Tabs:

    - Click the TabSaver icon in your browser toolbar.
    - Hit the "Save Tabs" button to download a JSON file of all your open tabs.

1. Restore Tabs:

    - Click "Restore Tabs" and upload a previously saved JSON file.
    - Tabs will be reopened, grouped by their original windows.

1. Generate QR Code:
    - Click "Generate QR Code" to create a QR code for your tab data.
    - Scan it to access your saved tabs on another device.

## JSON Format 📂

The saved JSON file uses the following structure:

```json
{
    "windows": [
        {
            "tabs": [
                "https://example.com",
                "https://x.com/intent/user?screen_name=rmcelhinney"
            ]
        },
        {
            "tabs": ["https://youtu.be/dQw4w9WgXcQ"]
        }
    ]
}
```

## Development 🧑‍💻

### Prerequisites

-   Node.js: Optional if you want to manage dependencies (e.g., QR code libraries).
-   A modern browser supporting WebExtensions (Firefox, Chrome, etc.).

### Debugging

-   Open your browser's Developer Tools (usually Ctrl + Shift + J).
-   Use console.log to debug the extension's behaviour.

## License 📜

This project is licensed under the MIT License.

## Acknowledgments 🙌

Uses QRCode.js for QR code generation: [davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)
