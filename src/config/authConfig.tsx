// src/authConfig.js
export const msalConfig = {
  auth: {
    clientId: `${process.env.REACT_APP_MICROSOFT_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MICROSOFT_TENANT_ID}`,
    // authority: `https://login.microsoftonline.com/common`,
    redirectUri: "http://localhost:3000/auth/callback",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to true if you are having issues on IE11 or Edge
  },
};
 
export const loginRequest = {
  scopes: [`https://graph.microsoft.com/.default`],
};
 