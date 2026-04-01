// App.js
import React from "react";
import { useRoutes } from "react-router-dom";
import { AuthenticationRoutes, MainRoutes } from "../routes/Routes";
import { useFontFamily } from "../components/FontFamilyContext";
import "./App.css";

function App() {
  const { fontFamily } = useFontFamily();
 const routeResult = useRoutes([MainRoutes, AuthenticationRoutes]);
 
  return (
    <div style={{fontFamily}}>
      {routeResult}
     
    </div>
  );
}

export default App;
