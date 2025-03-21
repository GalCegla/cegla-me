import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import PostForm from "components/PostForm";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { INITIAL_VALUES } from "pages/coffee/add";
import { FC, useCallback, useMemo, useState } from "react";
import { Post } from "types/post";
import { getFullPost } from "__generated__/getFullPost";
import { PostUpdateInput } from "__generated__/globalTypes";
import { updatePostVariables, updatePost } from "__generated__/updatePost";

const EditPage: FC = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const [password, setPassword] = useState("");

  const { data } = useQuery<getFullPost>(GET_FULL_POST, {
    variables: { id: postId },
  });

  const [updatePost] = useMutation<updatePost, updatePostVariables>(
    UPDATE_POST
  );

  const initialValues: Post = useMemo(() => {
    if (!data?.post) {
      return INITIAL_VALUES;
    }
    const { title, thumbnail, body, rating, shop, subtitle } = data.post;
    return {
      title,
      thumbnail: thumbnail || "",
      body,
      rating,
      shopId: shop.id,
      subtitle,
    };
  }, [data]);

  const handleSubmit = useCallback(
    (values) =>
      updatePost({
        variables: { data: ValuesToInput(values), id: postId },
      }).then(() => router.push("/coffee")),
    [router]
  );

  const handlePasswordChange = useCallback(
    (event) => setPassword(event.target.value),
    []
  );

  if (password !== process.env.NEXT_PUBLIC_PASSWORD) {
    return (
      <Card>
        <CardContent>
          <TextField value={password} onChange={handlePasswordChange} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Card>
          <CardContent>
            <PostForm />
            <Button
              onClick={formik.submitForm}
              disabled={formik.isSubmitting}
              variant="outlined"
            >
              SAVE
            </Button>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};
export default EditPage;

export const GET_FULL_POST = gql`
  query getFullPost($id: String!) {
    post(where: { id: $id }) {
      title
      subtitle
      body
      shop {
        id
      }
      rating
      thumbnail
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($data: PostUpdateInput!, $id: String!) {
    updateOnePost(data: $data, where: { id: $id }) {
      id
    }
  }
`;

function ValuesToInput(values: Post): PostUpdateInput {
  const { title, subtitle, body, shopId, rating, thumbnail } = values;

  return {
    title,
    subtitle,
    body,
    shop: {
      connect: {
        id: shopId,
      },
    },
    rating,
    thumbnail: thumbnail || "",
  };
}
