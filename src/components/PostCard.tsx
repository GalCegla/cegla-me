import styled from "@emotion/styled";
import {
  CardActionArea,
  CardContent,
  Typography,
  Card as MuiCard,
} from "@material-ui/core";
import WordSlicer from "lib/word-slicer";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import react, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { getPosts_posts } from "__generated__/getPosts";

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
  return (
    <StyledCard onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <CardTitle variant="h5">{post.title}</CardTitle>
          <CardSubtitle variant="body1">{post.subtitle}</CardSubtitle>
          <CardBody variant="body2" color="textSecondary">
            <ReactMarkdown>{WordSlicer(post.body)}</ReactMarkdown>
          </CardBody>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default PostCard;

const StyledCard = styled(MuiCard)`
  width: 25%;
`;

const CardTitle = styled(Typography)`
  margin-bottom: 0 !important;
`;
const CardSubtitle = styled(Typography)``;
const CardBody = styled(Typography)`
  margin-top: 10px !important;
`;
