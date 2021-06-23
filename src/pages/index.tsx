import styled from "@emotion/styled";
import { icon, gitHubLogo } from "../images";
import lottie from "lottie-web";
import { bothAnim } from "../animations/index";
import { soundOn, soundOff, clairDeLune } from "../../src/sfx";
import { Howl } from "howler";
import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import { Box, BoxProps, Button, ButtonBase } from "@material-ui/core";
import { Link } from "gatsby";
import { ColorPicker, Color, ColorBox, ColorBoxProps } from "material-ui-color";

const playOn = new Howl({
  src: soundOn,
  volume: 0.25,
});

const playOff = new Howl({
  src: soundOff,
  volume: 0.25,
});

const clairDeLuneSfx = new Howl({
  src: clairDeLune,
  volume: 0.75,
});

const IndexPage: FC = () => {
  const [animationState, setAnimationState] = useState("");
  const [pickedColor, setPickedColor] = useState<Color>();
  const [isColorBoxOpen, setIsColorBoxOpen] = useState<boolean>(false);
  const animationContainerRef = useRef<HTMLDivElement>();
  const animationRef = useRef();

  const loadAnimation = lottie.loadAnimation({
    container: animationContainerRef.current as Element,
    animationData: bothAnim,
    renderer: "svg",
    loop: false,
    autoplay: false,
  });

  useEffect(() => {
    if (animationState === "on") {
      loadAnimation.playSegments([30, 50], true);
    } else if (animationState === "off") {
      loadAnimation.playSegments([85, 110], true);
    }
  }, [animationState, animationRef, loadAnimation]);

  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("clicked");
    if (animationState === "off" || animationState === "") {
      setAnimationState("on");
      playOn.play();
      clairDeLuneSfx.play();
    } else if (animationState === "on") {
      setAnimationState("off");
      playOff.play();
      clairDeLuneSfx.pause();
    }
  }, [animationState, setAnimationState]);

  const handleColorChange = useCallback((color) => {
    setPickedColor(color);
  }, [setPickedColor]);

  const handleLogoClick = useCallback(() => {setIsColorBoxOpen(true)}, []);

  useEffect(() => {
    document.title = "Gal Cegla's Space";
  }, []);

  return (
    <StyledContainer pickedColor={pickedColor}>
       {isColorBoxOpen ? <StyledColorBox onChange={handleColorChange} value={pickedColor} isOpen={isColorBoxOpen} /> : null}
      <StyledHeaderContainer>
        <StyledLine />
        <ButtonBase onClick={handleLogoClick}>
        <StyledLogo src={icon} alt="Logo" />
        </ButtonBase>
        <StyledLine />
      </StyledHeaderContainer>
      <Link to="https://github.com/galcegla/" className="StyledButton" target="_blank">
        <StyledButton>
          <StyledIcon src={gitHubLogo} alt="GitHub Icon" />
        </StyledButton>
      </Link>
    </StyledContainer>
  );
};

export default IndexPage;

type NewBoxProps = BoxProps & {pickedColor: string}

const StyledContainer = styled<FC<NewBoxProps>>(Box)`
  display: flex;
  flex-direction: column;
  background: ${({pickedColor}) => pickedColor};
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  height: 80px;
  width: 80px;
`;
const StyledIcon = styled.img`
  height: 40px;
  width: 40px;
`;

const StyledHeaderContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 8px;
  margin-bottom: 42px;

  & > * {
    margin: 0 6px;
  }
`;

const StyledLine = styled(Box)`
  border: 1px solid #8d427c;
  background-color: #8d427c;
  border-radius: 50px;
  height: 6px;
  width: 120px;
`;

const StyledButton = styled(Button)`
  background: #ffdae6;
  align-items: center;
  border-radius: 100%;
  width: 70px;
  height: 70px;
`;

const StyledColorBox = styled<FC<ColorBoxProps & {isOpen: boolean}>>(ColorBox)`
  position: fixed;
  margin-top: 60px;

  transition: opacity 1s;

  opacity: ${({isOpen}) => isOpen ? `100` : `0`};

`;