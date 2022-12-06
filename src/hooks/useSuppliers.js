import { useQuery } from "@tanstack/react-query";

function useSuppliers() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["supplier"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/supplier").then((res) =>
        res.json()
      ),
  });

  return { suppliers: data?.data, loading: isLoading, refetch };
}

export default useSuppliers;
