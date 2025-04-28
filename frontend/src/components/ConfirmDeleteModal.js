import { useState } from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {

    console.log('Item apagado!');
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
        Apagar
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <div className="text-5xl text-red-500 mb-4">✖️</div>
            <h2 className="text-xl font-bold mb-2">Tem certeza?</h2>
            <p className="text-gray-600 mb-6">Você realmente deseja excluir estes registros? Este processo não pode ser desfeito..</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
