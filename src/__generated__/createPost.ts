/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createOnePost {
  __typename: "Post";
  id: string;
}

export interface createPost {
  createOnePost: createPost_createOnePost;
}

export interface createPostVariables {
  data: PostCreateInput;
}
