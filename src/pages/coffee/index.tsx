import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import styled from "@emotion/styled";
import { getPosts } from "__generated__/getPosts";
import Image from "next/image";
import { css, Global } from "@emotion/react";
import PostCard from "components/PostCard";
import HeadPost from "components/HeadPost";

const IndexPage: FC = () => {
  const { data, error, loading } = useQuery<getPosts>(GET_POSTS);
  const posts = data?.posts;

  if (loading || !posts) {
    return null;
  }

  if (posts.length === 0) {
    return <Typography>Nothing here yet!</Typography>;
  }

  if (error) {
    console.log("Yo! " + error.message);
  }
  return (
    <Container>
      <Global
        styles={css`
          body {
            background-color: #f7f6f5;
          }
        `}
      />
      <HeadPost post={posts[0]} />
      {posts.map((post) => {
        return <PostCard post={post} />;
      })}
    </Container>
  );
};

export default IndexPage;

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      createdAt
      updatedAt
      title
      subtitle
      body
      shopId
      shop {
        id
        name
      }
      rating
      thumbnail
    }
  }
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 10px;
  }
  align-items: center;
`;
