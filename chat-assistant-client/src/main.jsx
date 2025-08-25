import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import './index.css';
import AdminDashboard from "./pages/adminSideBar.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
        {/* <AdminDashboard/> */}
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
