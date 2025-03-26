"use client";
import Modal from "../components/ModalLoginManager";
export default function Home() {
   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
         <div className="col-span-12 xl:col-span-5">
            <Modal />
         </div>
      </div>
   );
}
