// Array to store the checkbox and message elements
let checkboxes = [];
let messages = [];

// Maximum number of elements allowed in the arrays
const MAX_ELEMENTS = 90;

// Function to add a checkbox to a chat message
function addCheckboxToMessage(message) {
  // Check if the message has a sub element with id="author-photo"
  if (message.querySelector("#author-photo")) {
    // Create a new checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Insert the checkbox at the beginning of the chat message
    message.insertBefore(checkbox, message.firstChild);

    // Get the index of the message
    let index = Array.prototype.indexOf.call(chatContainer.children, message);

    // Add checkbox and message to their arrays
    checkboxes.splice(index, 0, checkbox);
    messages.splice(index, 0, message);

    checkbox.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    checkbox.addEventListener("change", function (event) {
      event.stopPropagation();

      // Get the index of the clicked checkbox
      let clickedIndex = checkboxes.indexOf(checkbox);

      // Grey out or un-grey the clicked checkbox
      grayOutChatMessage(checkbox.parentNode, checkbox.checked);

      // Select all previous checkboxes if checkbox is checked
      if (checkbox.checked) {
        for (let i = clickedIndex - 1; i >= 0; i--) {
          checkboxes[i].checked = true;
          grayOutChatMessage(checkboxes[i].parentNode, true);
        }
      }
      // Uncheck all following checkboxes if checkbox is unchecked
      else {
        for (let i = clickedIndex + 1; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
          grayOutChatMessage(checkboxes[i].parentNode, false);
        }
      }
    });

    // Check if arrays have reached maximum capacity
    if (checkboxes.length > MAX_ELEMENTS) {
      // Remove the oldest checkbox and its corresponding message
      const oldestCheckbox = checkboxes.shift();
      const oldestMessage = messages.shift();

      // Remove the oldest checkbox from the DOM
      oldestCheckbox.remove();
      oldestMessage.remove();
    }
  }
}

// Function to gray out or un-gray a chat message
function grayOutChatMessage(message, gray) {
  const chatTextElement = message.querySelector("#message");
  if (chatTextElement) {
    chatTextElement.style.color = gray ? "grey" : "";
    chatTextElement.style.textDecoration = gray ? "line-through" : "";
  }
}

// Select the chat container
const chatContainer = document.querySelector(
  "#items.style-scope.yt-live-chat-item-list-renderer"
);

// Add checkboxes to all existing chat messages
for (let message of chatContainer.children) {
  addCheckboxToMessage(message);
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

// Function to add a heart-shaped like button to a chat message
function addHeartButtonToMessage(message) {
  // Check if the message has a sub element with id="author-photo"
  if (message.querySelector("#author-photo")) {
    // Create a new like button
    const likeButton = document.createElement("button");
    likeButton.innerHTML = "&#10084;"; // Unicode for heart symbol
    likeButton.style.color = "gray"; // Set color to black
    likeButton.style.backgroundColor = "transparent"; // Remove background color
    likeButton.style.border = "none"; // Remove border
    likeButton.style.cursor = "pointer"; // Change cursor to pointer
    likeButton.style.fontSize = "1.2rem"; // Adjust font size
    likeButton.style.outline = "none"; // Remove outline on focus
    likeButton.style.display = "flex"; // Use flexbox
    likeButton.style.justifyContent = "center"; // Center content horizontally
    likeButton.style.alignItems = "center"; // Center content vertically

    // Insert the like button after the chat message
    message.appendChild(likeButton);

    likeButton.addEventListener("click", function (event) {
      event.stopPropagation();
      // Toggle color on click
      if (likeButton.style.color === "gray") {
        likeButton.style.color = "red";
      } else {
        likeButton.style.color = "gray";
      }
    });
  }
}

// Add heart-shaped like buttons to all existing chat messages
for (let message of chatContainer.children) {
  addHeartButtonToMessage(message);
}

// Set up the MutationObserver to add heart-shaped like buttons to new chat messages
const likeObserver = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          addHeartButtonToMessage(node);
        }
      }
    }
  }
});

likeObserver.observe(chatContainer, { childList: true });