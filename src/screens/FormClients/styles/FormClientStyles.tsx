import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Main = styled.div`
  min-width: 60vw;
  padding: 60px 0px;

  @media (max-width: 1200px) {
    padding: 60px 15px;
  }
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

    span {
      color: #78d2e5;
    }
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 20px;
  }
`;

export const Question = styled.div`
  margin-bottom: 35px;

  p {
    color: red;
    font-size: 0.9rem;
    color: #555;
    padding: 2px 0px;
    margin-bottom: 5px;
  }

  .margin__bottom {
    margin-bottom: 5px;
  }

  label {
    display: block;
    font-size: 1rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 5px 0px;
    border: transparent;
    border-bottom: 1px solid #78d2e5;
    font-size: 0.95rem;
    outline: transparent;
    resize: none;
  }

  textarea {
    height: 100px;
    resize: none;
  }

  .buttonGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: 599px) {
      gap: 10px;
    }
  }
`;

export const Button = styled.button<{ selected?: boolean }>`
  padding: 10px 20px;
  border: 1px solid #78d2e5;
  border-radius: 20px;
  background-color: ${({ selected }) => (selected ? "#007bff" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 2px solid #78d2e5;
  border-radius: 20px;
  font-size: 0.95rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#0056b3" : "#e0e0e0")};
  }

  @media (max-width: 599px) {
    padding: 7px 15px;
  }
`;

export const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 100px;

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
    background-color: #007bff;
    color: #fff;
    padding: 8px 20px;
    font-size: 0.95rem;
    border: transparent;
    outline: transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s all;

    .icon__rocket {
      margin-left: 5px;
      transition: 0.3s all;
    }

    &:hover {
      cursor: pointer;
      background-color: #0056b3;

      .icon__rocket {
        transform: translateY(-3px);
      }
    }
  }
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;

  .icon__warning {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
  }

  @media (max-width: 599px) {
    width: 90vw;
  }
`;

export default {
  Container,
  Main,
  Title,
  Form,
  Question,
  Button,
  Action,
  Error,
};
