import { useState, useEffect, useCallback, useRef } from "react";
import { Product } from "../../services/products/types";
import { useFilter } from "./useFilter";

export const useInfiniteScroll = (
  loadingMoreRef: React.RefObject<HTMLDivElement>
) => {
  const count = useRef(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const {
    filterSearchString,
    filterCategory,
    setFilterSearchString,
    setFilterCategory,
  } = useFilter();

  const loadMoreProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/products?page=${page}&limit=24`);
      const data = await response.json();
      if (data.hasMore === false && data.products.length === 0) {
        setIsLoading(false);
        if (loadingMoreRef.current && loadingMoreRef.current.parentNode) {
          loadingMoreRef.current.remove();
        }
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setIsLoading(false);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError(true);
      console.error("Error while fetching products", error);
    }
  }, [page, loadingMoreRef]);

  const loadFilteredProducts = useCallback(
    async (filterType: string) => {
      try {
        setIsLoading(true);
        let response;
        if (filterType === "search") {
          response = await fetch(`/products?&q=${filterSearchString}`);
        }
        if (filterType === "category") {
          response = await fetch(`/products?&category=${filterCategory}`);
        }

        const data = response ? await response.json() : null;
        setFilterSearchString(null);
        setFilterCategory(null);

        if (data && data.hasMore === false && data.products.length === 0) {
          setIsLoading(false);
        } else {
          setProducts(() => [...data.products]);
          setIsLoading(false);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching products", error);
      }
    },
    [page, filterSearchString, filterCategory, loadingMoreRef]
  );

  // I use count as ref to avoid the double execution of loadMoreProducts function when the component mounts in development environment
  useEffect(() => {
    if (count.current === 0) {
      loadMoreProducts();
      count.current++;
    }
  }, []);

  useEffect(() => {
    if (filterSearchString) {
      loadFilteredProducts("search");
    } else if (filterCategory) {
      console.log("c", filterCategory);
      loadFilteredProducts("category");
    }
  }, [filterSearchString, filterCategory]);

  // use of the Intersaction Observer API to detect when an observed element intersects with the viewport, useful when it comes to infinite scrolling
  /** @see  https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API */

  useEffect(() => {
    const reference = loadingMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
          console.log;
        }
      },
      {
        rootMargin: "0px 0px 500px 0px",
        threshold: 1,
      }
    );

    if (reference && filterCategory == "" && filterSearchString == "") {
      observer.observe(reference);
    }
    return () => {
      if (reference) {
        observer.unobserve(reference);
      }
    };
  }, [loadingMoreRef, loadMoreProducts, filterCategory, filterSearchString]);
  return {
    productsData: products,
    onSetProducts: setProducts,
    isLoading,
    error,
  };
};
