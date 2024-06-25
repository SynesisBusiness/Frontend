import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border-top: 1px solid #78d2e5;
  min-height: 80px;

  p {
    font-size: 0.95rem;
    display: flex;
    align-items: center;

    .icon__copy {
      margin-right: 5px;
    }
  }
`;
