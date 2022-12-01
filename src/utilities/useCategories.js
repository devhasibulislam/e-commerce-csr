import { useEffect, useState } from "react";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const request = await fetch(`http://localhost:8080/category`);
      const response = await request.json();
      if (response.acknowledgement) {
        setCategories(response.data);
        setLoading(false);
      } else {
        console.log(response.description);
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return [categories, loading];
}

export default useCategories;
