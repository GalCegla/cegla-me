import styled from "@emotion/styled";
import { Box } from "@material-ui/core";
import { FC } from "react";
import { Rating } from "__generated__/globalTypes";

type PostThumbnailProps = {
  thumbnail: string;
  rating: Rating;
};

const PostThumbnail: FC<PostThumbnailProps> = ({ thumbnail, rating }) => {
  const ratingIcon = `/${rating}.png`;
  return (
    <Container>
      <img
        src={thumbnail}
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
      <img
        src="/fold.png"
        style={{ position: "absolute", right: 0, bottom: 0, width: "46px" }}
      />
      <img
        src={ratingIcon}
        style={{ position: "absolute", right: 2, bottom: 2, width: "20px" }}
      />
    </Container>
  );
};

export default PostThumbnail;

const Container = styled(Box)`
  width: 128px;
  height: 85px;
  position: relative;
`;
