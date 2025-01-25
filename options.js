// options.js

document.addEventListener("DOMContentLoaded", () => {
    const restoreButton = document.getElementById("restore-button")
    const fileInput = document.getElementById("restore-file-input")

    // When the restore button is clicked, trigger the hidden file input
    restoreButton.addEventListener("click", () => {
        console.log("Restore button clicked.")
        fileInput.click()
    })

    // Handle the file selection
    fileInput.addEventListener("change", async (event) => {
        console.log("File input change event triggered.")

        const file = event.target.files[0]
        if (!file) {
            console.warn("No file selected or file dialog canceled.")
            alert("No file selected. Please select a valid JSON file.")
            return
        }

        console.log(`Selected file: ${file.name}, size: ${file.size} bytes`)

        try {
            const content = await file.text()
            console.log("File content loaded successfully:", content)

            const jsonData = JSON.parse(content)
            console.log("Parsed JSON:", jsonData)

            // Validate JSON structure
            if (!jsonData.windows || !Array.isArray(jsonData.windows)) {
                throw new Error("Invalid JSON structure.")
            }

            // Send the JSON data to the background script for tab restoration
            await browser.runtime.sendMessage({
                action: "restoreTabs",
                data: jsonData,
            })
        } catch (err) {
            console.error("Error processing file:", err)
            alert(`Error restoring tabs: ${err.message}`)
        }
    })
})
