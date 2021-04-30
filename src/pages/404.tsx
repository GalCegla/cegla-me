import React, { FC } from "react";
import { Link } from "gatsby";
import Container_404 from "../components/404-Container";


const Not_Found: FC = () => {
  return (
    <Container_404>
      <h1>How'd YOU get here?</h1>
      <Link to="/">Go back?</Link>
    </Container_404>
  );
}

export default Not_Found