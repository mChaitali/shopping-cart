import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Failed to fetch Products");
        }
        const data = await res.json();
        if (isMounted) setProducts(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
