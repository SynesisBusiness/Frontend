import React, { useState } from "react";
import { ArrowCircleRight, ArrowRight, PhoneCall } from "phosphor-react";

import * as styles from "./styles/HomeStyles";

// assets
import banner from "../../assets/screens/home/banner.svg";
import growth from "../../assets/screens/home/growth.svg";

// utils and objects
import { dataHelp } from "../../utils/Home/HelpObjectSection";

// components
import Header from "../../components/Home/Header/Header";
import Footer from "../../components/Home/Footer/Footer.tsx";

const Home: React.FC = () => {
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const handleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <styles.Container>
      <Header />

      <styles.Banner>
        <styles.ImageBackground>
          <img src={banner} alt="banner" />
        </styles.ImageBackground>

        <styles.BannerContent>
          <styles.BannerMain>
            <styles.BannerText>
              <h1>Welcome to Synesis</h1>
              <h2>
                We are pioneers in holistic decision-making for business growth
              </h2>
            </styles.BannerText>

            <styles.Squares>
              <div className="squares__box">
                <div className="square__item top"></div>
                <div className="square__item bottom"></div>
              </div>
            </styles.Squares>
          </styles.BannerMain>
        </styles.BannerContent>
      </styles.Banner>

      <styles.Main>
        <styles.HelpSection>
          <styles.HelpTitle>
            <h2>How can we help you today?</h2>

            <p>
              We integrate your data, leverage AI-driven insights, and provide
              interactive dashboards to enhance your decision-making. Our
              holistic approach combines human insights, business data, and
              market intelligence, empowering you to optimize strategies and
              drive sustainable growth.
            </p>
          </styles.HelpTitle>

          <styles.HelpCards>
            {dataHelp &&
              dataHelp.map((help, index) => {
                return (
                  <styles.HelpCard
                    key={index}
                    onClick={() => handleFlip(index)}
                    flipped={flipped[index]}
                  >
                    <styles.CardInner flipped={flipped[index]}>
                      <styles.CardFront>
                        <img src={help.img} alt="image help" />

                        <div className="title__card">
                          <h3>{help.title}</h3>

                          <div className="arrow">
                            <ArrowCircleRight
                              size={24}
                              className="icon__arrow"
                              color="#333"
                            />
                          </div>
                        </div>
                      </styles.CardFront>

                      <styles.CardBack>
                        <p>{help.description}</p>
                      </styles.CardBack>
                    </styles.CardInner>
                  </styles.HelpCard>
                );
              })}
          </styles.HelpCards>
        </styles.HelpSection>

        <styles.GrowthSection>
          <styles.GrowthCard>
            <styles.GrowthImage
              style={{ backgroundImage: `url(${growth})` }}
            ></styles.GrowthImage>

            <styles.GrowthDescription>
              <h2>Growth readiness diagnosis</h2>

              <p>
                Evaluate your business's readiness for growth with our
                comprehensive diagnosis. We analyze your growth objectives,
                providing a clear report that identifies potential gaps and
                opportunities for improvement
              </p>

              <button>
                <ArrowRight size={18} color="#000" className="icon__arrow" />{" "}
                Experiment now
              </button>
            </styles.GrowthDescription>
          </styles.GrowthCard>
        </styles.GrowthSection>

        <styles.Contact>
          <h2>Contact & Support</h2>

          <p>
            Keeping in touch with you is important to us. So please don’t
            hesitate to share any questions you may have.
          </p>

          <button>
            <PhoneCall className="icon__call" size={18} /> Contact us
          </button>
        </styles.Contact>

        <Footer />
      </styles.Main>
    </styles.Container>
  );
};

export default Home;
