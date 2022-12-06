import { useQuery } from "@tanstack/react-query";

function useStores() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["stores"],
    queryFn: () =>
      fetch(`https://e-commerce-ssr.onrender.com/store`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { stores: data?.data, loading: isLoading, refetch };
}

export default useStores;
