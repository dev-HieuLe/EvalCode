import { useState } from "react";
import { X, MessageCircle, Bot, Circle } from "lucide-react";

const DISPLAY_FONT = `"Helvetica Now Display", "Inter", "Helvetica", Arial, sans-serif`;

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi, I’m Eval AI. I can help you learn more about our tools and coding education.",
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
        { role: "bot", text: "Error — couldn’t reach AI." },
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
          className="fixed bottom-6 right-6 flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            background: "#000000",
            color: "#ffffff",
            borderRadius: 9999,
            border: "2px solid #ffffff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-20 right-6 flex flex-col overflow-hidden"
          style={{
            width: 360,
            height: 480,
            background: "#000000",
            color: "#ffffff",
            borderRadius: 20,
            border: "1px solid #1e2c31",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-center"
            style={{
              padding: 16,
              borderBottom: "1px solid #1e2c31",
            }}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: "0.72px",
                  lineHeight: 1.25,
                }}
              >
                Eval AI
              </span>
              <Circle
                className="w-2 h-2"
                style={{ color: "#c1fbd4", fill: "#c1fbd4" }}
              />
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "#9dabad" }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto space-y-4"
            style={{ padding: 16 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "items-start gap-2"
                }`}
              >
                {m.role === "bot" && (
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 28,
                      height: 28,
                      background: "#0a0a0a",
                      border: "1px solid #1e2c31",
                      borderRadius: 9999,
                      color: "#ffffff",
                    }}
                  >
                    <Bot className="w-3 h-3" />
                  </div>
                )}

                <div className="flex flex-col max-w-[80%]">
                  {m.role === "bot" && (
                    <span
                      style={{
                        color: "#9dabad",
                        fontSize: 12,
                        fontWeight: 400,
                        letterSpacing: "0.72px",
                        marginBottom: 4,
                        marginLeft: 4,
                      }}
                    >
                      EVAL AI
                    </span>
                  )}
                  <div
                    style={{
                      background:
                        m.role === "user" ? "#ffffff" : "#0a0a0a",
                      color: m.role === "user" ? "#000000" : "#ffffff",
                      border:
                        m.role === "user" ? "none" : "1px solid #1e2c31",
                      borderRadius: 20,
                      padding: "10px 14px",
                      fontSize: 14,
                      fontWeight: m.role === "user" ? 550 : 420,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    background: "#0a0a0a",
                    border: "1px solid #1e2c31",
                    borderRadius: 9999,
                    color: "#ffffff",
                  }}
                >
                  <Bot className="w-3 h-3" />
                </div>
                <div
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid #1e2c31",
                    borderRadius: 20,
                    padding: "10px 14px",
                    width: 60,
                  }}
                >
                  <div className="flex space-x-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#9dabad" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#9dabad", animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "#9dabad", animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex gap-2"
            style={{
              padding: 12,
              borderTop: "1px solid #1e2c31",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                background: "#0a0a0a",
                color: "#ffffff",
                border: "1px solid #1e2c31",
                borderRadius: 9999,
                padding: "10px 16px",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#ffffff",
                color: "#000000",
                borderRadius: 9999,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 550,
                border: "none",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
