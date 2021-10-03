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
import { Post } from ".prisma/client";

const IndexPage: FC = () => {
  const { data } = useQuery(GET_POSTS);
  const posts = data.posts;
  return (
    <Container>
      {posts ? (
        posts.map((post: Post) => {
          return (
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.body.slice(0, 30)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
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
`;
