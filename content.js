function addCheckboxToMessage(message) {
	// Check if the message has a sub element with id="author-photo"
	if (message.querySelector("#author-photo")) {
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		message.prepend(checkbox);
	}
}

// Select the chat container
const chatContainer = document.querySelector(
	"#items.style-scope.yt-live-chat-item-list-renderer"
);

// Add checkboxes to existing chat messages
const existingMessages = chatContainer.children;
for (let i = 0; i < existingMessages.length; i++) {
	addCheckboxToMessage(existingMessages[i]);
}

// Set up the MutationObserver to add checkboxes to new chat messages
const observer = new MutationObserver((mutationsList) => {
	for (let mutation of mutationsList) {
		if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
			for (let node of mutation.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					addCheckboxToMessage(node);
				}
			}
		}
	}
});

observer.observe(chatContainer, { childList: true });
