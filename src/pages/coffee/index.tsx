import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Typography } from "@material-ui/core";
import styled from "@emotion/styled";
import { getPosts } from "__generated__/getPosts";
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
          @import url("https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400&family=Rubik:wght@300;400&display=swap");

          body {
            background-color: #f7f6f5;
          }
        `}
      />
      <HeadPost post={posts[posts.length - 1]} />
      {posts.map((post) => {
        return <PostCard post={post} />;
      })}
      <Typography
        style={{ position: "absolute", bottom: "0", color: "lightgray" }}
        variant="caption"
      >
        Design by Guy Einhorn, Dev & content by your's truly
      </Typography>
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
