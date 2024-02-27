import { FC } from "react";
import {
  Box,
  CardActions,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { CardFooterProps, Cart, Product } from "../../services/shopping/types";
import { useCart } from "../../utils/hooks/useShoppingCart";

export const CardFooter: FC<CardFooterProps> = ({
  details,
  addItem,
  removeItem,
}) => {
  const { cart } = useCart();

  function getProductQuantity(cart: Cart, details: Product) {
    const matchingProducts = cart.items.filter(
      (product) => product.id === details.id
    );
    return matchingProducts.length;
  }

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
          aria-label="delete"
          size="small"
          onClick={() => removeItem(details)}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography variant="body1" component="div" mx={1}>
          {getProductQuantity(cart, details)}
        </Typography>

        <IconButton
          aria-label="add"
          size="small"
          onClick={() => addItem(details)}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>
    </CardActions>
  );
};
