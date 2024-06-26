import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Home from "./screens/Home/Home";
import Account from "./screens/Account/Account";
import FormClient from "./screens/FormClients/FormClient";
import FormOwner from "./screens/FormOwner/FormOwner";
import FormAnalyticsOwner from "./screens/FormAnalytics/FormAnalyticsOwner";
import Diagnosis from "./screens/Diagnosis/Diagnosis";
import { useAuth } from "./context/AuthContext";

interface PrivateProps {
  children: React.ReactNode;
}

const Router = () => {
  const { authState } = useAuth();

  const PrivateRoute: React.FC<PrivateProps> = ({ children }) => {
    let decoded: { id: string };

    try {
      decoded = jwtDecode((localStorage.getItem("tokenJWT") as string) || "");
    } catch (e) {
      localStorage.removeItem("tokenJWT");
      localStorage.removeItem("pocketbase_auth");
      console.log(`Error jwt: ${e}`);
      return <Navigate to={"/account"} />;
    }

    if (authState?.authenticated || decoded.id) {
      return children;
    }

    return <Navigate to={"/account"} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account" element={<Account />} />

        <Route
          path="/forms/business"
          element={
            <PrivateRoute>
              <FormOwner />
            </PrivateRoute>
          }
        />

        <Route
          path="/diagnosis"
          element={
            <PrivateRoute>
              <Diagnosis />
            </PrivateRoute>
          }
        />

        <Route path="/forms/costumers/:path_company" element={<FormClient />} />

        <Route path="/forms/analytics" element={<FormAnalyticsOwner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
