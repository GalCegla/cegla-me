import * as React from "react";
import styles from "../components/index-components.module.css";
import icon from "./images/icon.png";
import gitHubLogo from "./images/gitHubLogo.png";
import lottie from "lottie-web";
import bothAnim from "../animations/bothAnim.json";

const leftLine = styles.leftLine;
const rightLine = styles.rightLine;
const logo = styles.logo;
const box = styles.box;
const socialIcon = styles.socialIcon;
const soundAnimationContainer = styles.soundAnimationContainer;

const { useState, useEffect } = React;

export default function IndexPage() {
  const [animationState, setAnimationState] = useState("");
  //const [shouldPlay, setShouldPlay] = useState(true);
  let animationContainer = React.createRef();

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: bothAnim,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });
    if (animationState === "on") {
      animation.playSegments([30, 50], true);
    } else if (animationState === "off") {
      animation.playSegments([85, 110], true);
    }
  });

  const handleClick = () => {
    if (animationState === "off" || animationState === "") {
      setAnimationState("on");
    } else if (animationState === "on") {
      setAnimationState("off");
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
