import { extendTheme } from "@yamada-ui/react";
const theme = extendTheme({
    colors: {
      blue: {
        200: '#9BE7FF',
        300: '#63B3ED',
        500: '#4299E1',
        700: '#2B6CB0',
      },
      teal: {
        300: '#4FD1C5',
        500: '#38B2AC',
      },
      yellow: {
        400: '#F6E05E',
      },
      orange: {
        100: '#FFFAF0',
      },
      purple: {
        300: '#D6BCFA',
      },
      gray: {
        200: '#808080'
      }
    },
});

export default theme ;