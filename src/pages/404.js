import * as React from "react";
import { Link } from "gatsby";
import Container_404 from "../components/404-Container";

const Container = Container_404;

export default function Not_Found() {
  return (
    <Container text>
      <h1>How'd YOU get here?</h1>
      <Link to="/">Go back?</Link>
    </Container>
  );
}
