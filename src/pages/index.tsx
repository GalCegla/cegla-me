import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { icon, gitHubLogo } from "../images";
import { Options as AnimationOptions } from "react-lottie";
import Lottie from "react-lottie-segments";
import {
  soundOn as soundOnAnimation,
  soundOff as soundOffAnimation,
} from "../animations/index";
import { soundOn, soundOff, clairDeLune } from "../../src/sfx";
import { Howl } from "howler";
import React, { FC, useCallback, useState, useEffect } from "react";
import { Box, Button, ButtonBase, ClickAwayListener } from "@material-ui/core";
import Link from "next/link";
import { Helmet } from "react-helmet";

import { Color, ColorBox, ColorBoxProps } from "material-ui-color";

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
    [setPickedColor]
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
            <StyledLogo src={icon} alt="Logo" />
          </ButtonBase>
          <StyledLine />
        </StyledHeaderContainer>
        <Link
          href="https://github.com/galcegla/"
        >
          <StyledButton>
            <StyledIcon src={gitHubLogo} alt="GitHub Icon" />
          </StyledButton>
        </Link>
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

const StyledLogo = styled.img`
  height: 80px;
  width: 80px;
`;
const StyledIcon = styled.img`
  height: 40px;
  width: 40px;
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
  height: 6px;
  width: 120px;
`;

const StyledButton = styled(Button)`
  background: #ffdae6;
  align-items: center;
  border-radius: 100%;
  width: 70px;
  height: 70px;
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
  position: fixed;
`;
