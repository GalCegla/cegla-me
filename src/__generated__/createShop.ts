/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createShop
// ====================================================

export interface createShop_createOneShop {
  __typename: "Shop";
  id: string;
}

export interface createShop {
  createOneShop: createShop_createOneShop;
}

export interface createShopVariables {
  data: ShopCreateInput;
}
