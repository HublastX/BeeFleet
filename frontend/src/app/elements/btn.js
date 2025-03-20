// No arquivo './elements/btn.js' ou './elements/btn.jsx'
const Btn = ({ texto, onClick, className }) => {
   return (
      <button
         onClick={onClick}
         className={`rounded-xl bg-bee-purple-600 text-white px-6 py-3 font-semibold shadow-md hover:bg-bee-purple-700 transition-all duration-300 active:scale-95  ${className}`}
      >
         {texto}
      </button>
   );
};

export default Btn;
