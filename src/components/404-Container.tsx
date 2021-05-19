import * as React from "react";
import containerStyles from "./404-container.module.css";

export default function Container404({ children }): React.FC {
  return <div className={containerStyles.container_404}>{children}</div>;
}
