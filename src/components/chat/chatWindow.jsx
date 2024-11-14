import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../../store/chatSlice";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { activeContact, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch(
      sendMessage({
        id: Date.now(),
        content: message,
        sender: user.email,
        recipient: activeContact.id,
        timestamp: new Date().toISOString(),
      }),
    );
    setMessage("");
  };

  if (!activeContact) {
    return (
      <div className="h-[600px] bg-white rounded-lg shadow flex items-center justify-center">
        <p className="text-gray-500">Select a contact to start chatting</p>
      </div>
    );
  }

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.sender === user.email && msg.recipient === activeContact.id) ||
      (msg.sender === activeContact.id && msg.recipient === user.email),
  );

  return (
    <div className="h-[750px] bg-white rounded-lg shadow flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <img
          src={activeContact.avatar}
          alt={activeContact.name}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="font-semibold">{activeContact.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === user.email ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === user.email
                  ? "bg-purple text-white"
                  : "bg-gray-100"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs opacity-75">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
