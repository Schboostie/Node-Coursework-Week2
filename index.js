function submitMessage() {
  const fromInput = document.getElementById("from").value;
  const textInput = document.getElementById("text").value;

  if (!fromInput || !textInput) {
    alert("Please enter both 'Name' and 'Message' fields.");
    return;
  }

  const message = {
    from: fromInput,
    text: textInput,
  };

  fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .then((newMessage) => {
      // The server will respond with the newly created message
      // You can display it or handle it as needed.
      console.log("New Message:", newMessage);
      alert("Message sent successfully!");
      // If you want to show the new message on the page, you can do so here.
    })
    .catch((error) => {
      console.error("Error submitting message:", error);
      alert("Failed to send the message. Please try again later.");
    });
}
