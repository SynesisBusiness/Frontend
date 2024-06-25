import React from "react";
import { User } from "phosphor-react";

import * as styles from "./styles/HeaderStyles";

import logo from "../../../assets/logos/logo.svg";

const Header: React.FC = () => {
  return (
    <styles.Container>
      <styles.Main>
        <styles.Logo>
          <img src={logo} alt="Logo da synesis" />
        </styles.Logo>

        <styles.Button>
          <button>
            <User className="icon__user" size={16} /> Account
          </button>
        </styles.Button>
      </styles.Main>
    </styles.Container>
  );
};

export default Header;
