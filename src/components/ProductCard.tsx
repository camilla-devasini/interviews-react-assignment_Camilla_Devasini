import { Card, CardContent, CardMedia } from "@mui/material";
import { Product } from "../services/products/types/types";
import { CardTitle } from "./atoms/CardTitle";
import { CardDescription } from "./atoms/CardDescription";
import { CardFooter } from "./atoms/CardFooter";

type ProductCardProps = {
  product: Product;
  addToCart: (id: number, quantity: number) => void;
};

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Card key={product.id} style={{ width: "100%" }} data-testid="product-card">
      <CardMedia component="img" height="150" image={product.imageUrl} />
      <CardContent>
        <CardTitle title={product.name} />
        <CardDescription
          description={
            product.description ??
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          }
        />
      </CardContent>
      <CardFooter details={product} action={addToCart} />
    </Card>
  );
}
