import React from "react";

import * as styles from "./styles/AccountStyles";

const Account: React.FC = () => {
  return (
    <styles.Container>
      <styles.Main>
        <styles.Title>
          <h1>Enter the information below to create an account</h1>

          <p>At the end, you will have access to the comprehensive report.</p>
        </styles.Title>

        <styles.Form>
          <h3>Provide initial information</h3>

          <styles.Label>
            <span>Name*</span>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name..."
            />
          </styles.Label>

          <styles.Label>
            <span>E-mail*</span>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your best e-mail..."
            />
          </styles.Label>

          <styles.Label>
            <span>Password*</span>

            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password..."
            />
          </styles.Label>
        </styles.Form>
      </styles.Main>
    </styles.Container>
  );
};

export default Account;
