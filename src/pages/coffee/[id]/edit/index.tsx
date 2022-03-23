import { Button, Card, CardContent, TextField } from "@material-ui/core";
import PostForm from "components/PostForm";
import { Formik } from "formik";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Post } from "types/post";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PostUpdateInput, Rating } from "__generated__/globalTypes";
import { useRouter } from "next/router";
import { getFullPost } from "__generated__/getFullPost";
import { updatePost, updatePostVariables } from "__generated__/updatePost";

const INITIAL_VALUES: Post = {
  title: "",
  subtitle: "",
  body: "",
  shopId: "",
  rating: Rating.GOOD,
  thumbnail: "",
};

const EditPage: FC = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const id = router.query.id as string;

  if (!id) {
    return null;
  }

  const { data, error } = useQuery<getFullPost>(GET_FULL_POST, {
    variables: { id },
  });

  if (error || !data?.post) {
    return null;
  }

  const [updatePost] = useMutation<updatePost, updatePostVariables>(
    UPDATE_POST
  );

  const initialValues: Post = useMemo(() => {
    if (!data.post) {
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

  const onSubmit = useCallback((values) => {
    return updatePost({
      variables: {
        data: ValuesToInput(values),
        where: {
          id,
        },
      },
    }).then(() => router.push("/coffee"));
  }, []);

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
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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

export const UPDATE_POST = gql`
  mutation updatePost($data: PostUpdateInput!, $where: PostWhereUniqueInput!) {
    updateOnePost(data: $data, where: $where) {
      id
    }
  }
`;

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

function ValuesToInput(values: Post): PostUpdateInput {
  const { title, subtitle, body, shopId, rating, thumbnail } = values;

  return {
    title: { set: title },
    subtitle: { set: subtitle },
    body: { set: body },
    shop: {
      connect: {
        id: shopId,
      },
    },
    rating: { set: rating },
    thumbnail: { set: thumbnail || "" },
  };
}
