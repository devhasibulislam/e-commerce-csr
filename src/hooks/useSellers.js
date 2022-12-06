import { useQuery } from "@tanstack/react-query";

function useSellers() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://e-commerce-ssr.onrender.com/user/query-users?role=seller`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json()),
  });

  return { sellers: data?.data, loading: isLoading, refetch };
}

export default useSellers;
