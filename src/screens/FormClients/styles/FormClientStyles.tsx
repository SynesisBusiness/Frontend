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

export const Form = styled.form`
  h2 {
    font-size: 1.2rem;
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

  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;

    border: none;
    border-bottom: 1px solid #78d2e5;
    font-size: 14px;
    outline: none;
  }

  textarea {
    height: 100px;
    resize: vertical;
  }

  .buttonGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export const Button = styled.button<{ selected?: boolean }>`
  padding: 10px 20px;
  border: 1px solid #78d2e5;
  border-radius: 20px;
  background: ${(props) => (props.selected ? "#78d2e5" : "none")};
  color: ${(props) => (props.selected ? "white" : "inherit")};
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;

  &:hover {
    background-color: #78d2e5;
    color: white;
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
    background-color: transparent;
    border: 1px solid #78d2e5;
    color: #111;
    display: flex;
    align-items: center;
    padding: 6px 15px;
    border-radius: 15px;
    transition: background-color 0.3s, color 0.3s;

    .icon__arrow {
      margin-right: 5px;
    }

    &:hover {
      background-color: #78d2e5;
      color: white;
    }
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
};
