"use client";
import useCar from "@/hooks/useCar";
import useDrivers from "@/hooks/useDrivers";
import InputText from "@/elements/inputText";
import { useState, useEffect } from "react";
import Btn from "@/elements/btn";
import { useRouter } from "next/navigation";

const Teste = () => {
   const router = useRouter();
   const { motoristas, erro, carregando, updateDriver } = useDrivers();
   const { carro, updateCar } = useCar();

   const carroId = "0c59d570-8c18-497a-bd2f-846bbc5c318e";
   const motoristaId = "0f5cdb74-c4d7-461a-b5b0-1e25abd5b919";

   const motoristaSelecionado = Array.isArray(motoristas)
      ? motoristas.find((m) => m?.id === motoristaId)
      : null;
   const carroSelecionado = Array.isArray(carro)
      ? carro.find((c) => c?.id === carroId)
      : null;

   const [carroeditado, setCarroEditado] = useState({
      plate: "",
      model: "",
      year: "",
      color: "",
   });

   const [motoristaeditado, setMotoristaEditado] = useState({
      name: "",
      phone: "",
      license: "",
   });

   useEffect(() => {
      if (carroSelecionado) {
         setCarroEditado({
            plate: carroSelecionado.plate ?? "",
            model: carroSelecionado.model ?? "",
            year: carroSelecionado.year ?? "",
            color: carroSelecionado.color ?? "",
         });
      }
   }, [carroSelecionado]);

   useEffect(() => {
      if (motoristaSelecionado) {
         setMotoristaEditado({
            name: motoristaSelecionado?.name ?? "",
            phone: motoristaSelecionado?.phone ?? "",
            license: motoristaSelecionado?.license ?? "",
         });
      }
   }, [motoristaSelecionado]);

   const handleAtualizarCarro = async () => {
      await updateCar(
         carroId,
         carroeditado.plate,
         carroeditado.model,
         carroeditado.year,
         carroeditado.color
      );
      router.push(`/cars/${carroId}`);
   };

   const handleAtualizarMotorista = async () => {
      await updateDriver(
         motoristaId,
         motoristaeditado.name,
         motoristaeditado.phone,
         motoristaeditado.license
      );
      router.push(`/drivers/${motoristaId}`);
   };

   return (
      <div className="flex flex-row gap-4 p-4">
         {erro && <p>{erro}</p>}
         {carregando && <p>Carregando...</p>}

         <div className="flex flex-col gap-4 p-4 w-1/2">
            <InputText
               name="plate"
               value={carroeditado.plate}
               onChange={(e) =>
                  setCarroEditado((prev) => ({
                     ...prev,
                     plate: e.target.value,
                  }))
               }
            />

            <InputText
               name="model"
               value={carroeditado.model}
               onChange={(e) =>
                  setCarroEditado((prev) => ({
                     ...prev,
                     model: e.target.value,
                  }))
               }
            />
            <InputText
               name="year"
               value={carroeditado.year}
               onChange={(e) =>
                  setCarroEditado((prev) => ({ ...prev, year: e.target.value }))
               }
            />
            <InputText
               name="color"
               value={carroeditado.color}
               onChange={(e) =>
                  setCarroEditado((prev) => ({
                     ...prev,
                     color: e.target.value,
                  }))
               }
            />
            <Btn onClick={handleAtualizarCarro} texto="atualizar carro" />
            <label htmlFor="motorista">MOTORISTA novo nome</label>
            <InputText
               value={motoristaeditado.name}
               onChange={(e) => setMotoristaEditado({ name: e.target.value })}
            />
            <InputText
               value={motoristaeditado.phone}
               onChange={(e) =>
                  setMotoristaEditado((prev) => ({
                     ...prev,
                     phone: e.target.value,
                  }))
               }
            />
            <InputText
               value={motoristaeditado.license}
               onChange={(e) =>
                  setMotoristaEditado((prev) => ({
                     ...prev,
                     license: e.target.value,
                  }))
               }
            />
            <Btn
               onClick={handleAtualizarMotorista}
               texto="atualizar motorista"
            />
         </div>

         <div>
            <h1>{carroSelecionado?.plate || "Sem carro"}</h1>
            <h1>{motoristaSelecionado?.name || "Sem motorista"}</h1>
         </div>
      </div>
   );
};

export default Teste;
