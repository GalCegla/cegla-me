import styled from "@emotion/styled";
import {
  CardActionArea,
  CardContent,
  Typography,
  Card as MuiCard,
  Box,
} from "@material-ui/core";
import WordSlicer from "lib/word-slicer";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import react, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { getPosts_posts } from "__generated__/getPosts";
import { Rating } from "__generated__/globalTypes";
import PostThumbnail from "./PostThumbnail";

type PostCardProps = {
  post: getPosts_posts;
};

const PostCard: FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const id = post.id;

  const handleClick = useCallback(
    () => router.push(`${router.asPath}/${id}`),
    []
  );

  const createdAt = post.createdAt.slice(0, 10).split("-").reverse().join("/");

  return (
    <Container onClick={handleClick}>
      <PostThumbnail
        thumbnail="https://i.pinimg.com/600x315/d1/fa/b1/d1fab134f215278891d79b59eaf249e8.jpg"
        rating={Rating.OK}
      />
      <ContentContainer>
        <Box>
          <CardTitle variant="h5">
            {post.shop.name}: {post.title}
          </CardTitle>
          <CardSubtitle variant="body1">{post.subtitle}</CardSubtitle>
        </Box>
        <CardDate variant="body2" color="textSecondary">
          {createdAt}
          {/* <ReactMarkdown>{WordSlicer(post.body)}</ReactMarkdown> */}
        </CardDate>
      </ContentContainer>
    </Container>
  );
};

export default PostCard;

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-left: 14px;
`;

const ContentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  justify-content: space-between;
`;

const CardTitle = styled(Typography)`
  margin-bottom: 0 !important;
`;
const CardSubtitle = styled(Typography)``;
const CardDate = styled(Typography)``;
