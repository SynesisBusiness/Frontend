/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ArrowRight } from "phosphor-react";
import Client from "pocketbase";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import * as styles from "./styles/AccountStyles";

import logo from "../../assets/logos/logo.svg";

import { handleRegister, handleLogin } from "./controllers/AccountController";
import { useContextApi } from "../../context/Api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DataRegister {
  name: string;
  email: string;
  password: string;
}

interface DataLogin {
  email: string;
  password: string;
}

const Account: React.FC = () => {
  const { backendClient } = useContextApi();
  const { onLogin } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [dataRegister, setDataRegister] = useState<DataRegister>({
    name: "",
    email: "",
    password: "",
  });
  const [dataLogin, setDataLogin] = useState<DataLogin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const verifyAccount = async (userID: string) => {
    const response = await backendClient?.collection("users").getFullList({
      filter: `id="${userID}"`,
    });

    if (response && response.length >= 1) {
      navigate("/forms/business/1");
    }
  };

  useEffect(() => {
    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );
      console.log(decoded);
      if (decoded) {
        verifyAccount(decoded.id);
      }
    } catch (e) {
      console.log(`User not logged`);
    }
  }, [backendClient]);

  return (
    <styles.Container>
      <styles.Main>
        <styles.Logo>
          <img src={logo} alt="Logo synesis" />
        </styles.Logo>

        <styles.Title>
          <h1>
            {isRegister
              ? "Enter the information below to create an account"
              : "Welcome back"}
          </h1>

          <p>
            {isRegister
              ? "At the end, you will have access to the comprehensive report"
              : "Fill in the information to login"}
          </p>
        </styles.Title>

        <styles.Form>
          {isRegister && <h3>Provide initial information</h3>}

          {isRegister && (
            <styles.Label>
              <span>Name*</span>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name..."
                value={dataRegister.name}
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, name: e.target.value })
                }
              />
            </styles.Label>
          )}

          <styles.Label>
            <span>E-mail*</span>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your best e-mail..."
              value={isRegister ? dataRegister.email : dataLogin.email}
              onChange={(e) => {
                if (isRegister) {
                  setDataRegister({ ...dataRegister, email: e.target.value });
                } else {
                  setDataLogin({ ...dataLogin, email: e.target.value });
                }
              }}
            />
          </styles.Label>

          <styles.Label>
            <span>Password*</span>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={isRegister ? dataRegister.password : dataLogin.password}
              onChange={(e) => {
                if (isRegister) {
                  setDataRegister({
                    ...dataRegister,
                    password: e.target.value,
                  });
                } else {
                  setDataLogin({ ...dataLogin, password: e.target.value });
                }
              }}
            />
          </styles.Label>

          <styles.Action>
            {isRegister && (
              <p>
                Already have an account?{" "}
                <span
                  className="link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  Login here
                </span>
              </p>
            )}

            {!isRegister && (
              <p>
                Need to create an account?{" "}
                <span
                  className="link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  Click here
                </span>
              </p>
            )}

            <button
              onClick={() => {
                if (isRegister) {
                  return handleRegister(
                    backendClient as Client,
                    dataRegister,
                    loading,
                    setLoading,
                    navigate,
                    onLogin
                  );
                }

                handleLogin(dataLogin, navigate, loading, setLoading, onLogin);
              }}
            >
              <ArrowRight size={18} color="#111" className="icon__arrow" />
              {isRegister && !loading && "Register"}
              {!isRegister && !loading && "Login"}
              {loading && "Wait..."}
            </button>
          </styles.Action>
        </styles.Form>
      </styles.Main>

      <ToastContainer />
    </styles.Container>
  );
};

export default Account;
