"use client";
import React, { useState } from "react";

export default function FAQ() {
const [openIndex, setOpenIndex] = useState(null);

   const faqs = [
      {
         question: "Como posso cadastrar um novo veículo?",
         answer:
            "Para cadastrar um novo veículo, acesse o menu 'Veículos' e clique em 'Adicionar Veículo'. Preencha os dados solicitados e salve.",
      },
      {
         question: "Como gerenciar motoristas vinculados à minha conta?",
         answer:
            "No painel do gestor, vá até a seção 'Motoristas' para visualizar, editar ou remover motoristas vinculados à sua gestão.",
      },
      {
         question: "O que são eventos e como acompanhá-los?",
         answer:
            "Eventos representam saídas e retornos de veículos. Você pode acompanhar todos os eventos em tempo real na aba 'Eventos'.",
      },
      {
         question: "Como alterar meus dados de perfil?",
         answer:
            "Clique em 'Perfil' no menu superior e depois em 'Editar perfil' para atualizar suas informações pessoais.",
      },
      {
         question: "Preciso de suporte. Como entro em contato?",
         answer:
            "Caso precise de ajuda, acesse a página 'Contato' ou envie um e-mail para suporte@beefleet.com.br.",
      },
   ];

   const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   return (
      <section className="max-w-3xl mx-auto mt-12 mb-16 px-4 sm:px-6 lg:px-8">
         <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold mb-3 text-bee-purple-700 dark:text-bee-purple-400">
               Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
               Encontre respostas para as dúvidas mais comuns sobre o BeeFleet.
            </p>
         </header>

         <div className="space-y-4">
            {faqs.map((faq, index) => (
               <div
                  key={index}
                  className="bg-white dark:bg-bee-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-bee-dark-400"
               >
                  <button
                     className="w-full flex justify-between items-center py-5 px-6 text-left focus:outline-none"
                     onClick={() => toggleFAQ(index)}
                     aria-expanded={openIndex === index}
                     aria-controls={`faq-${index}`}
                  >
                     <h2 className="text-lg font-semibold text-bee-purple-600 dark:text-bee-purple-300">
                        {faq.question}
                     </h2>
                     <svg
                        className={`w-5 h-5 text-bee-purple-500 dark:text-bee-purple-400 transition-transform duration-200 ${
                           openIndex === index ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 9l-7 7-7-7"
                        />
                     </svg>
                  </button>
                  <div
                     id={`faq-${index}`}
                     className={`px-6 pb-5 pt-0 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                        openIndex === index
                           ? "opacity-100 max-h-96"
                           : "opacity-0 max-h-0 overflow-hidden"
                     }`}
                  >
                     <p>{faq.answer}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}
