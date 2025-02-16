document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sendButton").addEventListener("click", sendMessage);
    document.getElementById("userInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });
});
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatBox = document.getElementById("chatBox");

    if (userInput.trim() === "") return;

    // Display User Message
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    // Send Message to Backend
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        // Display Bot Response
        if (data.response) {
            chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
        } else {
            chatBox.innerHTML += `<div><strong>Bot:</strong> Sorry, I couldn't understand that.</div>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Bot:</strong> Error connecting to server.</div>`;
    }

    // Clear Input Field & Scroll to Bottom
    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}
