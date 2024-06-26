import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
`;

export const Main = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 599px) {
    width: 90%;
  }

  @media (min-width: 1800px) {
    width: 70%;
  }
`;

export const Logo = styled.div`
  img {
    width: 220px;
    transform: translateY(3px);

    @media (max-width: 599px) {
      width: 180px;
    }
  }
`;

export const Button = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #373a36;
    color: #fff;
    border: transparent;
    outline: transparent;
    padding: 5px 30px;
    border-radius: 10px;
    font-size: 0.9rem;
    transition: 0.3s all;

    .icon__user {
      margin-right: 5px;
    }

    &:hover {
      background-color: #111;
      cursor: pointer;
    }
  }
`;
