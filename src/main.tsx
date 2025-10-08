// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Redux
import { Provider } from "react-redux";
// Components
import App from "./App.tsx";
// Styles
import "./index.css";
// Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
// Store
import store from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
