import { PaperPlaneRight, X } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import { api } from "../services/api";
import { helper } from "../helper";
import { Link, useParams } from "react-router-dom";

export function Messages() {
  let { contactId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [contact, setContact] = useState<Message | null>(null);
  const bottomEl = useRef<null | HTMLDivElement>(null);

  function scrollToBottom() {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function getMessages() {
    api.get(`/messages/${contactId}`)
      .then((result) => {
        const { messages, contact } = result.data.data;
        setMessages(messages)
        setContact(contact)

        scrollToBottom()
      })
  }

  useEffect(() => {
    getMessages()
  }, []);

  return (
    <div className="flex flex-col bg-[#1A1924]">

      <header className="bg-[#282843] flex items-center justify-between p-6 fixed right-0 left-0">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#1A1924] flex justify-center items-center">
            <p className="text-white text-xl font-bold">{contact?.name[0]}</p>
          </div>
          <div className="flex flex-col text-[#E1E1E6]">
            <p className="font-bold text-lg">{contact?.name}</p>
            <p className="text-sm">{contact?.from}</p>
          </div>
        </div>

        <Link to="/">
          <X className="text-[#E1E1E6]" size={24} weight="bold" />
        </Link>
      </header>

      <div className="h-full p-6 bg-[#1A1924] mb-16 mt-24">
        {
          messages.map((message: Message) => {

            if (message.fromMe) {
              return (
                <div key={message.id + ""} className="w-full flex justify-end text-[#E1E1E6]">
                  <div className="mb-4 flex flex-col">
                    <div className="flex items-center mb-2 justify-end">
                      <p className="text-xs ml-1">{message.from}</p>
                      <p className="text-xs ml-1">- {helper.formatTime(message.timestamp)}</p>
                    </div>
                    <div className="p-4 justify-center bg-[#07847E] rounded-tl-lg rounded-br-none rounded-tr-lg rounded-bl-lg">
                      <div className="flex justify-end">
                        <p className="text-base">{message.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={message.id + ""} className="w-full flex justify-start text-[#E1E1E6]">
                  <div className="mb-4 flex flex-col">
                    <div className="flex items-center mb-2 justify-start">
                      <p className="text-xs ml-1">{message.from}</p>
                      <p className="text-xs ml-1">- {helper.formatTime(message.timestamp)}</p>
                    </div>

                    <div className="p-4 justify-center bg-[#633BBC] rounded-tl-none rounded-br-lg rounded-tr-lg rounded-bl-lg">
                      <div className="flex justify-start">
                        <p className="text-base">{message.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })
        }
      </div>

      <div ref={bottomEl}></div>

      <footer className="bg-[#1A1924] py-3 px-6 fixed bottom-0 right-0 left-0">
        <div className="bg-[#282843] rounded-full py-3 px-6 flex items-center">
          <textarea className="resize-none overflow-hidden h-10 flex-1 p-2 bg-transparent outline-none shadow-none m-0 placeholder:text-[#e1e1e66b] text-[#E1E1E6]" placeholder="Digite sua mensagem" />
          <PaperPlaneRight size={32} weight="fill" className="text-[#E1E1E6]" />
        </div>
      </footer>

    </div>
  )
}

