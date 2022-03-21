import styled from "@emotion/styled";
import { Box } from "@material-ui/core";
import DEFAULT_THUMBNAIL from "consts/defaultThumbnail";
import { FC } from "react";
import { Post } from "types/post";
import PostThumbnail, { Size } from "./PostThumbnail";

type HeadPostProps = { post: Post };

const HeadPost: FC<HeadPostProps> = ({ post }) => {
  return (
    <Container>
      <PostThumbnail
        size={Size.LARGE}
        rating={post.rating}
        thumbnail={post.thumbnail || DEFAULT_THUMBNAIL}
      />
      <HeaderLogo src="/header.png" />
    </Container>
  );
};

export default HeadPost;

const Container = styled(Box)`
  padding: 16px;
  border: 1.5px solid #b63719;
  margin: 35px;
  margin-top: 50px;
  width: 305px;
  height: 230px;
  position: relative;
  margin-bottom: 50px;
`;

const HeaderLogo = styled.img`
  height: 65px;
  position: absolute;
  top: -51px;
  left: -17px;
`;
