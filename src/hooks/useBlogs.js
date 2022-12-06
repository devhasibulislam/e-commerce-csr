import { useQuery } from "@tanstack/react-query";

function useBlogs() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/blog", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { blogs: data?.data, loading: isLoading, refetch };
}

export default useBlogs;
