import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import theme from "./styles/theme";
import { Provider } from "react-redux";
import store from "./store";
import { enableMapSet } from "immer";
import { registerLicense } from "@syncfusion/ej2-base";

enableMapSet();
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXlfdnZXRmJdWEJ/WUU="
);
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
