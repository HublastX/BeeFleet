"use client";
import React, { useState } from "react";

export default function FAQ() {
const [openIndex, setOpenIndex] = useState(null);

   const faqs = [
      {
         question: "Quais são os requisitos para alugar um veículo?",
         answer:
            "Nome completo, CNH e Número de Telefone",
      },
      {
         question: "Posso alugar o carro com uma CNH provisória?",
         answer:
            "Sim, motoristas recém habilitados podem alugar carros com a CNH provisória",
      },
      {
         question: "Quais tipos de veículos estão disponiveis para alocação?",
         answer:
            "Estão disponíveis desde carros a minivans no nosso catalogo",
      },
      {
         question: "Posso trocar de veículo durante a locação?",
         answer:
            "Não, o motorista só pode alugar um carro por vez, caso queira trocar de veículo será necessário uma nova locação",
      },
      {
         question: "Há restrições de uso para os veículos alugados?",
         answer:
            "Não, entretanto, qualquer avaria ou dano que houver no veículo após o fim da locação, o motorista será responsabilizado",
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
                  className="bg-bee-dark-100 dark:bg-bee-dark-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-bee-dark-400"
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
