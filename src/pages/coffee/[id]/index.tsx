import react, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { getPost } from "__generated__/getPost";

const PostPage: FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error } = useQuery<getPost>(GET_POST, {
    variables: { id },
  });

  if (error || !data?.post) {
    return null;
  }
  const body = data.post.body;

  return <ReactMarkdown children={body} />;
};

export default PostPage;

export const GET_POST = gql`
  query getPost($id: String!) {
    post(where: { id: $id }) {
      title
      subtitle
      body
    }
  }
`;
