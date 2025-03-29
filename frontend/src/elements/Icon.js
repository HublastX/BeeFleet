import React from "react";
import {
   HomeIcon,
   XMarkIcon,
   DocumentMagnifyingGlassIcon,
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
} from "@heroicons/react/24/solid";
import {
   PlusIcon,
   ChatBubbleBottomCenterTextIcon,
   Bars3BottomLeftIcon,
   ChevronDownIcon,
   ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const icons = {
   plus: PlusIcon,
   xMark: XMarkIcon,
   home: HomeIcon,
   search: DocumentMagnifyingGlassIcon,
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
   sino: BellIcon
};

export default function Icon({ name, className, strokeWidth }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
