import { PlusIcon, HomeIcon } from "@heroicons/react/24/solid";
import { SearchIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";

const icons = {
   plus: PlusIcon,
   xMark: XMarkIcon,
   home: HomeIcon,
   search: SearchIcon,
   user: UserIcon,
};

export default function Icon({ name, className }) {
   const IconComponent = icons[name];

   if (!IconComponent) {
      return null;
   }

   return <IconComponent className={className} />;
}
