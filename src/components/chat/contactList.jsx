import { useSelector, useDispatch } from "react-redux";
import { setActiveContact } from "../../store/chatSlice";

function ContactList() {
  const dispatch = useDispatch();
  const { contacts, activeContact } = useSelector((state) => state.chat);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Contacts</h2>
      </div>
      <div className="divide-y">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => dispatch(setActiveContact(contact))}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
              activeContact?.id === contact.id ? "bg-gray-50" : ""
            }`}
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium">{contact.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;
