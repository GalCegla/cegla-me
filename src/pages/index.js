import * as React from "react";
import styles from "../components/index-components.module.css";
import icon from "./images/icon.png";
import gitHubLogo from "./images/gitHubLogo.png";
import lottie from "lottie-web";
import bothAnim from "../animations/bothAnim.json";
import soundOn from "../animations/soundOn.json";
import soundOff from "../animations/soundOff.json";
import useSound from "use-sound";
import soundOnSfx from "../sfx/soundOn.wav";
import soundOffSfx from "../sfx/soundOff.wav";
import clairDeLune from "../sfx/clairDeLune.mp3";
import { Howl, Howler } from "howler";

const leftLine = styles.leftLine;
const rightLine = styles.rightLine;
const logo = styles.logo;
const box = styles.box;
const socialIcon = styles.socialIcon;
const soundAnimationContainer = styles.soundAnimationContainer;
const { useState, useEffect } = React;

const playOn = new Howl({
  src: [soundOnSfx],
  volume: 0.25,
});

const playOff = new Howl({
  src: [soundOffSfx],
  volume: 0.25,
});

const clairDeLuneSfx = new Howl({
  src: [clairDeLune],
  volume: 0.75,
});

export default function IndexPage() {
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
