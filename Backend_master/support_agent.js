const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const readline = require("readline");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

app.use(cors());

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(`User: ${data.message}`);
        console.log("Type your response and press Enter to reply...");

        // Notify frontend that the support agent is typing
        io.emit("agent_typing");
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Read agent response from console and send it once
rl.on("line", (input) => {
    const agentMessage = input.trim();
    if (agentMessage) {
        io.emit("receive_message", { sender: "Support Agent", message: agentMessage });
    }
});

// Start the server
server.listen(3000, () => {
    console.log("Socket server running on http://localhost:3000");
});
