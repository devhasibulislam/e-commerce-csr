import { useEffect, useState } from "react";

function useMyself(token) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMyself = async () => {
      setLoading(true);
      const request = await fetch(`http://localhost:8080/user/myself`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const response = await request.json();
      if (response.acknowledgement) {
        setUser(response.data);
        setLoading(false);
      } else {
        console.log(response.description);
        setLoading(false);
      }
    };
    getMyself();
  }, [token]);

  return [user, loading];
}

export default useMyself;
