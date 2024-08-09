import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./config/authConfig";
import {GoogleOAuthProvider} from '@react-oauth/google';

const msalInstance = new PublicClientApplication(msalConfig);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <MsalProvider instance={msalInstance}>
       <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <App />
      </GoogleOAuthProvider>
    </MsalProvider>
  );
}
