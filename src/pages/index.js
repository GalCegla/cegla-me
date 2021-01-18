import * as React from "react";
import indexHeader from "../components/index-components";
import styles from "../components/index-components.module.css";
import icon from "./images/icon.png";
import gitHubLogo from "./images/gitHubLogo.png";

const leftLine = styles.leftLine;
const rightLine = styles.rightLine;
const logo = styles.logo;
const box = styles.box;
const socialIcon = styles.socialIcon;

export default function indexPage() {
  return (
    <div>
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
