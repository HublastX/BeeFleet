const InputText = ({ placeholder, className, name, type }) => {
   return (
      <input
         type={type}
         placeholder={placeholder}
         className={`bg-white border rounded-lg outline-0 border-gray-300 text-bee-dark-600 text-sm focus:shadow-md shadow-bee-alert-200 focus:border-bee-alert-100 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder:text-gray-400 dark:text-white ${className}`}
         name={name}
      />
   );
};

export default InputText;
