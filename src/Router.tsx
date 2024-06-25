import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
