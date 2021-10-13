import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Icon,
  Typography,
} from "@material-ui/core";
import styled from "@emotion/styled";
import { getPosts } from "__generated__/getPosts";
//import { coffeeIcon } from "../../../pub";
import Image from "next/image";

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
      <Image src="/coffeeIcon.png" width="100" height="100" alt="Coffee Bean" />
      {posts ? (
        posts.map((post) => {
          return (
            <StyledCard>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.body.length > 30
                      ? post.body.slice(0, 30) + "..."
                      : post.body}
                  </Typography>
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

const StyledCard = styled(Card)`
  width: 30%;
`;

const StyledLogo = styled(Image)`
  color: black;
`;
