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
   SignalSlashIcon,
   TableCellsIcon,
   IdentificationIcon,
   MagnifyingGlassIcon,
   CameraIcon,
   PencilIcon,
   ClipboardDocumentListIcon,
   QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import {
   ChevronUpIcon,
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
   ListBulletIcon,
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
   pracima: ChevronUpIcon,
   graficoPizza: ChartPieIcon,
   gestor: ExclamationCircleIcon,
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
   eventoL: ClipboardDocumentListIcon,
   check: CheckIcon,
   error: ExclamationTriangleIcon,
   warning: SignalSlashIcon,
   table: TableCellsIcon,
   identidade: IdentificationIcon,
   carPlus: CarPlus,
   car: Car,
   camera: CameraIcon,
   lapis: PencilIcon,
   menuMobile: ListBulletIcon,
   suport: QuestionMarkCircleIcon
};

export default function Icon({ name, className, strokeWidth }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
