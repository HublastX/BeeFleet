export default function useBot() {
   const API_URL = process.env.NEXT_PUBLIC_API_URL;
   const chat = async (messages) => {
      const lastUserMessage = messages
         .slice()
         .reverse()
         .find((msg) => msg.sender === "user");

      if (!lastUserMessage) {
         throw new Error("Nenhuma mensagem do usuário encontrada.");
      }

      const response = await fetch(`${API_URL}/api/message`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ message: lastUserMessage.text }),
      });

      if (!response.ok) {
         throw new Error("Falha ao buscar resposta do assistente");
      }

      const data = await response.json();
      return (
         data.resposta ||
         data.answer ||
         data.response ||
         data.message ||
         "Sem resposta do bot."
      );
   };
   return { chat };
}
