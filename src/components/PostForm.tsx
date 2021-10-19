import styled from "@emotion/styled";
import { Form } from "formik";
import React, { FC, useCallback, useState } from "react";
import TextField from "./TextField";
import { gql, useQuery } from "@apollo/client";
import { getShops } from "__generated__/getShops";
import Select from "./Select";
import { Button } from "@material-ui/core";
import MarkdownEditor from "./MarkdownEditor";
import ShopForm from "./ShopForm";

const PostForm: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, refetch } = useQuery<getShops>(GET_SHOPS);

  const shops = data?.shops;

  const handleClose = useCallback(() => {
    refetch();
    setOpenDialog(false);
    console.log(openDialog);
  }, []);

  const onClick = useCallback(() => {
    return setOpenDialog(true);
  }, []);

  return (
    <StyledForm>
      <TextField name="title" label="title" variant="outlined" />
      <TextField name="subtitle" label="subtitle" variant="outlined" />
      <Select name="shopId" shops={shops} />
      <Button variant="outlined" onClick={onClick}>
        ADD SHOP
      </Button>
      <MarkdownEditor height="500px" width="700px" name="body" />
      <ShopForm open={openDialog} onClose={handleClose} />
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
  width: 100%;
  align-items: center;

  & > * {
    margin-bottom: 20px !important;
  }
`;
