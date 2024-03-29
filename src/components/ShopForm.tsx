import { Form, Formik } from "formik";
import React, { FC, useCallback } from "react";
import TextField from "components/TextField";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createShop, createShopVariables } from "__generated__/createShop";
import styled from "@emotion/styled";
import { getShops_shops } from "__generated__/getShops";

type Values = {
  name: string;
};
const INITIAL_VALUES: Values = {
  name: "",
};

type ShopFormProps = {
  open: boolean;
  onClose: () => void;
  shops: getShops_shops[] | undefined;
};

const ShopForm: FC<ShopFormProps> = ({ open, onClose, shops }) => {
  const [createShop] = useMutation<createShop, createShopVariables>(
    CREATE_SHOP
  );
  const shopNames = shops && shops.map((shop) => shop.name);
  const onSubmit = useCallback(
    (values: Values) => {
      if (shopNames && shopNames.includes(values.name)) {
        return onClose();
      } else {
        return createShop({
          variables: {
            data: values,
          },
        }).then(() => onClose());
      }
    },
    [shops, shopNames]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Formik onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
          {(formik) => {
            return (
              <StyledForm>
                <TextField variant="outlined" name="name" label="Shop" />
                <Button
                  onClick={formik.submitForm}
                  disabled={formik.isSubmitting}
                  variant="outlined"
                >
                  SAVE
                </Button>
              </StyledForm>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ShopForm;

const CREATE_SHOP = gql`
  mutation createShop($data: ShopCreateInput!) {
    createOneShop(data: $data) {
      id
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
