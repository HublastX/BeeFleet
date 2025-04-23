import React from "react";
import {
   XMarkIcon,
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
} from "@heroicons/react/24/solid";
import {
   PlusIcon,
   ChatBubbleBottomCenterTextIcon,
   Bars3BottomLeftIcon,
   ChevronDownIcon,
   ArrowLeftStartOnRectangleIcon,
   MagnifyingGlassIcon,
   FunnelIcon,
   EyeIcon,
   TrashIcon,
   ArrowLongRightIcon,
   ArrowLongLeftIcon,
   ArrowTrendingUpIcon,
   ArrowTrendingDownIcon,
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
};

export default function Icon({ name, className, strokeWidth }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
