import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Main = styled.div`
  width: 60vw;
  padding-top: 100px;
`;

export const Title = styled.div`
  h1 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 20px;
  }
`;
export const Form = styled.div`
  h3 {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 60%;
    border: transparent;
    border-bottom: 2px solid #78d2e5;
  }
`;
