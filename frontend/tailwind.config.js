/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            "bee-yellow": {
               100: "#FFF4DC",
               200: "#FFEAB8",
               300: "#FFDF95",
               400: "#FFD571",
               500: "#FFCB4A",
               600: "#FFC107",
               700: "#DB9E00",
            },
            "bee-purple": {
               100: "#EDE7F6",
               200: "#C9B6E3",
               300: "#AD92D4",
               400: "#9170C6",
               500: "#724FB7",
               600: "#512DA8",
               700: "#3b2287",
            },
            "bee-dark": {
               100: "#fafafa", //cor fundo light mode
               200: "#f9eaffd2",
               300: "#dbdbdb", //borda do light mode
               400: "#364153", //borda do darkmode
               500: "#424242",
               600: "#2E2E2F",
               700: "#212121",
               800: "#101828", //cor de fundo do darkmode
            },
            "bee-alert": {
               100: "#4CAF50",
               200: "rgba(76, 175, 80, 0.4)",
               300: "#F44336",
               400: "rgba(244, 67, 54, 0.4)",
               500: "#F0F0F0",
            },
         },
      },
   },
   plugins: [],
};
