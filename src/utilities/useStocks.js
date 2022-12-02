import { useQuery } from "@tanstack/react-query";

function useStocks() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["stocks"],
    queryFn: () =>
      fetch(`https://e-commerce-ssr.onrender.com/stock`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
      refetchInterval: 1000
  });

  return { stocks: data?.data, loading: isLoading };
}

export default useStocks;
