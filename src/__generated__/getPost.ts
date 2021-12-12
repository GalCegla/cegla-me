/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPost
// ====================================================

export interface getPost_post {
  __typename: "Post";
  title: string;
  subtitle: string;
  body: string;
}

export interface getPost {
  post: getPost_post | null;
}

export interface getPostVariables {
  id: string;
}
