import { useQuery } from "@tanstack/react-query";

function useUsers() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/user/all-users", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { users: data?.data, loading: isLoading, refetch };
}

export default useUsers;
