import Icon from "./Icon";
export default function Toast({ message, description, type = "success", onClose }) {
   const colors = {
      success: "border-green-500 bg-bee-alert-200",
      error: "border-red-500 bg-bee-alert-400 ",
      warning: "border-orange-400 bg-bee-alert-700",
   };

   return (
      <div className="fixed top-5 right-5 z-50">
         <div
            className={`px-4 py-3 border-2 rounded-lg shadow-lg transition-all duration-300 ${colors[type]}`}
         >
            <div className="flex items-center justify-between gap-3">
               <div className="flex flex-col">
                  <span className="font-black text-2xl">{message}</span>
                  {description && <span className="font-semibold ">{description}</span>}
               </div>
               <button onClick={onClose ?? (() => {})} className="font-bold ml-2 text-lg leading-none">
                  <Icon name="xMark" className="size-6 hover:text-gray-400"/>
               </button>
            </div>
         </div>
      </div>
   );
}
