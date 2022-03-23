import { Button, Card, CardContent, TextField } from "@material-ui/core";
import PostForm from "components/PostForm";
import { Formik } from "formik";
import React, { FC, useCallback, useState } from "react";
import { Post } from "types/post";
import { gql, useMutation } from "@apollo/client";
import { createPost, createPostVariables } from "__generated__/createPost";
import { PostCreateInput, Rating } from "__generated__/globalTypes";
import { useRouter } from "next/router";

export const INITIAL_VALUES: Post = {
  title: "",
  subtitle: "",
  body: "",
  shopId: "",
  rating: Rating.GOOD,
  thumbnail: "",
};

const AddPage: FC = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [createPost] = useMutation<createPost, createPostVariables>(
    CREATE_POST
  );
  const onSubmit = useCallback((values) => {
    return createPost({
      variables: {
        data: ValuesToInput(values),
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
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
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

export default AddPage;

export const CREATE_POST = gql`
  mutation createPost($data: PostCreateInput!) {
    createOnePost(data: $data) {
      id
    }
  }
`;

function ValuesToInput(values: Post): PostCreateInput {
  const { title, subtitle, body, shopId, rating, thumbnail } = values;
  if (!rating) {
    throw new Error("Rating must be defined");
  }
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
