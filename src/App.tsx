import { QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Router from "./Router";
import queryClient from "./services/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
