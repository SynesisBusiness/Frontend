import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Main = styled.div`
  min-width: 40vw;
  padding-top: 100px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 200px;
  }
`;

export const Title = styled.div`
  h1 {
    font-size: 1.4rem;
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
    margin-bottom: 10px;
  }
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  span {
    font-size: 1rem;
  }

  input {
    border: transparent;
    border-bottom: 2px solid #78d2e5;
    font-size: 0.95rem;
    padding: 5px 0px;
    outline: transparent;
  }
`;

export const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    font-size: 0.9rem;
    color: #333;
    margin-right: 15px;

    .link {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  button {
    background-color: transparent;
    border: 1px solid #78d2e5;
    color: #111;
    display: flex;
    align-items: center;
    padding: 6px 15px;
    border-radius: 15px;

    .icon__arrow {
      margin-right: 5px;
    }
  }
`;
