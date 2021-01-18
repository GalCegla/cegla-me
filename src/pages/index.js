import * as React from "react";
import indexHeader from "../components/index-components";
import styles from "../components/index-components.module.css";
import icon from "./images/icon.png";

const leftLine = styles.leftLine;
const rightLine = styles.rightLine;
const logo = styles.logo;

export default function indexPage() {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className={leftLine} />
      <img className={logo} src={icon} alt="Logo" />
      <div className={rightLine} />
    </div>
  );
}
