// background.js

console.log("Background service worker is running.")

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "restoreTabs") {
        console.log("Restore tabs action received in background script.")
        const jsonData = message.data
        console.log("Received JSON data for restoration:", jsonData)

        try {
            await openTabsFromData(jsonData)
            console.log("Tabs restored successfully!")
        } catch (err) {
            console.error("Error restoring tabs:", err)
            // Optionally, send an error response back to the sender
            sendResponse({ success: false, error: err.message })
        }
    }

    // Return true to indicate you wish to send a response asynchronously
    return true
})

// Function to open tabs based on parsed JSON
async function openTabsFromData(data) {
    for (const windowData of data.windows) {
        const newWindow = await browser.windows.create()
        console.log("Created new window:", newWindow)

        for (const url of windowData.tabs) {
            await browser.tabs.create({ windowId: newWindow.id, url })
            // console.log("Opened tab with URL:", url)
        }
    }
}
