import { useState } from "react";

export default function Chat() {
  interface Message {
    sender: string;
    text: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { sender: "AI", text: data.response }]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-3">Chat with AI</h2>
      <div className="border p-3 h-64 overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 bg-gray-800 text-white border rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
