import { useQuery } from "@tanstack/react-query";

function useMyself(token) {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/user/myself", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  return { user: data?.data, loading: isLoading };
}

export default useMyself;
