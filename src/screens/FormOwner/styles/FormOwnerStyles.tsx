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
  }

  p {
    font-size: 1rem;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const Section = styled.div`
  margin-bottom: 45px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Question = styled.div`
  margin-bottom: 25px;
  margin-left: 20px;

  @media (max-width: 599px) {
    margin-left: 0px;
  }
`;

export const QuestionTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px 0px;
  font-size: 0.95rem;
  margin-bottom: 10px;
  border: transparent;
  outline: transparent;
  border-bottom: 2px solid #78d2e5;
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-size: 0.95rem;
  height: 100px;
  margin-bottom: 10px;
  border: transparent;
  outline: transparent;
  border-bottom: 2px solid #78d2e5;
  resize: none;
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Option = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  font-size: 0.95rem;
  background-color: ${({ selected }) => (selected ? "#007bff" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border: 2px solid #78d2e5;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#0056b3" : "#e0e0e0")};
  }

  @media (max-width: 599px) {
    padding: 7px 15px;
  }
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const HasDiagnosis = styled.div`
  h2 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  p {
    font-size: 1rem;
    margin-bottom: 40px;
  }
`;
