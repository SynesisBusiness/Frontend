import React, { useState, createContext, useEffect, useContext } from "react";
import PocketBase from "pocketbase";

const url = "https://synesisbusiness.pockethost.io/";

interface Props {
  children: React.ReactNode;
}

interface PropsContext {
  backendClient: PocketBase | null;
}

const ContextApi = createContext<PropsContext>({
  backendClient: null,
});

export const ContextApiProvider: React.FC<Props> = ({ children }) => {
  const [backendClient, setBackendClient] = useState<PocketBase | null>(null);

  useEffect(() => {
    const client = new PocketBase(url);
    setBackendClient(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContextApi.Provider value={{ backendClient }}>
      {children}
    </ContextApi.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContextApi = () => {
  const context = useContext(ContextApi);

  if (!context) {
    throw new Error(
      "useContextApi deve ser usado dentro de um ContextApiProvider"
    );
  }
  return context;
};
