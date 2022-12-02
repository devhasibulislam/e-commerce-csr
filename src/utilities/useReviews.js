import { useQuery } from "@tanstack/react-query";

function useReviews() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/review", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { reviews: data?.data, loading: isLoading, refetch };
}

export default useReviews;
