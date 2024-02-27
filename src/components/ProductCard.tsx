import { Card, CardContent, CardMedia } from "@mui/material";
import { ProductCardProps } from "../services/shopping/types";
import { CardTitle } from "./atoms/CardTitle";
import { CardDescription } from "./atoms/CardDescription";
import { CardFooter } from "./atoms/CardFooter";

export default function ProductCard({
  product,
  addItem,
  removeItem,
}: ProductCardProps) {
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
      <CardFooter details={product} addItem={addItem} removeItem={removeItem} />
    </Card>
  );
}
