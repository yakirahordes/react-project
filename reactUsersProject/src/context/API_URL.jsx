import React from "react";
import { createContext } from "react";

export const UrlContext = createContext();

export function UrlProvider({ children }) {
  const API_URL = "http://localhost:3900";
  return <UrlContext.Provider value={API_URL}>{children}</UrlContext.Provider>;
}
