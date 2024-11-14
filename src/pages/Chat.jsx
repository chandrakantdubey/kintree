import ContactList from "../components/chat/contactList";
import ChatWindow from "../components/chat/chatWindow";

function Chat() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Chat</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 sticky">
          <ContactList />
        </div>
        <div className="md:col-span-2">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default Chat;
