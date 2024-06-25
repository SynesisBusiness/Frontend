import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home/Home";
import Account from "./screens/Account/Account";
import FormClient from "./screens/FormClients/FormClient";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account" element={<Account />} />

        <Route path="/forms/costumer/:path_company" element={<FormClient />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
