"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Btn from "@/elements/btn";
import useCar from "@/hooks/useCar";
import InputText from "@/elements/inputText";
import FormSkeleton from "@/elements/ui/skeleton/FormSkeleton";
import { useToast } from "@/utils/ToastContext";

function CreateCars() {
   const { createCar, carregando, erro } = useCar();
   const router = useRouter();
   const [errors, setErrors] = useState({});
   const { showToast } = useToast();

   const [plate, setPlate] = useState("");
   const [model, setModel] = useState("");
   const [year, setYear] = useState("");
   const [color, setColor] = useState("");
   const [odometer, setOdometer] = useState("");
   const [renavam, setRenavam] = useState("");
   const [chassis, setChassis] = useState("");
   const [brand, setBrand] = useState("");
   const [image, setImage] = useState(null);

   const formList = [
      {
         label: "Placa",
         id: "plate",
         value: plate,
         setValue: setPlate,
         error: errors.plate,
         placeholder: "Ex: ABC-1234",
         type: "text",
         transform: (v) => v.toUpperCase(),
      },
      {
         label: "Marca",
         id: "brand",
         value: brand,
         setValue: setBrand,
         error: errors.brand,
         placeholder: "Ex: Toyota",
         type: "text",
      },
      {
         label: "Modelo",
         id: "model",
         value: model,
         setValue: setModel,
         error: errors.model,
         placeholder: "Ex: Corolla",
         type: "text",
      },
      {
         label: "Ano",
         id: "year",
         value: year,
         setValue: setYear,
         error: errors.year,
         placeholder: "Ex: 2023",
         type: "number",
      },
      {
         label: "Renavam",
         id: "renavam",
         value: renavam,
         setValue: setRenavam,
         error: errors.renavam,
         placeholder: "Ex: 82754432011",
         type: "number",
      },
      {
         label: "Chassi",
         id: "chassis",
         value: chassis,
         setValue: setChassis,
         error: errors.chassis,
         placeholder: "Ex: 9XbZ3DvWVvNSU1551",
         type: "text",
      },
      {
         label: "Cor",
         id: "color",
         value: color,
         setValue: setColor,
         error: errors.color,
         placeholder: "Ex: Preto",
         type: "text",
      },
      {
         label: "Hodômetro",
         id: "odometer",
         value: odometer,
         setValue: setOdometer,
         error: errors.odometer,
         placeholder: "Ex: 50000",
         type: "number",
      },
   ];

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};

      if (!plate) newErrors.plate = "Campo obrigatório";
      if (!brand) newErrors.brand = "Campo obrigatório";
      if (!model) newErrors.model = "Campo obrigatório";
      if (!year) newErrors.year = "Campo obrigatório";
      if (!chassis) newErrors.chassis = "Campo obrigatório";
      if (!odometer) newErrors.odometer = "Campo obrigatório";
      if (!renavam) newErrors.renavam = "Campo obrigatório";
      if (!color) newErrors.color = "Campo obrigatório";

      if (
         plate &&
         !/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/.test(plate)
      ) {
         newErrors.plate =
            "Placa inválida (formatos aceitos: ABC1234 ou ABC1D23)";
      }

      if (year && Number(year) < 1900) {
         newErrors.year = "Ano inválido, apenas maior que 1900";
      }

      if (renavam && !/^\d{11}$/.test(renavam)) {
         newErrors.renavam =
            "Renavam deve conter exatamente 11 dígitos (ex: 12345678901)";
      }

      if (chassis && !/^[A-HJ-NPR-Z0-9]{17}$/.test(chassis)) {
         newErrors.chassis =
            "Chassi deve conter exatamente 17 caracteres alfanuméricos (exceto I, O e Q)";
      }

      if (odometer && Number(odometer) < 0)
         newErrors.odometer = "Hodômetro não pode ser negativo";

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
         showToast("Erro!", "error", "Corrija os erros no formulário.", 5000);
         return;
      }

      await createCar(
         plate,
         model,
         year,
         color,
         odometer,
         image,
         renavam,
         chassis,
         brand
      );

   };

   return (
      <div>
         {carregando && <FormSkeleton />}
         {!carregando && (
            <div className="max-w-3xl mx-auto">
               <h2 className="text-3xl font-bold mb-6 text-dark dark:text-white">
                  Cadastro de Veículo
               </h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                  {formList.map(
                     ({
                        label,
                        id,
                        value,
                        setValue,
                        error,
                        placeholder,
                        type,
                        required,
                        transform,
                     }) => (
                        <div key={id}>
                           <label
                              htmlFor={id}
                              className="block text-sm font-medium text-dark dark:text-white mb-2"
                           >
                              {label}
                           </label>
                           <InputText
                              type={type}
                              id={id}
                              name={id}
                              value={value}
                              onChange={(e) =>
                                 setValue(
                                    transform
                                       ? transform(e.target.value)
                                       : e.target.value
                                 )
                              }
                              placeholder={placeholder}
                              required
                              className={`${error ? "border-red-500 dark:border-red-500 border-2" : ""}`}
                           />
                           {error && (
                              <p className="text-red-500 text-sm font-bold">
                                 {error}
                              </p>
                           )}
                        </div>
                     )
                  )}

                  <div>
                     <label className="block text-sm font-medium mb-2">
                        Imagem do Veículo
                     </label>
                     <InputText
                        type="file"
                        variant="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                     />
                  </div>

                  {/* Botões */}
                  <div className="flex gap-4">
                     <Btn
                        type="button"
                        onClick={() => router.back()}
                        texto="Cancelar"
                        variant="danger"
                        className="flex-1 py-3 px-4 text-lg border border-red-400 bg-red-400 hover:bg-red-500 text-white rounded-lg transition-colors"
                     />
                     <Btn
                        type="submit"
                        variant="primary"
                        disabled={carregando}
                        className="flex-2 py-3 px-4 text-lg"
                     >
                        {carregando ? "Cadastrando..." : "Cadastrar Veículo"}
                     </Btn>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default withAuth(CreateCars);
