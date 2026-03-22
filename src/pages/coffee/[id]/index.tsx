import react, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GetPostQuery } from "__generated__/types";
import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@material-ui/core";
import PostThumbnail, { Size } from "components/PostThumbnail";
import { Global, css } from "@emotion/react";
import Markdown from "react-markdown";
import { Hourglass } from "react95";

const PostPage: FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error, loading } = useQuery<GetPostQuery>(GET_POST, {
    variables: { id },
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Hourglass size={32} />
      </div>
    );
  }

  if (error || !data?.post) {
    return null;
  }
  const { body, title, subtitle, thumbnail, createdAt, rating } = data.post;

  const date = new Date(createdAt);

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400&family=Rubik:wght@300;400&display=swap");

          body {
            background-color: #f7f6f5;
          }
        `}
      />
      <Container
        style={{ width: "50%", minWidth: "350px", alignSelf: "center" }}
      >
        <Typography
          variant="h2"
          style={{ fontWeight: 400, textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          style={{ fontWeight: 300, textAlign: "center" }}
        >
          {subtitle}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {date.toLocaleDateString()}
        </Typography>
        <Divider style={{ width: "100%", margin: 10 }} />
        <PostThumbnail
          rating={rating}
          thumbnail={thumbnail || ""}
          size={Size.LARGE}
        />
        <Markdown children={body} />
      </Container>
    </Box>
  );
};

export default PostPage;

export const GET_POST = gql`
  query getPost($id: String!) {
    post(where: { id: $id }) {
      title
      subtitle
      body
      thumbnail
      createdAt
      rating
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
