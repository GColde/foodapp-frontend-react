/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        Quicksand: ["Quicksand", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        mainColor: ["#00FF00"],
        backgroundColor: ["#000000"],
        foregroundColor: ["#FFFFFF"],
        secondaryColor: ["#00BFFF"],
        subtleColor: ["#404040"],
        errorColor: ["#DC143C"],
        successColor: ["#32CD32"],
      },
      height: {
        recipeFrontTab: ["39rem"],
      },
    },
  },
  plugins: [],
};
