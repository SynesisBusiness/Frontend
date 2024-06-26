import { QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Router from "./Router";
import queryClient from "./services/queryClient";

import { ContextApiProvider } from "./context/Api";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <ContextApiProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthProvider>
    </ContextApiProvider>
  );
};

export default App;
