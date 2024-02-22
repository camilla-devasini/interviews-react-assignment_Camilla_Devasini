import { FC } from "react";
import { Typography } from "@mui/material";

interface CardDescriptionProps {
  description: string;
}

export const CardDescription: FC<CardDescriptionProps> = ({ description }) => {
  return (
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  );
};
