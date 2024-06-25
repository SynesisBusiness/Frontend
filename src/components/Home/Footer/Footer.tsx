import React from "react";
import { Copyright } from "phosphor-react";

import * as styles from "./styles/FooterStyles";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <styles.Container>
      <p>
        <Copyright size={20} className="icon__copy" /> Copyright {year} Synesis.
        Todos os direitos reservados
      </p>
    </styles.Container>
  );
};

export default Footer;
