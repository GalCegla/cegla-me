import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { Options as AnimationOptions } from "react-lottie";
import Lottie from "react-lottie-segments";
import {
  soundOn as soundOnAnimation,
  soundOff as soundOffAnimation,
} from "../animations/index";
import { soundOn, soundOff, clairDeLune } from "../../src/sfx";
import { Howl } from "howler";
import React, { FC, useCallback, useState, useEffect } from "react";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import { Helmet } from "react-helmet";

import { Color, ColorBox, ColorBoxProps } from "material-ui-color";
import InfoCard, { InfoCardProps } from "components/InfoCard";
import IconLink from "components/IconLink";

type PlaySegmentsOptions = {
  segments: Array<number>;
  forceFlag: boolean;
};

const playOn = new Howl({
  src: soundOn,
  volume: 0.25,
});

const playOff = new Howl({
  src: soundOff,
  volume: 0.25,
});

const clairDeLuneSfx = new Howl({
  src: clairDeLune,
  volume: 0.75,
});

const IndexPage: FC = () => {
  const [isAnimationPaused, setIsAnimationPaused] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const [pickedColor, setPickedColor] = useState<Color>();
  const [isColorBoxOpen, setIsColorBoxOpen] = useState<boolean>(false);

  const animationOptions: AnimationOptions = {
    animationData: isSoundOn ? soundOffAnimation : soundOnAnimation,
    loop: false,
    autoplay: false,
  };

  const animationStartPoint: PlaySegmentsOptions = {
    segments: [30, 50],
    forceFlag: true,
  };

  const handleAnimationClick = useCallback(() => {
    if (isSoundOn) {
      playOn.play();
      clairDeLuneSfx.play();
    } else {
      playOff.play();
      clairDeLuneSfx.pause();
    }
    setIsSoundOn((value) => !value);
  }, [isSoundOn]);

  const handleColorChange = useCallback(
    (color) => {
      setPickedColor(color);
    },
    [setPickedColor],
  );

  const handleLogoClick = useCallback(() => {
    setIsColorBoxOpen(true);
  }, []);

  const handleColorPickerClickAway = useCallback(() => {
    console.log("click");
    setIsColorBoxOpen(false);
  }, [setIsColorBoxOpen]);

  useEffect(() => {
    document.title = "";
  }, []);

  return (
    <>
      <Helmet>
        <title>Gal Cegla's Space</title>
      </Helmet>
      <Global
        styles={css`
          body {
            background: ${pickedColor
              ? `#${pickedColor.hex}`
              : "lavenderblush"};
          }
        `}
      />
      <StyledContainer>
        <AnimationContainer onClick={handleAnimationClick}>
          <Lottie
            options={animationOptions}
            isStopped={isAnimationPaused}
            playSegments={animationStartPoint}
          />
        </AnimationContainer>
        {isColorBoxOpen ? (
          <ClickAwayListener onClickAway={handleColorPickerClickAway}>
            <ColorContainer>
              <StyledColorBox
                onChange={handleColorChange}
                value={pickedColor}
                isOpen={isColorBoxOpen}
                palette={{ default: "lavenderblush" }}
                defaultValue="lavenderblush"
              />
            </ColorContainer>
          </ClickAwayListener>
        ) : null}
        <StyledHeaderContainer>
          <StyledLine />
          <ButtonBase onClick={handleLogoClick}>
            <StyledLogo height="80" width="80" src="/icon.png" alt="Logo" />
          </ButtonBase>
          <StyledLine />
        </StyledHeaderContainer>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Typography variant="h2">Welcome!</Typography>
          <Typography style={{ textAlign: "center" }}>
            I'm Gal, a software developer, guitar player, snowboarder and
            student, originally from Tel Aviv. I am currently a student at the
            LMU in Munich, and looking for a student job in developement.
          </Typography>
        </Box>
        <Box
          style={{
            marginTop: "10px",
            alignSelf: "center",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {CV.map((item) => (
            <InfoCard
              dates={item.dates}
              company={item.company}
              description={item.description}
              title={item.title}
              key={item.dates}
              companyLink={item.companyLink}
              style={{
                position: "relative",
                marginLeft: "5%",
                marginBottom: "20px",
              }}
            />
          ))}
        </Box>
        <Box>
          <IconLink
            href="https://github.com/galcegla/"
            imgSrc="/gitHubLogo.png"
          />
          <IconLink
            href="www.linkedin.com/in/gal-cegla-805a88204"
            imgSrc="/linkedin.webp"
            width="70"
            height="70"
          />
        </Box>
      </StyledContainer>
    </>
  );
};

export default IndexPage;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled(Image)`
  height: 80px;
  width: 80px;
`;

const StyledHeaderContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 8px;
  margin-bottom: 42px;

  & > * {
    margin: 0 6px;
  }
`;

const StyledLine = styled(Box)`
  border: 1px solid #8d427c;
  background-color: #8d427c;
  border-radius: 50px;
  height: 3px;
  width: 20%;
`;

type StyledColorBoxProps = ColorBoxProps & {
  isOpen: boolean;
};

const ColorContainer = styled(Box)`
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  top: 10px;
`;

const StyledColorBox = styled<FC<StyledColorBoxProps>>(ColorBox)`
  //margin-top: 150px;
  transition: opacity 1s;

  opacity: ${({ isOpen }) => (isOpen ? `100` : `0`)};
  background: lavenderblush;
`;

const AnimationContainer = styled(Box)`
  height: 50px;
  width: 50px;
  left: 10px;
  top: 10px;
  cursor: pointer;
  // position: fixed;
  align-self: flex-start;
`;

const CV: InfoCardProps[] = [
  {
    company: "Ludwig Maximilians University Munich",
    dates: "OCTOBER 2024 - ONGOING, MUNICH",
    title: "Bachelor’s",
    companyLink: "https://www.lmu.de/en/",
    description:
      "With Computer-Linguistics as a major subject and Artificial Intelligence as a minor, I’m currently studying for my bachelor’s degree at the LMU in Munich. The program is oriented around the intertwining of human languages and computers, focusing on linguistics and programming.",
  },
  {
    company: "FlyCode",
    dates: "FEBRUARY 2022 - APRIL 2023, TEL AVIV",
    title: "Fullstack Developer",
    companyLink: "https://www.flycode.com/",
    description:
      "FlyCode is a YCombinator graduate, focused on minimizing revenue loss for subscription-based platforms.\n During my time at FlyCode I had several responsibilities, beyond my daily programming duties for the application; I was responsible for the product’s documentation, helped with the grammar-proofing of our User Interface, took part in the sales and marketing efforts, and contributed to some business aspects of the company.",
  },
  {
    company: "ITC",
    dates: "OCTOBER 2021 - FEBRUARY 2022, TEL AVIV",
    title: "Fullstack Tech Teacher",
    description:
      "ITC was a highly acclaimed software development schools in Tel Aviv, teaching people to become programmers. The school provided an intensive 3 month course including a one-month practical internship in software development. Working at ITC gave me the opportunity to guide students through the practices of the developers’ world, help them with the learned materials, and put their knowledge into practice. Another part of my work was lecturing on different topics, with a focus on teaching ReactJS.",
  },
  {
    company: "withElement",
    dates: "JANUARY 2021 - JULY 2021, TEL AVIV",
    title: "Junior Software Developer",
    description:
      "withElement was a YCombinator-graduate startup with the goal of helping known finance personas (e.g. “influencers”) reach and interact with their audience in an in-person environment. While working at withElement I was part of a very small development team, carrying out tasks relating to all parts of the codebase, both the front and back ends.",
  },
  {
    company: "Amplication",
    dates: "AUGUST 2020 - JANUARY 2021, TEL AVIV",
    title: "Junior Software Developer",
    companyLink: "https://amplication.com/",
    description:
      "Amplication is a no-code API creation service. It enables any user without a technological background to create and update API infrastructures. In this role, I was supporting the code maintenance work by writing tests for the code, while doing some other more general coding tasks as well. In addition, I was involved with marketing tasks such as writing articles regarding the different usages of the product.",
  },
  {
    company: "Israeli Air Force",
    dates: "AUGUST 2017 - APRIL 2020",
    title: "Education R&D Unit",
    description:
      "Service in a technological unit dedicated to the development of new methods of education and instructional courseware for a variety of roles. Some products developed by the unit include educational programs, instructional videos, and virtual reality environments, using the most advanced tools & technologies.",
  },
];
