import { useQuery } from "@tanstack/react-query";

function useBanners() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: () =>
      fetch("https://e-commerce-ssr.onrender.com/banner", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  return { banners: data?.data, loading: isLoading, refetch };
}

export default useBanners;
