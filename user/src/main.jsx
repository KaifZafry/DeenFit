import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/Store.jsx";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "519531634447-1nfl3brfb6rulikkeafug1csbnrebtal.apps.googleusercontent.com"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
