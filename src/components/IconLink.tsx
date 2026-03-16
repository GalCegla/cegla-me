import styled from "@emotion/styled";
import { Button, Link } from "@material-ui/core";
import { FC } from "react";

type IconLinkProps = {
  href: string;
  imgSrc: string;
  width?: string;
  height?: string;
};

const IconLink: FC<IconLinkProps> = ({ href, imgSrc, width, height }) => {
  return (
    <Link href={href} target="_blank">
      <StyledButton>
        <StyledIcon
          width={width || "40"}
          height={height || "40"}
          src={imgSrc}
          // alt="GitHub Icon"
        />
      </StyledButton>
    </Link>
  );
};

export default IconLink;

const StyledButton = styled(Button)`
  background: #ffdae6;
  align-items: center;
  border-radius: 100%;
  width: 70px;
  height: 70px;
`;

const StyledIcon = styled.img``;
