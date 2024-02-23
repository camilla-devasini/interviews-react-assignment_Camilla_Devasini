import { useState, useEffect, useCallback, useRef } from "react";
import { Product } from "../../services/products/types/types";

export const useInfiniteScroll = (
  loadingMoreRef: React.RefObject<HTMLDivElement>
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const count = useRef(0);

  const loadMoreProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/products?page=${page}&limit=24`);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(true);
      console.error("Error fetching products", error);
    }
  }, [page]);

  // I use count as ref to avoid the double execution of loadMoreProducts function when the component mounts in development environment
  useEffect(() => {
    if (count.current === 0) {
      loadMoreProducts();
      count.current++;
    }
  }, []);

  // use of the Intersaction Observer API to detect when an observed element intersects with the viewport, useful when it comes to infinite scrolling
  /** @see  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */

  useEffect(() => {
    const reference = loadingMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        rootMargin: "0px 0px 400px 0px",
        threshold: 1,
      }
    );

    if (reference) {
      observer.observe(reference);
    }
    return () => {
      if (reference) {
        observer.unobserve(reference);
      }
    };
  }, [loadingMoreRef, loadMoreProducts, products]);

  return { products, onSetProducts: setProducts, isLoading, error };
};
