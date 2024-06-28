import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

export const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
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

export const Main = styled.div`
  width: 70vw;
  padding: 50px 0px;

  .separated {
    border-bottom: 2px solid #78d2e5;
    margin-bottom: 50px;
    padding-bottom: 50px;
  }

  @media (max-width: 1200px) {
    padding: 50px 15px;
  }
`;

export const ReportContainer = styled.div``;

export const NextSteps = styled.div``;

export const NextStepsTitle = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 5px;
  }

  p {
    font-size: 1rem;
    color: #333;
  }
`;

export const NextStepsBoxes = styled.div`
  .blocked {
    color: #777;
  }
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.05rem;
    font-weight: 500;
    display: flex;
    align-items: center;

    .icon__lock,
    .icon__check {
      margin-right: 5px;
      transform: translateY(-1px);

      @media (max-width: 768px) {
        transform: translateY(2px);
      }
    }

    @media (max-width: 768px) {
      align-items: flex-start;

      span {
        width: 90%;
      }
    }
  }
`;

export const StepBody = styled.div`
  padding: 15px 0px 30px 30px;

  .form__copy {
    p {
      border: 2px solid #78d2e5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      padding: 7px 20px;
      font-size: 0.95rem;
      transition: 0.3s all;
      width: 280px;

      .icon__copy {
        margin-left: 5px;
      }

      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
    }
  }

  .form__client__answers {
    margin-top: 20px;

    h4 {
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
    }

    .loading__reports {
      margin-top: 10px;

      .spinning {
        animation: ${spin} 1s linear infinite;
      }
    }

    p {
      display: flex;
      align-items: center;
      font-size: 0.95rem;
      margin-top: 10px;
      color: #333;

      .icon__users {
        margin-right: 10px;
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &:hover {
      cursor: pointer;
    }
  }

  input[type="text"] {
    padding: 5px 0px;
    width: 60%;
    border: transparent;
    outline: transparent;
    border-bottom: 2px solid #78d2e5;
    margin: 5px 0px 15px 0px;
    font-size: 0.95rem;

    @media (max-width: 768px) {
      width: 95%;
    }
  }

  button {
    background-color: transparent;
    color: #007bff;
    padding: 8px 20px;
    font-size: 0.95rem;
    border: 2px solid #007bff;
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
      background-color: #eee;

      .icon__rocket {
        transform: translateY(-3px);
      }
    }
  }

  @media (max-width: 599px) {
    padding: 15px 0px 30px 0px;
  }
`;

export const CustomCheckbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #78d2e5;
  background-color: ${({ checked }) => (checked ? "#78d2e5" : "transparent")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
`;

export const GrowthButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
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

    &:hover:not(.disabled) {
      cursor: pointer;
      background-color: #0056b3;

      .icon__rocket {
        transform: translateY(-3px);
      }
    }

    &.disabled {
      background-color: #aaa;
      color: #fff;
      cursor: pointer;
    }
  }

  @media (max-width: 599px) {
    justify-content: center;
    padding-top: 20px;
  }
`;

export const ReportError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #333;
  }
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

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

export const NoTextReport = styled.div`
  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #333;
  }
`;

export const TextReport = styled.div`
  p {
    font-size: 1rem;
  }

  .container {
    h1 {
      font-size: 1.7rem;
      font-weight: 500;
      text-align: center;
    }

    h2 {
      margin-top: 30px;
      font-size: 1.3rem;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .info {
      font-size: 1rem;
      color: #555;
      margin-bottom: 10px;
    }

    .list__container {
      border: 2px solid #78d2e5;
      border-radius: 15px;
      padding: 20px;

      ul {
        list-style-position: inside;

        li {
          font-size: 1rem;
          line-height: 2;
        }
      }
    }
  }
`;
