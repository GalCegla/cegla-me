import { Box, Button } from "@material-ui/core";
import PostForm from "components/PostForm";
import { Formik } from "formik";
import React, { FC, useCallback } from "react";
import { Post } from "types/post";
import { gql, useMutation } from "@apollo/client";
import { createPost, createPostVariables } from "__generated__/createPost";
import { PostCreateInput } from "__generated__/globalTypes";
import { useRouter } from "next/router";

const INITIAL_VALUES: Post = {
  title: "",
  subtitle: "",
  body: "",
  shopId: "",
};

const AddPage: FC = () => {
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
  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      {(formik) => (
        <Box>
          <PostForm />
          <Button
            onClick={formik.submitForm}
            disabled={formik.isSubmitting}
            variant="outlined"
          >
            SAVE
          </Button>
        </Box>
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
  const { title, subtitle, body, shopId } = values;
  return {
    title,
    subtitle,
    body,
    shop: {
      connect: {
        id: shopId,
      },
    },
  };
}
