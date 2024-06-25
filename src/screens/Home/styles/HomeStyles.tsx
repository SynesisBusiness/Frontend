import styled from "styled-components";

export const Container = styled.div``;

export const Banner = styled.div`
  position: relative;
`;

export const ImageBackground = styled.div`
  img {
    width: 100%;
  }
`;

export const BannerContent = styled.div`
  background: linear-gradient(to right, #ffffffca, rgba(255, 255, 255, 0));
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerMain = styled.div`
  width: 80%;
`;

export const BannerText = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 1.3rem;
    color: #111;
    font-weight: 600;
  }
`;

export const Squares = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .squares__box {
    position: absolute;
    transform: translateY(20%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;

    .square__item {
      width: 150px;
      height: 100px;
      border-radius: 10px;
      position: relative;
    }

    .top {
      background-color: #ffdb33;
      transform: translate(50%, 50%);
      z-index: -1;
    }

    .bottom {
      background-color: #78d3e5a5;
      z-index: 0;
    }
  }
`;

export const Main = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const HelpSection = styled.div`
  padding-top: 100px;
  display: flex;
  width: 100%;
`;

export const HelpTitle = styled.div`
  width: 50%;

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

export const HelpCards = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const HelpCard = styled.div<{ flipped?: boolean }>`
  width: 48%;
  background-color: #f0ede4;
  border-radius: 10px;
  perspective: 1000px;
  min-height: 240px;

  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 30px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const CardInner = styled.div<{ flipped?: boolean }>`
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${(props) => (props.flipped ? "rotateY(180deg)" : "rotateY(0)")};
`;

export const CardFront = styled.div`
  position: absolute;
  backface-visibility: hidden;
  overflow: hidden;

  img {
    width: 100%;
    transition: 0.5s all;
  }

  .title__card {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    h3 {
      font-size: 0.95rem;
      font-weight: 500;
      height: 80%;
      width: 100%;
    }

    .arrow {
      display: flex;
      height: 100%;

      .icon__arrow {
      }
    }
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

export const CardBack = styled.div`
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1rem;
    padding: 10px;
  }
`;

export const GrowthSection = styled.div`
  padding-top: 100px;
  width: 100%;
`;

export const GrowthCard = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  background-color: #373a36;
  border-radius: 10px;
  overflow: hidden;
`;

export const GrowthImage = styled.div`
  width: 50%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const GrowthDescription = styled.div`
  width: 50%;
  padding: 20px 25px;

  h2 {
    color: #fff;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    color: #eee;
    font-size: 1rem;
    margin-bottom: 30px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 20px;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #fff;
    outline: transparent;
    border: transparent;

    .icon__arrow {
      margin-right: 10px;
      transition: 0.3s all;
    }

    &:hover {
      cursor: pointer;
      background-color: #eee;

      .icon__arrow {
        transform: translateX(5px);
      }
    }
  }
`;

export const Contact = styled.div`
  background-color: #ffdb33;
  margin-top: 100px;
  border-radius: 10px;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    text-align: left;
    margin-bottom: 20px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #373a36;
    color: #fff;
    border: transparent;
    outline: transparent;
    padding: 7px 30px;
    border-radius: 10px;
    font-size: 0.9rem;
    transition: 0.3s all;
    width: 200px;

    .icon__call {
      margin-right: 5px;
    }

    &:hover {
      background-color: #111;
      cursor: pointer;
    }
  }
`;
