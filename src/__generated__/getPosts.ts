/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPosts
// ====================================================

export interface getPosts_posts_shop {
  __typename: "Shop";
  id: string;
  name: string;
}

export interface getPosts_posts {
  __typename: "Post";
  id: string;
  createdAt: any;
  updatedAt: any;
  title: string;
  subtitle: string;
  body: string;
  shopId: string;
  shop: getPosts_posts_shop;
}

export interface getPosts {
  posts: getPosts_posts[];
}
