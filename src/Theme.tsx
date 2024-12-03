import { extendTheme } from "@yamada-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: '"Kaisei Decol", serif',
        fontWeight: "400",
        fontStyle: "normal",
      },
      code: {
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },
    },
  },
});

export default customTheme;
