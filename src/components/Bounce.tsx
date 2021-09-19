import styled from "@emotion/styled";
import { Box, BoxProps } from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";

const Bounce: FC = () => {
  const [bottom, setBottom] = useState<number>(-200);
  const [jump, setJump] = useState<boolean>(false);
  const handleBallClick = useCallback(() => {
    setJump(true);
    setBottom((value) => {
      for (let num = value; num < value + 50; num++) {
        return num;
      }
    });
  }, []);
  return (
    <GameContainer>
      <Ball onClick={handleBallClick} jump={jump} />
    </GameContainer>
  );
};

export default Bounce;

const Ball = styled<FC<BoxProps & { jump: boolean }>>(Box)`
  background: red;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  :hover {
    cursor: pointer;
  }
  position: relative;
  bottom: -200px;
  animation-name: jump;
  animation-duration: 1s;
  //animation-play-state: ;

  @keyframes jump {
    0% {
      bottom: -200px;
    }
    50% {
      bottom: -150px;
      animation-timing-function: ease-in-out;
    }
    100% {
      bottom: -200px;
    }
  }
`;

const GameContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 500px;
  align-items: center;
  justify-content: center;
`;
