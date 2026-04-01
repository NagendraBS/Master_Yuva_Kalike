// FontFamilyContext.js
import React, { createContext, useContext, useState } from "react";

const FontFamilyContext = createContext();

export function useFontFamily() {
  return useContext(FontFamilyContext);
}

export function FontFamilyProvider({ children }) {
  const [fontFamily, setFontFamily] = useState("Arial");

  const changeFontFamily = (font) => {
    setFontFamily(font);
  };

  const value = {
    fontFamily,
    changeFontFamily,
  };

  return (
    <FontFamilyContext.Provider value={value}>
      {children}
    </FontFamilyContext.Provider>
  );
}
