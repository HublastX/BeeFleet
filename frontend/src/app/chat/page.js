"use client";
import Icon from "@/elements/Icon";
import InputText from "@/elements/inputText";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import useBot from "@/hooks/useBot";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
   const { chat } = useBot();
   const [messages, setMessages] = useState([]);
   const [inputValue, setInputValue] = useState("");
   const [loading, setLoading] = useState(false); // Novo estado
   const messagesEndRef = useRef(null);

   useEffect(() => {
      setMessages([
         {
            text: "Olá! Sou o assistente do BeeFleet. Como posso te ajudar hoje?",
            sender: "bot",
         },
      ]);
   }, []);

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const handleSendMessage = async () => {
      if (inputValue.trim() === "" || loading) return;

      const userMessage = inputValue;
      setInputValue("");

      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
      setLoading(true); // Inicia carregamento

      // Adiciona mensagem de carregando do bot
      setMessages((prev) => [
         ...prev,
         { text: "...", sender: "bot", loading: true },
      ]);

      try {
         const updatedMessages = [
            ...messages,
            { text: userMessage, sender: "user" },
         ];
         const response = await chat(updatedMessages);

         // Remove mensagem de carregando
         setMessages((prev) => [
            ...prev.filter((msg) => !msg.loading),
            { text: response, sender: "bot" },
         ]);
      } catch (error) {
         setMessages((prev) => [
            ...prev.filter((msg) => !msg.loading),
            {
               text: "Erro ao obter resposta do assistente.",
               sender: "bot",
            },
         ]);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
         <div className="flex z-50 flex-col h-4/5 w-full md:w-3/4 lg:w-1/2 bg-bee-dark-100 dark:bg-bee-dark-800 rounded-xl shadow-lg p-4 space-y-4 border border-bee-dark-300 dark:border-bee-dark-400 overflow-x-hidden">
            {/* Cabeçalho */}
            <header className="mb-5 flex flex-row justify-between">
               <div>
                  <h1 className="text-xl font-bold">BeeFleet Assistente</h1>
                  <p className="text-sm opacity-80">Chat de suporte</p>
               </div>
               <Link href="/" className="h-fit hover:text-gray-500">
                  <Icon name="xMark" className="size-6" strokeWidth={2} />
               </Link>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overflow-x-hidden">
               {messages.map((message, index) => (
                  <div
                     key={index}
                     className={`flex ${
                        message.sender === "user"
                           ? "justify-end"
                           : "justify-start"
                     }`}
                  >
                     <div
                        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                           message.sender === "user"
                              ? "bg-bee-purple-500 text-white rounded-br-none"
                              : "bg-gray-200 dark:bg-bee-dark-400 text-gray-800 dark:text-gray-200 rounded-bl-none"
                        }`}
                     >
                        {message.sender === "bot" ? (
                           <div className="prose dark:prose-invert">
                              {message.loading ? (
                                 <div class="flex space-x-1 text-2xl text-bold">
                                    <span class="opacity-0 animate-[fadeIn_1s_ease-in-out_infinite]">
                                       .
                                    </span>
                                    <span class="opacity-0 animate-[fadeIn_1s_ease-in-out_0.33s_infinite]">
                                       .
                                    </span>
                                    <span class="opacity-0 animate-[fadeIn_1s_ease-in-out_0.66s_infinite]">
                                       .
                                    </span>
                                 </div>
                              ) : (
                                 <ReactMarkdown>{message.text}</ReactMarkdown>
                              )}
                           </div>
                        ) : (
                           <p className="text-wrap">{message.text}</p>
                        )}
                        <div
                           className={`text-xs mt-1 opacity-70 ${
                              message.sender === "user"
                                 ? "text-bee-purple-200"
                                 : "text-gray-500 dark:text-gray-400"
                           }`}
                        >
                           {message.sender === "user" ? "Você" : "Assistente"} •{" "}
                           {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                           })}
                        </div>
                     </div>
                  </div>
               ))}
               <div ref={messagesEndRef} />
            </div>
            {/* Área de input */}
            <div>
               <div className="flex space-x-2">
                  <div className="w-full">
                     <InputText
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full"
                        onKeyDown={(e) => {
                           if (e.key === "Enter") {
                              e.preventDefault();
                              handleSendMessage();
                           }
                        }}
                     />
                  </div>
                  <button
                     onClick={handleSendMessage}
                     disabled={!inputValue.trim()}
                     className="bg-bee-purple-600 hover:bg-bee-purple-700 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                     <Icon name="enviar" className="size-6" strokeWidth={2} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
