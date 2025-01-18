import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import transformUser from "../utils/transformUser";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export type RequestProps  = {
  url: string;
  method?: MethodType;
}

const useFetch = (props: RequestProps) => {
  const { url, method = "GET" } = props;
  const [data, setData] = useState<any[]>([]);
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
      if (json.users && Array.isArray(json.users)) {
        setData(transformUser(json.users));
      }
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
