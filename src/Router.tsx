import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home/Home";
import Account from "./screens/Account/Account";
import FormClient from "./screens/FormClients/FormClient";
import FormOwner from "./screens/FormOwner/FormOwner";
import Diagnosis from "./screens/Diagnosis/Diagnosis";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account" element={<Account />} />

        <Route path="/forms/business" element={<FormOwner />} />

        <Route path="/diagnosis" element={<Diagnosis />} />

        <Route path="/forms/costumers/:path_company" element={<FormClient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
