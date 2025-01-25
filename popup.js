// popup.js

// DOM references
const saveTabsBtn = document.getElementById("save-tabs-btn")
const generateQrBtn = document.getElementById("generate-qr-btn")
const restoreTabsBtn = document.getElementById("restore-tabs-btn")
const qrContainer = document.getElementById("qr-code-container")

let lastJsonData = null // Store the JSON data for QR code generation

// 1. Collect Tabs and Generate JSON Download
saveTabsBtn.addEventListener("click", async () => {
    try {
        console.log("Save tabs button clicked.")

        // Collect all open tabs
        const tabData = await getAllTabs()
        console.log("Tab data collected:", tabData)

        if (tabData.length === 0) {
            console.error("No tabs found. Tab data is empty.")
            alert("No tabs found. Please ensure there are open tabs.")
            return
        }

        // Create the JSON Blob
        lastJsonData = JSON.stringify({ windows: tabData }, null, 2) // Persist the JSON data
        const blob = new Blob([lastJsonData], { type: "application/json" })
        const blobUrl = URL.createObjectURL(blob)

        console.log("Blob URL created:", blobUrl)

        // Use <a> fallback for downloading
        const a = document.createElement("a")
        a.href = blobUrl
        a.download = `tabs-${Date.now()}.json` // File name for download
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

        console.log("Manual download triggered via <a> element.")

        // Revoke the Blob URL to release memory
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
        console.log("Blob URL revoked.")
    } catch (error) {
        console.error("Error during save process:", error)
        alert("An error occurred. Please check the console for details.")
    }
})

// 2. Generate QR Code from JSON Data
generateQrBtn.addEventListener("click", () => {
    qrContainer.innerHTML = "" // Clear previous QR code

    if (!lastJsonData) {
        alert("No JSON data available. Please save tabs first.")
        return
    }

    try {
        const jsonString = JSON.stringify(lastJsonData)
        const byteSize = new Blob([jsonString]).size

        // Estimate QR code capacity (approximate)
        // QR Code version 40 can hold up to ~2953 bytes in byte mode
        if (byteSize > 2500) {
            // Slightly less to ensure compatibility
            alert(
                "JSON data is too large to encode in a QR code. Please download the JSON file and transfer it manually."
            )
            return
        }

        // Generate QR code with JSON data directly
        new QRCode(qrContainer, {
            text: jsonString,
            width: 256,
            height: 256,
            correctLevel: QRCode.CorrectLevel.H, // High error correction
        })
    } catch (err) {
        console.error("Error generating QR code:", err)
        alert("Failed to generate QR code.")
    }
})

// 3. Restore Tabs from JSON
restoreTabsBtn.addEventListener("click", () => {
    console.log("Opening options page...")
    browser.runtime
        .openOptionsPage()
        .then(() => {
            console.log("Options page opened successfully.")
        })
        .catch((err) => {
            console.error("Error opening options page:", err)
        })
})

// ----- Helper Functions -----

// Retrieve all open tabs grouped by window
async function getAllTabs() {
    try {
        console.log("Fetching all windows...")
        const windows = await browser.windows.getAll({ populate: true })

        console.log("Windows data:", windows)

        // Map each window's tabs into a structured array
        const tabData = windows.map((win) => ({
            tabs: win.tabs.map((tab) => tab.url), // Collect only URLs from each tab
        }))

        console.log("Tab data structured:", tabData)
        return tabData
    } catch (error) {
        console.error("Error fetching tabs:", error)
        return []
    }
}
// Open tabs based on JSON data
async function openTabsFromData(jsonData) {
    for (const win of jsonData.windows) {
        // Create a new window without any tabs
        const newWin = await browser.windows.create({
            focused: false,
            url: "about:blank",
        })

        // Close the initial blank tab
        const initialTab = newWin.tabs[0]
        await browser.tabs.remove(initialTab.id)

        // Open each URL in the specified window
        for (const [index, url] of win.tabs.entries()) {
            await browser.tabs.create({ windowId: newWin.id, url })
        }
    }
}
