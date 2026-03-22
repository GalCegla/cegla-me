import { Button, Card, CardContent, TextField } from "@material-ui/core";
import PostForm from "components/PostForm";
import { Formik } from "formik";
import React, { FC, useCallback } from "react";
import { Post } from "types/post";
import { gql, useMutation } from "@apollo/client";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  PostCreateInput,
  Rating,
} from "__generated__/types";
import { useRouter } from "next/router";
import useAdminAuth from "hooks/useAdminAuth";

export const INITIAL_VALUES: Post = {
  title: "",
  subtitle: "",
  body: "",
  shopId: "",
  rating: Rating.Good,
  thumbnail: "",
};

const AddPage: FC = () => {
  const {
    isAuthenticated,
    password,
    error,
    handlePasswordChange,
    handlePasswordSubmit,
  } = useAdminAuth();
  const router = useRouter();
  const [createPost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CREATE_POST);

  const onSubmit = useCallback(
    (values: Post) => {
      return createPost({
        variables: {
          data: ValuesToInput(values),
        },
      }).then(() => router.push("/coffee"));
    },
    [createPost, router],
  );

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent>
          <TextField
            value={password}
            onChange={handlePasswordChange}
            type="password"
            label="Password"
            error={error}
            helperText={error ? "Incorrect password" : ""}
            onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
          />
          <Button onClick={handlePasswordSubmit} variant="outlined">
            Enter
          </Button>
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
