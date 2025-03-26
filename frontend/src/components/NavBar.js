"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavBar } from "../context/navBarContext";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/elements/Icon";
import { usePathname } from "next/navigation";

const navItem = [
   {
      icon: "home",
      name: "Inicio",
      path: "/",
   },
   {
      name: "Graficos",
      icon: "graficoPizza",
      subItems: [
         { name: "novos usuarios", path: "/blank" },
         { name: "novos carros", path: "/error-404" },
         { name: "pedidos de carro", path: "/error-501" },
      ],
   },
];

const othersItems = [
   {
      icon: "user",
      name: "Perfil",
      subItems: [
         { name: "vizualizar perfil", path: "/line-chart" },
         { name: "editar perfil", path: "/bar-chart" },
         { name: "sair", path: "/logout" },
      ],
   },
   {
      icon: "suport",
      name: "suporte",
      path: "/suport"
   }
];

const NavBar = () => {
   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useNavBar();
   const pathname = usePathname();

   const menuItem = (navItems, menuType) => (
      <ul className="flex flex-col gap-4">
         {navItems.map((nav, index) => (
            <li key={nav.name}>
               {nav.subItems ? (
                  <button
                     onClick={() => handleSubmenuToogle(index, menuType)}
                     className={`
                          group menu-item ${
                             openSubmenu?.type === menuType &&
                             openSubmenu?.index === index
                                ? " text-bee-yellow-600 bg-bee-yellow-100"
                                : " text-bee-dark-600 dark:text-white hover:bg-bee-alert-600"
                          } cursor-pointer ${
                             !isExpanded && !isHovered
                                ? "lg:justify-center"
                                : "lg:justify-start"
                          }`}
                  >
                     <Icon name={nav.icon} className="w-6 h-6" />
                     {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="inline">{nav.name}</span>
                     )}
                     {(isExpanded || isHovered || isMobileOpen) && (
                        <Icon
                           name="prabaixo"
                           className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                              openSubmenu?.type === menuType &&
                              openSubmenu?.index === index
                                 ? "rotate-180 text-brand-500"
                                 : ""
                           }`}
                           strokeWidth={3}
                        />
                     )}
                  </button>
               ) : (
                  nav.path && (
                     <Link
                        href={nav.path}
                        className={`menu-item group ${
                           isActive(nav.path)
                              ? " text-bee-yellow-600 bg-bee-yellow-100"
                              : " text-bee-dark-600 dark:text-white hover:bg-bee-alert-600"
                        }`}
                     >
                        <Icon name={nav.icon} className="w-6 h-6"  />
                        {(isExpanded || isHovered || isMobileOpen) && (
                           <span className="inline">{nav.name}</span>
                        )}
                     </Link>
                  )
               )}
               {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                     ref={(el) => {
                        subMenuRefs.current[`${menuType}-${index}`] = el;
                     }}
                     className="overflow-hidden transition-all duration-300"
                     style={{
                        height:
                           openSubmenu?.type === menuType &&
                           openSubmenu?.index === index
                              ? `${subMenuHeight[`${menuType}-${index}`]}px`
                              : "0px",
                     }}
                  >
                     <ul className="mt-2 space-y-1 ml-9">
                        {nav.subItems.map((subItem) => (
                           <li key={subItem.name}>
                              <Link
                                 href={subItem.path}
                                 className={`menu-dropdown-item ${
                                    isActive(subItem.path)
                                       ? " bg-bee-yellow-100 text-bee-yellow-600"
                                       : " text-bee-dark-600 dark:text-white"
                                 }`}
                              >
                                 {subItem.name}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               )}
            </li>
         ))}
      </ul>
   );

   const [openSubmenu, setOpenSubmenu] = useState(null);
   const [subMenuHeight, setSubMenuHeight] = useState({});
   const subMenuRefs = useRef({});
   const isActive = useCallback((path) => path === pathname, [pathname]);

   useEffect(() => {
      let submenuMatched = false;
      ["main", "others"].forEach((menuType) => {
         const items = menuType === "main" ? navItem : othersItems;
         items.forEach((nav, index) => {
            if (nav.subItems) {
               nav.subItems.forEach((subItem) => {
                  if (isActive(subItem.path)) {
                     setOpenSubmenu({
                        type: menuType,
                        index,
                     });
                     submenuMatched = true;
                  }
               });
            }
         });
      });

      if (!submenuMatched) {
         setOpenSubmenu(null);
      }
   }, [pathname, isActive]);

   useEffect(() => {
      if (openSubmenu !== null) {
         const key = `${openSubmenu.type}-${openSubmenu.index}`;
         if (subMenuRefs.current[key]) {
            setSubMenuHeight((prevHeights) => ({
               ...prevHeights,
               [key]: subMenuRefs.current[key]?.scrollHeight || 0,
            }));
         }
      }
   }, [openSubmenu]);

   const handleSubmenuToogle = (index, menuType) => {
      setOpenSubmenu((prevOpenSubmenu) => {
         if (
            prevOpenSubmenu &&
            prevOpenSubmenu.type === menuType &&
            prevOpenSubmenu.index === index
         ) {
            return null;
         }
         return { type: menuType, index };
      });
   };

   return (
      <aside
         className={`fixed mt-18 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-bee-dark-100 dark:bg-bee-dark-800 dark:border-bee-dark-400 text-bee-dark-600 h-screen transition-all duration-300 ease-in-out z-50 border-r border-bee-dark-300 ${
            isExpanded || isMobileOpen
               ? "w-[290px]"
               : isHovered
                 ? "w-[290px]"
                 : "w-[90px]"
         } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
         onMouseEnter={() => !isExpanded && setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div
            className={`py-8 flex ${
               !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
         >
            <Link href="/" className="flex items-center gap-0">
               {isExpanded || isHovered || isMobileOpen ? (
                  <>
                     <Image
                        src="/image/logo.svg"
                        alt="Logo"
                        className="w-16"
                        width={60}
                        height={60}
                     />
                     <h1 className="text-4xl font-black italic dark:text-white">
                        BeeFleet
                     </h1>
                  </>
               ) : (
                  <Image
                     src="/image/logo.svg"
                     alt="Logo"
                     width={60}
                     height={60}
                  />
               )}
            </Link>
         </div>
         <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav className="mb-6">
               <div className="flex flex-col gap-4">
                  <div>
                     <h2
                        className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                           !isExpanded && !isHovered
                              ? "lg:justify-center"
                              : "justify-start"
                        }`}
                     >
                        {isExpanded || isHovered || isMobileOpen ? (
                           "Menu"
                        ) : (
                           <Icon name="reticencias" className="w-10" />
                        )}
                     </h2>
                     {menuItem(navItem, "main")}
                  </div>

                  <div className="">
                     <h2
                        className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                           !isExpanded && !isHovered
                              ? "lg:justify-center"
                              : "justify-start"
                        }`}
                     >
                        {isExpanded || isHovered || isMobileOpen ? (
                           "Outros"
                        ) : (
                           <Icon name="reticencias" className="w-10" />
                        )}
                     </h2>
                     {menuItem(othersItems, "others")}
                  </div>
               </div>
            </nav>
         </div>
      </aside>
   );
};

export default NavBar;
