import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../components/ProductCard";

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  root: Element | null = null;
  rootMargin: string = "";
  thresholds: number[] = [];
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

describe("Products", () => {
  test("given products, renders at least one product card", () => {
    // Mocked data for the products prop
    const products = [
      {
        id: 0,
        name: "Product 1",
        imageUrl: "",
        price: 10,
        description: "Description",
        category: "Category 1",
        itemInCart: 0,
        loading: false,
      },
      {
        id: 1,
        name: "Product 2",
        imageUrl: "",
        price: 20,
        description: "Description",
        category: "Category 2",
        itemInCart: 0,
        loading: false,
      },
    ];

    // Mocked data for the functions
    const addItem = jest.fn();
    const removeItem = jest.fn();

    const { getAllByTestId } = render(
      <ProductCard
        product={products[0]}
        addItem={addItem}
        removeItem={removeItem}
      />
    );

    const productCards = getAllByTestId("product-card");

    expect(productCards.length).toBeGreaterThanOrEqual(1);
  });
});
