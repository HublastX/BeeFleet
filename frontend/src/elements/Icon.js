import React from "react";
import {
   PlusIcon,
   HomeIcon,
   XMarkIcon,
   DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
   UserIcon,
   ChatBubbleBottomCenterTextIcon,
   Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

const icons = {
   plus: PlusIcon,
   xMark: XMarkIcon,
   home: HomeIcon,
   search: DocumentMagnifyingGlassIcon,
   user: UserIcon,
   chat: ChatBubbleBottomCenterTextIcon,
   closeLeft: Bars3BottomLeftIcon,
};

export default function Icon({ name, className, strokeWidth }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
