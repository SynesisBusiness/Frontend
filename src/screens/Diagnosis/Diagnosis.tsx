import React from "react";
import { BallTriangle } from "react-loading-icons";

import * as styles from "./styles/DiagnosisStyles";

const Diagnosis: React.FC = () => {
  return (
    <styles.Container>
      <styles.LoadingScreen>
        <styles.Loading>
          <h2>The Diagnosis is being generated</h2>

          <p>
            It will be ready in a few minutes, please wait on this screen...
          </p>

          <BallTriangle strokeWidth={200} stroke="#555" />
        </styles.Loading>
      </styles.LoadingScreen>
    </styles.Container>
  );
};

export default Diagnosis;
("");
