import { useState } from "react";
import { X, MessageCircle, Bot, Circle } from "lucide-react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi, I’m Eval AI 👋. I can help you learn more about our tools and coding education.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error: Couldn’t reach AI." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-500 text-white shadow-lg flex items-center justify-center text-xl transition-transform hover:scale-110 hover:shadow-purple-400/50"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[440px] bg-white rounded-xl shadow-lg flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-purple-500 text-white flex justify-between items-center font-semibold rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span>Eval AI</span>
              <Circle className="w-3 h-3 text-green-400 animate-pulse fill-green-400" />
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "items-start gap-2"}`}>
                {/* Bot avatar + name */}
                {m.role === "bot" && (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col max-w-[75%]">
                  {/* Show Eval AI name above bot messages */}
                  {m.role === "bot" && (
                    <span className="text-xs text-gray-500 mb-1 ml-1">Eval AI</span>
                  )}
                  <div
                    className={`px-3 py-2 rounded-xl leading-relaxed ${
                      m.role === "user"
                        ? "bg-purple-500 text-white self-end"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-xl w-20 flex justify-center">
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
