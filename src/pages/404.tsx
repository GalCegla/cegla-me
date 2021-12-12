import React, { FC } from "react";
import Link from "next/link";
import { Box } from "@material-ui/core";

const Not_Found: FC = () => {
  return (
    <Box>
      <h1>How'd YOU get here?</h1>
      <Link href="/">Go back?</Link>
    </Box>
  );
};

export default Not_Found;
