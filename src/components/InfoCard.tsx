import { Box, BoxProps, Divider, Link, Typography } from "@material-ui/core";
import { FC } from "react";

export type InfoCardProps = BoxProps & {
  dates: string; //Date?
  title: string;
  company: string;
  description: string;
  companyLink?: string;
};

const InfoCard: FC<InfoCardProps> = ({
  dates,
  title,
  company,
  description,
  companyLink,
  ...props
}: InfoCardProps) => {
  return (
    <Box
      style={{
        ...props.style,
        minWidth: "40% !important",
        maxWidth: "65% !important",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          backgroundColor: "darkgrey",
          left: -8,
          bottom: -8,
          width: "100%",
          height: "100%",
          border: "2px solid black",
        }}
      ></Box>
      <Box
        style={{
          position: "relative",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          padding: "10px",
          border: "2px solid black",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">{title}</Typography>
          <Typography
            variant="h4"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            |
          </Typography>
          {companyLink ? (
            <Link href={companyLink} color="textSecondary" target="_blank">
              <Typography variant="h4">{company}</Typography>
            </Link>
          ) : (
            <Typography variant="h4">{company}</Typography>
          )}
        </Box>
        <Typography variant="h6" color="textSecondary">
          {dates}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  );
};

export default InfoCard;
