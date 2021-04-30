import styles from "../components/index-components.module.css";
import styled from "@emotion/styled"
import {icon, gitHubLogo} from 'images/index'
import lottie from "lottie-web";
import bothAnim from "../animations/bothAnim.json";
import {soundOn, soundOff, clairDeLune} from "sfx/index";
import { Howl, Howler } from "howler";
import React, { FC } from "react";
import { Box } from "@material-ui/core";

const leftLine = styles.leftLine;
const rightLine = styles.rightLine;
const logo = styles.logo;
const box = styles.box;
const socialIcon = styles.socialIcon;
const soundAnimationContainer = styles.soundAnimationContainer;
const { useState, useEffect } = React;

const playOn = new Howl({
  src: [soundOn],
  volume: 0.25,
});

const playOff = new Howl({
  src: [soundOff],
  volume: 0.25,
});

const clairDeLuneSfx = new Howl({
  src: [clairDeLune],
  volume: 0.75,
});

const IndexPage: FC = () => {
  const [animationState, setAnimationState] = useState("");
  let animationContainer = React.createRef();
  let animationRef = React.createRef();

  useEffect(() => {
    animationRef.current = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: bothAnim,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });
    return () => {
      animationRef.current.destroy();
    };
  }, [animationContainer, animationRef]);

  useEffect(() => {
    if (animationState === "on") {
      animationRef.current.playSegments([30, 50], true);
    } else if (animationState === "off") {
      animationRef.current.playSegments([85, 110], true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState, animationRef]);

  const handleClick = () => {
    if (animationState === "off" || animationState === "") {
      setAnimationState("on");
      playOn.play();
      clairDeLuneSfx.play();
    } else if (animationState === "on") {
      setAnimationState("off");
      playOff.play();
      clairDeLuneSfx.pause();
    }
  };

  useEffect(() => {
    document.title = "Gal Cegla's Space";
  }, []);

  return (
    <div>
      <div
        className={soundAnimationContainer}
        ref={animationContainer}
        role=""
        onClick={handleClick}
      />
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div className={leftLine} />
        <img className={logo} src={icon} alt="Logo" />
        <div className={rightLine} />
      </div>
      <a
        className={box}
        href="https://github.com/galcegla/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          useClass={socialIcon}
          src={gitHubLogo}
          alt="GitHub Logo"
          width="5%"
          height="5%"
        />
      </a>
    </div>
  );
}

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
`

const StyledLogo = styled.img`
  
`

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

`