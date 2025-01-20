import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type RequestProps  = {
  url: string;
  method?: MethodType;
}

function useFetch<T = unknown>(props: RequestProps) {
  const { url, method = "GET" } = props;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      setData(json);
      console.log(data)

    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useDebounce(fetchData, 500);

  useEffect(() => {
    debouncedFetchData();
  }, [url, method]);

  return { data, loading, error };
};

export default useFetch;
