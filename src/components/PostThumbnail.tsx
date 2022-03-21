import styled from "@emotion/styled";
import { Box } from "@material-ui/core";
import { FC } from "react";
import { Rating } from "__generated__/globalTypes";

export enum Size {
  SMALL = "small",
  LARGE = "large",
}

const SIZE_CHART = {
  small: {
    container: {
      width: "128px",
      height: "85px",
    },
    fold: {
      width: "46px",
    },
    ratingIcon: {
      width: "20px",
    },
  },
  large: {
    container: {
      width: "295px",
      height: "220px",
    },
    fold: {
      width: "80px",
    },
    ratingIcon: {
      width: "35px",
    },
  },
};

type PostThumbnailProps = {
  thumbnail: string;
  rating: Rating;
  size?: Size;
};

const PostThumbnail: FC<PostThumbnailProps> = ({
  thumbnail,
  rating,
  size = Size.SMALL,
}) => {
  const ratingIcon = `/${rating}.png`;
  const currentSize = SIZE_CHART[size];

  return (
    <Container sx={{ ...currentSize.container }}>
      <img
        src={thumbnail}
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
      <img
        src="/fold.png"
        style={{
          position: "absolute",
          right: -1,
          bottom: -1,
          width: currentSize.fold.width,
        }}
      />
      <img
        src={ratingIcon}
        style={{
          position: "absolute",
          right: 2,
          bottom: 2,
          width: currentSize.ratingIcon.width,
        }}
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
