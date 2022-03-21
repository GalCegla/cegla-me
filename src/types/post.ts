import { Rating } from "__generated__/globalTypes";

export type Post = {
  title: string;
  subtitle: string;
  body: string;
  shopId: string;
  rating: Rating | "";
};
