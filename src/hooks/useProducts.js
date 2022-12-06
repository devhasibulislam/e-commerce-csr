import { useQuery } from "@tanstack/react-query";

function useProducts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/product").then((res) =>
        res.json()
      ),
  });

  return { products: data?.data, loading: isLoading, refetch };
}

export default useProducts;
