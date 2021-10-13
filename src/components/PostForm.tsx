import styled from "@emotion/styled";
import { Form } from "formik";
import React, { FC } from "react";
import TextField from "./TextField";
import { gql, useQuery } from "@apollo/client";
import { getShops } from "__generated__/getShops";
import Select from "./Select";

const PostForm: FC = () => {
  const { data } = useQuery<getShops>(GET_SHOPS);

  const shops = data?.shops;

  return (
    <StyledForm>
      <TextField name="title" label="title" variant="outlined" />
      <TextField name="subtitle" label="subtitle" variant="outlined" />
      <TextField name="body" label="body" variant="outlined" minRows={10} />
      <Select name="shopId" shops={shops} />
    </StyledForm>
  );
};

export default PostForm;

export const GET_SHOPS = gql`
  query getShops {
    shops {
      id
      name
    }
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px !important;
  }
`;
