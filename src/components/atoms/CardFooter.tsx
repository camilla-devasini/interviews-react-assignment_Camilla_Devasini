import { FC } from "react";
import {
  Box,
  CardActions,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Product } from "../../services/products/types/types";

interface CardFooterProps {
  details: Product;
  action: (id: number, value: number) => void;
}

export const CardFooter: FC<CardFooterProps> = ({ details, action }) => {
  return (
    <CardActions>
      <Typography variant="h6" component="div">
        ${details.price}
      </Typography>
      <Box flexGrow={1} />
      <Box
        position="relative"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          textAlign="center"
        >
          {details.loading && <CircularProgress size={20} />}
        </Box>
        <IconButton
          disabled={details.loading}
          aria-label="delete"
          size="small"
          onClick={() => action(details.id, -1)}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography variant="body1" component="div" mx={1}>
          {details.itemInCart || 0}
        </Typography>

        <IconButton
          disabled={details.loading}
          aria-label="add"
          size="small"
          onClick={() => action(details.id, 1)}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>
    </CardActions>
  );
};
