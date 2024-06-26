import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { RecordAuthResponse, RecordModel } from "pocketbase";

import { useContextApi } from "./Api";

interface AuthContextType {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin: (
    email: string,
    password: string,
    loading: React.ComponentState,
    setLoading: React.ComponentState
  ) => Promise<RecordAuthResponse<RecordModel> | null | undefined>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  const { backendClient } = useContextApi();

  const login = async (
    email: string,
    password: string,
    loading: React.ComponentState,
    setLoading: React.ComponentState
  ) => {
    if (setLoading) {
      setLoading({ ...loading, login: true });
    }

    let response = null;

    try {
      response = await backendClient
        ?.collection("users")
        .authWithPassword(email, password);

      console.log(response);

      if (response) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${backendClient?.authStore.token}`;

        localStorage.setItem("tokenJWT", response.token);

        setAuthState({
          token: backendClient!.authStore.token,
          authenticated: true,
        });
      }
    } catch (error) {
      console.error("Failed to login", error);
    }

    if (setLoading) {
      setLoading({ ...loading, login: false });
    }

    return response;
  };

  const logout = async () => {
    localStorage.removeItem("tokenJWT");
    localStorage.removeItem("pocketbase_auth");
    backendClient?.authStore.clear();
    setAuthState({ token: null, authenticated: false });
    window.location.href = "/";
  };

  const value: AuthContextType = {
    authState,
    onLogin: login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
