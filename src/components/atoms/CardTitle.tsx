import { FC } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

interface CardTitleProps {
  title: string;
}

export const CardTitle: FC<CardTitleProps> = ({ title }) => {
  const StyledTypographyTitle = styled(Typography)(() => ({
    "&.MuiTypography-h6": {
      maxWidth: "20rem",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  }));
  return (
    <StyledTypographyTitle gutterBottom variant="h6">
      {title}
    </StyledTypographyTitle>
  );
};
