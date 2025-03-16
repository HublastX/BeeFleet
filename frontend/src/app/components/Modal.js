import Icon from "../elements/Icon";
export default function Modal() {
   return (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-bee-dark-700 z-50">
         <div className="bg-bee-dark-100 text-bee-dark-600 p-4 min-w-80">
            <div className="flex row justify-between">
               <h1 className="text-2xl font-bold">Solicitar Carro</h1>
               <button>
                  <Icon name="xMark" className="h-8 w-8" />
               </button>
            </div>
         </div>
      </div>
   );
}
