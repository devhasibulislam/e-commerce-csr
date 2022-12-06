import { useQuery } from "@tanstack/react-query";

function useCategories() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/category").then((res) =>
        res.json()
      ),
  });

  return { categories: data?.data, loading: isLoading, refetch };
}

export default useCategories;
