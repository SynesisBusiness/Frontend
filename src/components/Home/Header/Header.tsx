import React from "react";
import { User } from "phosphor-react";

import * as styles from "./styles/HeaderStyles";

import logo from "../../../assets/logos/logo.svg";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <styles.Container>
      <styles.Main>
        <styles.Logo>
          <img src={logo} alt="Logo da synesis" />
        </styles.Logo>

        <styles.Button>
          <button onClick={() => navigate("/account")}>
            <User className="icon__user" size={16} /> Account
          </button>
        </styles.Button>
      </styles.Main>
    </styles.Container>
  );
};

export default Header;
