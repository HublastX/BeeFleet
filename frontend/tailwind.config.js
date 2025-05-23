/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "bee-yellow": {
               100: "#ffd4261c", //item selecionado navbar
               200: "#FFEAB8",
               300: "#FFDF95",
               400: "#FFD571",
               500: "#FFCB4A", // icone de olho das tabelas || libk do driver page
               600: "#FFC107", // item selecionado navbar darkmode
               700: "#DB9E00", // item selecionado navbar lightmode || icone olho hover || letra amarela do profile || link do driver page hover
            },
            "bee-purple": {
               100: "#EDE7F6",
               200: "#C9B6E3",
               300: "#AD92D4",
               400: "#9170C6", // dark focus ring e dorder do inputtext
               500: "#724FB7", 
               600: "#512DA8", // bg do btn primary
               700: "#3b2287", // bg do btn primary hover
            },
            "bee-dark": {
               100: "#fbfbfd", //cor fundo light mode[btn secundary hover, card, skeleton table, navbar, header, cartable, hometable, usertable ]
               200: "#f9eaffd2",
               300: "#dbdbdb", //borda do light mode[btn secundary, card, input, navbar, header, cartable, hometable, usertable, userdropdown]
               400: "#364153", //borda do darkmode [btn secundary, card, navbar, header, cartable, hometable, userTable, userdropdown], || bg hover[btn secundary, carTable]
               500: "#424242",
               600: "#2E2E2F", //cor do texto do lightmode[icon card, card, input, navbar, carTable, hometable, pagination, usertable] || bg dark skeleton [form, header, table]
               700: "#212121",
               800: "#101828", //cor de fundo do darkmode [btn secundary, card, input autofill, skeleton table, navbar, header, cartable, hometable, usertable, userdropdown]
            },
            "bee-alert": {
               100: "#4CAF50", //cor do texto success [badge light]
               200: "rgba(76, 175, 0, 0.20)", //cor do bg success [badge light, badge solid]
               300: "#F44336", //cor do texto error [badge light] || icone de lixeira
               400: "rgba(255, 17, 0, 0.20)", //cor do bg error [badge light, badge solid] || icone de lixeira hover
               500: "#F0F0F0", //cor do texto do darkmode[icon card, card, cartable, hometable, pagination, usertable, userdropdown] || bg hover light [navbar, cartable, userTable, userdropdown]
               600: "#d2d2d21f", // bg hover darkmode [navbar, cartable, usertable, userdropdown]
               700: " #f790093f", //cor do bg warning [badge light, badge solid]
            },
         },
      },
   },
   plugins: [],
};
