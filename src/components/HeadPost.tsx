import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@material-ui/core";
import DEFAULT_THUMBNAIL from "consts/defaultThumbnail";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { getPosts_posts } from "__generated__/getPosts";
import PostThumbnail, { Size } from "./PostThumbnail";

type HeadPostProps = {
  post: getPosts_posts;
};

const HeadPost: FC<HeadPostProps> = ({ post }) => {
  const router = useRouter();

  const createdAt = post.createdAt.slice(0, 10).split("-").reverse().join("/");

  const handlePostRedirect = useCallback(
    () => router.push(`${router.asPath}/${post.id}`),
    [router, post]
  );

  return (
    <Container onClick={handlePostRedirect}>
      <ThumbnailContainer>
        <PostThumbnail
          size={Size.LARGE}
          rating={post.rating}
          thumbnail={post.thumbnail || DEFAULT_THUMBNAIL}
        />
        <HeaderLogo src="/header.png" />
        <CatchPhrase>Drink it slow</CatchPhrase>
      </ThumbnailContainer>
      <CreateAt>
        <StyledDate variant="body2">{createdAt}</StyledDate>
        <StyledDivider />
      </CreateAt>
      <StyledShopName variant="h3">{post.shop.name}</StyledShopName>
      <StyledTitle variant="h6">{post.title}</StyledTitle>
    </Container>
  );
};

export default HeadPost;

const ThumbnailContainer = styled(Box)`
  padding: 16px;
  border: 1.5px solid #b63719;
  margin: 35px;
  margin-top: 50px;
  width: 305px;
  height: 230px;
  position: relative;
  margin-bottom: 42px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  cursor: pointer;
`;

const HeaderLogo = styled.img`
  height: 65px;
  position: absolute;
  top: -51px;
  left: -17px;
`;

const CatchPhrase = styled(Typography)`
  position: absolute;
  color: #b63719;
  font-weight: bold !important;
  top: -25px;
  right: 25px;
  font-family: "Readex Pro", sans-serif !important;
  font-weight: 400;
`;

const CreateAt = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const StyledDivider = styled(Divider)`
  background-color: #e76f51 !important;
`;

const StyledDate = styled(Typography)`
  letter-spacing: 1.5px !important;
  margin-bottom: 5px !important;
`;

const StyledShopName = styled(Typography)`
  font-family: "Readex Pro", sans-serif !important;
  font-weight: 200 !important;
`;
const StyledTitle = styled(Typography)`
  font-family: "Rubik", sans-serif !important;
`;
