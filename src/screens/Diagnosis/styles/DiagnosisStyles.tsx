import styled from "styled-components";

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

export const LoadingScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #555;
    text-align: center;
    margin-bottom: 30px;
  }
`;
