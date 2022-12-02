import { useQuery } from "@tanstack/react-query";

function useSellers() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://e-commerce-ssr.onrender.com/user/query-users?role=seller`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { users: data?.data, loading: isLoading };
}

export default useSellers;
