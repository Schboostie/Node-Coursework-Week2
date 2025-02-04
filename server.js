const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let messages = [
  {
    id: 1,
    from: "Neill",
    text: "hi CYF! Go ahead! If you think you know how to do that, go ahead!",
  },
];

app.post("/messages", (req, res) => {
  const { id, from, text } = req.body;
  if (!from || !text) {
    return res
      .status(400)
      .json({ error: "Please provide id, from, and text in JSON format." });
  }

  const newMessage = { id, from, text };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === messageId);
  if (!message) {
    return res.status(404).json({ error: "Message not found." });
  }
  res.json(message);
});

app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === messageId);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found." });
  }
  messages.splice(index, 1);
  res.json({ message: "Message deleted successfully." });
});

// Start the server
app.listen(port, () => {
  console.log(`Chat server listening at http://localhost:${port}`);
});
