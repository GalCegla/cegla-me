import styled from "@emotion/styled";
import { Box, Typography } from "@material-ui/core";
import { FC } from "react";

const AboutSection: FC = () => {
  return (
    <Container>
      <ProfilePictureBox>
        <Picture src="/profile-picture.png" />
        <img
          src="/fold.png"
          style={{ right: 13, bottom: 13, width: "46px", position: "absolute" }}
        />
      </ProfilePictureBox>
      <Typography
        variant="caption"
        style={{
          fontFamily: "Rubik",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        CoffeeTLV is a both a coffee-centric magazine and a child project by me,
        Gal Cegla, a coffee liker (I'm no expert) born and raised in Tel Aviv
        (loves takeaway cups, hates global warming). This is just a place where
        I express my personal opinion and is an overall review of coffee shops -
        considering both the coffee itself but also the vibe!
      </Typography>
      <RatingLegendBox>
        <Typography
          variant="body2"
          style={{ marginBottom: "30px", fontFamily: "Rubik" }}
        >
          Rating System Legend
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
          }}
        >
          <RateBox>
            <LogoBox>
              <img style={{ width: "25px", height: "34px" }} src="/GOOD.png" />
            </LogoBox>
            <Typography variant="caption" style={{ fontFamily: "Rubik" }}>
              GREAT
            </Typography>
          </RateBox>
          <RateBox>
            <LogoBox>
              <img style={{ width: "31px", height: "34px" }} src="/OK.png" />
            </LogoBox>
            <Typography variant="caption" style={{ fontFamily: "Rubik" }}>
              PRETTY GOOD
            </Typography>
          </RateBox>
          <RateBox>
            <LogoBox>
              <img style={{ width: "42px", height: "31px" }} src="/BAD.png" />
            </LogoBox>
            <Typography variant="caption" style={{ fontFamily: "Rubik" }}>
              MEH
            </Typography>
          </RateBox>
        </Box>
        <HeaderLogo src="/header.png" />
      </RatingLegendBox>
    </Container>
  );
};

export default AboutSection;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  margin-top: 70px;
`;

const ProfilePictureBox = styled(Box)`
  padding: 14px;
  border: 1.5px solid #b63719;
  width: 141px;
  height: 146px;
  margin-bottom: 50px;
  position: relative;
`;

const Picture = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

const RatingLegendBox = styled(Box)`
  border: 1.5px solid #b63719;
  padding: 12px;
  position: relative;
  height: 230px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RateBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  margin-bottom: 10px;

  & > * {
    margin-right: 20px;
  }
`;

const HeaderLogo = styled.img`
  height: 65px;
  position: absolute;
  bottom: -30px;
`;

const LogoBox = styled(Box)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
