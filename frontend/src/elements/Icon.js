import React from "react";
import CarPlus from "@/styles/CustomCarIconPlus";
import Car from "@/styles/CustomCarIcon";
import {
   EllipsisHorizontalIcon,
   UserIcon,
   ChartPieIcon,
   ExclamationCircleIcon,
   UsersIcon,
   TruckIcon,
   UserPlusIcon,
   EnvelopeIcon,
   KeyIcon,
   UserCircleIcon,
   BellIcon,
   RectangleGroupIcon,
   ClipboardDocumentCheckIcon,
   CameraIcon,
   SignalSlashIcon,
   TableCellsIcon,
   IdentificationIcon,
   MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
   PlusIcon,
   ChatBubbleBottomCenterTextIcon,
   Bars3BottomLeftIcon,
   ChevronDownIcon,
   XMarkIcon,
   ArrowLeftStartOnRectangleIcon,
   FunnelIcon,
   EyeIcon,
   TrashIcon,
   ArrowLongRightIcon,
   ArrowLongLeftIcon,
   ArrowTrendingUpIcon,
   ArrowTrendingDownIcon,
   CheckIcon,
   ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const icons = {
   plus: PlusIcon,
   xMark: XMarkIcon,
   home: RectangleGroupIcon,
   search: MagnifyingGlassIcon,
   user: UserIcon,
   chat: ChatBubbleBottomCenterTextIcon,
   closeLeft: Bars3BottomLeftIcon,
   reticencias: EllipsisHorizontalIcon,
   prabaixo: ChevronDownIcon,
   graficoPizza: ChartPieIcon,
   suport: ExclamationCircleIcon,
   users: UsersIcon,
   truck: TruckIcon,
   addUser: UserPlusIcon,
   email: EnvelopeIcon,
   key: KeyIcon,
   UserCircle: UserCircleIcon,
   sair: ArrowLeftStartOnRectangleIcon,
   sino: BellIcon,
   filtro: FunnelIcon,
   trash: TrashIcon,
   eye: EyeIcon,
   sDireita: ArrowLongRightIcon,
   sEsquerda: ArrowLongLeftIcon,
   sCima: ArrowTrendingUpIcon,
   sBaixo: ArrowTrendingDownIcon,
   evento: ClipboardDocumentCheckIcon,
   camera: CameraIcon,
   check: CheckIcon,
   error: ExclamationTriangleIcon,
   warning: SignalSlashIcon,
   table: TableCellsIcon,
   identidade: IdentificationIcon,
   carPlus: CarPlus,
   car: Car
};

export default function Icon({ name, className, strokeWidth }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
