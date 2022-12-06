import { useQuery } from "@tanstack/react-query";

function useBrands() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/brand").then((res) =>
        res.json()
      ),
  });

  return { brands: data?.data, loading: isLoading, refetch };
}

export default useBrands;
