import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Divider, Typography } from "@material-ui/core";
import styled from "@emotion/styled";
import { getPosts } from "__generated__/getPosts";
import { css, Global } from "@emotion/react";
import PostCard from "components/PostCard";
import HeadPost from "components/HeadPost";
import AboutSection from "components/AboutSection";
import { Helmet } from "react-helmet";

const IndexPage: FC = () => {
  const { data, error, loading } = useQuery<getPosts>(GET_POSTS);
  const posts = data?.posts;

  if (loading || !posts) {
    console.log(loading ? "loading" : "no posts");
    return null;
  }
  console.log(posts);
  if (posts.length === 0) {
    return <Typography>Nothing here yet!</Typography>;
  }

  if (error) {
    console.log("Yo! " + error.message);
  }
  return (
    <Container>
      <Helmet>
        <link rel="shortcut icon" href="/BAD.png" />
      </Helmet>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400&family=Rubik:wght@300;400&display=swap");

          body {
            background-color: #f7f6f5;
          }
        `}
      />
      <HeadPost post={posts[0]} />
      <PostsContainer>
        {posts.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </PostsContainer>
      <StyledDivider
        style={{
          backgroundColor: "#E96F51",
          width: "620px",
          marginTop: "50px",
        }}
      />
      <AboutSection />
      <Typography
        style={{
          color: "lightgray",
          marginTop: "80px",
        }}
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
    posts(orderBy: { createdAt: desc }) {
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
  margin-top: 80px;
  & > * {
    margin-bottom: 10px;
  }
  align-items: center;
`;

const PostsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const StyledDivider = styled(Divider)`
  @media (max-width: 744px) {
    width: 70% !important;
  }
`;
