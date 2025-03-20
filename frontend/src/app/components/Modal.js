"use client";
import Icon from "../elements/Icon";
import Btn from "../elements/btn";

const Modal = ({ onClose }) => {
   return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 acrilico">
         <div className="bg-bee-dark-100 text-bee-dark-600 p-4 min-w-80 rounded-md shadow-2xl">
            <div className="flex justify-between items-center border-b-bee-dark-600 border-b-2 pb-2">
               <h1 className="text-2xl font-bold">Solicitar Carro</h1>
               <button onClick={onClose}>
                  <Icon
                     name="xMark"
                     className="h-8 w-8 hover:text-red-700 transition-all duration-300 active:scale-95"
                  />
               </button>
            </div>
            <form action="/motorista" method="post" className="flex flex-col gap-4 mt-4">
               <label htmlFor="nome">Nome Completo:</label>
               <input className="inputText" type="text" name="nome" id="nome" placeholder="ex.: Carlos da Silva Santos"/>
               <label htmlFor="telefone">Telefone:</label>
               <input className="inputText" type="tel" name="telefone" id="telefone" placeholder="ex.: (11) 99999-9999" />
               <label htmlFor="cpf">CPF:</label>
               <input className="inputText" type="text" name="cpf" id="cpf" placeholder="ex.: 999.999.999-99" />
               <label htmlFor="Data">Data de saida:</label>
               <input className="inputText" type="date" name="Data" id="data" />
               <Btn className="mt-5" texto="Solicitar Carro" />
            </form>
         </div>
      </div>
   );
};

export default Modal;
