import { useEffect, useState } from "react";

function useBrands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      const request = await fetch(`http://localhost:8080/brand`);
      const response = await request.json();
      if (response.acknowledgement) {
        setBrands(response.data);
        setLoading(false);
      } else {
        console.log(response.description);
        setLoading(false);
      }
    };
    getBrands();
  }, []);

  return [brands, loading];
}

export default useBrands;
