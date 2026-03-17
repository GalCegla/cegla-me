import styled from "@emotion/styled";
import { Form } from "formik";
import React, { FC, useCallback, useMemo, useState } from "react";
import TextField from "./TextField";
import { gql, useQuery } from "@apollo/client";
import { GetShopsQuery, Rating } from "__generated__/types";
import Select, { Option } from "./Select";
import { Button } from "@material-ui/core";
import MarkdownEditor from "./MarkdownEditor";
import ShopForm from "./ShopForm";

export const Ratings: Option[] = [
  {
    value: Rating.Good,
    name: Rating.Good,
  },
  {
    value: Rating.Ok,
    name: Rating.Ok,
  },
  {
    value: Rating.Bad,
    name: Rating.Bad,
  },
];

const PostForm: FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, refetch, loading } = useQuery<GetShopsQuery>(GET_SHOPS);

  const shops: Option[] = useMemo(
    () =>
      data
        ? data.shops.map((shop) => ({
            value: shop.id,
            name: shop.name,
          }))
        : [],
    [data],
  );

  const handleClose = useCallback(() => {
    refetch();
    setOpenDialog(false);
  }, []);

  const onClick = useCallback(() => {
    return setOpenDialog(true);
  }, []);

  return (
    <StyledForm>
      <TextField name="title" label="title" />
      <TextField name="subtitle" label="subtitle" />
      <Select name="shopId" options={shops} label="Shop" />
      <Select name="rating" options={Ratings} label="Rating" />
      <Button variant="outlined" onClick={onClick}>
        ADD SHOP
      </Button>
      <MarkdownEditor height="500px" width="700px" name="body" />
      <TextField name="thumbnail" label="thumbnail" />
      <ShopForm open={openDialog} onClose={handleClose} shops={data?.shops} />
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

const StyledForm = styled(Form as any)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  & > * {
    margin-bottom: 20px !important;
  }
`;
