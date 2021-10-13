import styled from "@emotion/styled";
import TextField from "components/TextField";
import { Form, Formik } from "formik";
import React, { FC, useCallback } from "react";
import { Post } from "types/post";

const INITIAL_VALUES: Post = {
  title: "",
  subtitle: "",
  body: "",
  shop: {
    id: "",
  },
};

const AddPage: FC = () => {
  const onSubmit = useCallback(() => {
    return null;
  }, []);
  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      {(formik) => (
        <StyledForm>
          <TextField name="title" label="title" variant="outlined" />
          <TextField name="subtitle" label="subtitle" variant="outlined" />
          <TextField name="body" label="body" variant="outlined" minRows={10} />
        </StyledForm>
      )}
    </Formik>
  );
};

export default AddPage;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px;
  }
`;
