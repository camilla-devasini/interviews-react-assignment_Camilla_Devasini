import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";
describe("Product Card component", () => {
  it("renders the product card", () => {
    const { getByTestId } = render(
      <ProductCard
        product={{
          id: 0,
          name: "",
          imageUrl: "",
          description: "",
          price: 0,
          category: "",
          itemInCart: 0,
          loading: false,
        }}
        addItem={function (): void {}}
        removeItem={function (): void {}}
      />
    );

    const productCard = getByTestId("product-card");
    expect(productCard).toBeInTheDocument();
  });
});
