import styled from "@emotion/styled";
import { icon, gitHubLogo } from "../images";
import lottie from "lottie-web";
import bothAnim from "../animations/bothAnim.json";
import { soundOn, soundOff, clairDeLune } from "../../src/sfx";
import { Howl } from "howler";
import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { Link } from "gatsby";

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
  const [animationState, setAnimationState] = useState("");
  const animationContainerRef = useRef<HTMLDivElement>();
  const animationRef = useRef();

  //@ts-ignore
  const loadAnimation = lottie.loadAnimation({
    container: animationContainerRef.current as Element,
    animationData: bothAnim,
    renderer: "svg",
    loop: false,
    autoplay: false,
  });

  useEffect(() => {
    if (animationState === "on") {
      loadAnimation.playSegments([30, 50], true);
    } else if (animationState === "off") {
      loadAnimation.playSegments([85, 110], true);
    }
  }, [animationState, animationRef]);

  const handleClick = useCallback(() => {
    if (animationState === "off" || animationState === "") {
      setAnimationState("on");
      playOn.play();
      clairDeLuneSfx.play();
    } else if (animationState === "on") {
      setAnimationState("off");
      playOff.play();
      clairDeLuneSfx.pause();
    }
  }, [animationState, setAnimationState]);

  useEffect(() => {
    document.title = "Gal Cegla's Space";
  }, []);

  return (
    <StyledContainer>
      <StyledSoundAnimationContainer
        ref={() => animationContainerRef}
        role=""
        onClick={handleClick}
      />
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <StyledLine />
        <StyledLogo src={icon} alt="Logo" />
        <StyledLine />
      </div>
      <Link to="https://github.com/galcegla/">
        <StyledButton>
          <StyledIcon src={gitHubLogo} alt="GitHub Icon" />
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

export default IndexPage;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
`;

const StyledLogo = styled.img``;
const StyledIcon = styled.img``;

const StyledLine = styled(Box)`
  border: 5px solid #8d427c;
  background-color: #8d427c;
  border-radius: 5px;
  width: calc(30%);
  animation: wipeAnimation 3s;

  @keyframes wipeAnimation {
    0% {
      width: 0;
      opacity: 0;
    }

    32% {
      width: 0;
      opacity: 0;
    }
    33% {
      width: 0;
      opacity: 100;
    }
    100% {
      width: 100;
      transition-timing-function: ease-in-out;
    }
  }
`;

const StyledButton = styled(Button)`
  background: #ffdae6;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
`;

const StyledSoundAnimationContainer = styled.div``;
