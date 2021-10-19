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
          return (
            <StyledCard>
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

const StyledCard = styled(Card)`
  width: 25%;
`;

const CardTitle = styled(Typography)`
  margin-bottom: 0 !important;
`;
const CardSubtitle = styled(Typography)``;
const CardBody = styled(Typography)`
  margin-top: 10px !important;
`;

function WordSlicer(body: string): string {
  if (body[30] === " ") {
    return body.slice(0, 30) + "...";
  } else if (body.length < 30) {
    return body;
  }
  for (let i = 0; i <= body.length; i++) {
    if (i >= 29 && body[i] === " ") {
      const slicedBody = body.slice(0, i) + "...";
      return slicedBody;
    }
  }
  return "No content found :(";
}
