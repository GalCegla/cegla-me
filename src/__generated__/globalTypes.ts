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

export interface PostCreateManyShopInput {
  body: string;
  createdAt?: any | null;
  id?: string | null;
  subtitle: string;
  title: string;
  updatedAt?: any | null;
}

export interface PostCreateManyShopInputEnvelope {
  data?: PostCreateManyShopInput[] | null;
  skipDuplicates?: boolean | null;
}

export interface PostCreateNestedManyWithoutShopInput {
  connect?: PostWhereUniqueInput[] | null;
  connectOrCreate?: PostCreateOrConnectWithoutShopInput[] | null;
  create?: PostCreateWithoutShopInput[] | null;
  createMany?: PostCreateManyShopInputEnvelope | null;
}

export interface PostCreateOrConnectWithoutShopInput {
  create: PostCreateWithoutShopInput;
  where: PostWhereUniqueInput;
}

export interface PostCreateWithoutShopInput {
  body: string;
  createdAt?: any | null;
  id?: string | null;
  subtitle: string;
  title: string;
  updatedAt?: any | null;
}

export interface PostWhereUniqueInput {
  id?: string | null;
}

export interface ShopConnectNestedOne {
  connect: ShopWhereUniqueInput;
}

export interface ShopCreateInput {
  createdAt?: any | null;
  id?: string | null;
  name: string;
  posts?: PostCreateNestedManyWithoutShopInput | null;
  updatedAt?: any | null;
}

export interface ShopWhereUniqueInput {
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
