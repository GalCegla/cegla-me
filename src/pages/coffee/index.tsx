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
import ReactMarkdown from "react-markdown";
import PostCard from "components/PostCard";

const IndexPage: FC = () => {
  const { data, error, loading } = useQuery<getPosts>(GET_POSTS);
  const posts = data?.posts;
  console.log(data);
  if (loading) {
    return null;
  }
  if (error) {
    console.log("Yo! " + error.message);
  }
  return (
    <Container>
      <Global
        styles={css`
          body {
            background-color: #e2a05589;
          }
        `}
      />
      <TitleContainer>
        <Typography variant="h3">Kafe</Typography>
        <Image
          src="/coffeeIcon.png"
          width="100"
          height="100"
          alt="Coffee Bean"
        />
        <Typography variant="h3">TLV</Typography>
      </TitleContainer>
      {posts ? (
        posts.map((post) => {
          return <PostCard post={post} />;
        })
      ) : (
        <Typography>Nothing here yet!</Typography>
      )}
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

const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
`;
