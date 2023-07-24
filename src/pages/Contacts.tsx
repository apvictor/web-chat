import { useEffect, useState } from "react"
import { api } from "../services/api";
import { helper } from "../helper";
import { Link } from "react-router-dom";

export function Contacts() {
  const [contacts, setContacts] = useState<Message[] | null>(null);

  function getMessages() {
    api.get("/contacts")
      .then((result) => {
        const { contacts } = result.data.data;
        console.log(contacts);

        setContacts(contacts)
      })
  }

  useEffect(() => {
    getMessages()
  }, []);

  return (
    <div className="h-screen bg-[#1A1924] p-6">

      <h3 className="text-white text-2xl font-bold mb-4">Conversas</h3>

      {contacts &&
        contacts.map((contact: Message) => (
          <Link
            to={`/${contact.from}`}
            key={contact.id + ""}
            className="flex gap-4 bg-[#282843] p-3 rounded-lg mb-4">
            <div className="w-14 h-14 rounded-full bg-[#1A1924] flex justify-center items-center">
              <p className="text-white text-xl font-bold">{contact.name[0]}</p>
            </div>
            <div className="flex flex-1 flex-col justify-between w-full">
              <div className="flex justify-between items-center w-full text-white">
                <p className="text-lg font-bold">{contact.name}</p>
                <p className="text-xs">{helper.formatDate(contact.timestamp)}</p>
              </div>
              <p className="text-white text-sm">{
                contact.message.length > 38
                  ? contact.message.slice(0, 30) + " ..."
                  : contact.message
              }</p>
            </div>
          </Link>

        ))
      }

    </div >
  )
}

