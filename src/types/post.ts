import { Rating } from "__generated__/types";

export type Post = {
  title: string;
  subtitle: string;
  body: string;
  shopId: string;
  rating: Rating;
  thumbnail: string | null;
};
