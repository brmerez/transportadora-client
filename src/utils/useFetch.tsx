import { useEffect, useState } from "react";
import { httpClient } from "../lib/httpClient";

export default function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    httpClient
      .get(url)
      .then((response) => {
        setData(JSON.parse(response.data));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
