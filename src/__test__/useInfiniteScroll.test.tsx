import { renderHook } from "@testing-library/react";
import { useInfiniteScroll } from "../utils/hooks/useInfiniteScroll";

// Mock the fetch function
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          products: [
            {
              id: 0,
              name: "",
              imageUrl: "",
              price: 0,
              category: "",
              itemInCart: 0,
              loading: false,
            },
          ],
        }),
    }) as Promise<Response>
);

// Mock the IntersectionObserver
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

describe("useInfiniteScroll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initially loading, have no products and return no error", () => {
    const loadingMoreRef = { current: document.createElement("div") };
    const { result } = renderHook(() => useInfiniteScroll(loadingMoreRef));

    expect(result.current.productsData).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(false);
  });
});
