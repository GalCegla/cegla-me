/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface PostCreateInput {
  body: string;
  shop: ShopConnectNestedOne;
  subtitle: string;
  title: string;
}

export interface ShopConnectNestedOne {
  connect: ShopWhereUniqueInput;
}

export interface ShopWhereUniqueInput {
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
