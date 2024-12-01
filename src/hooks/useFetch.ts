import { useCallback, useState } from "react";

type UseFetchResult<T> = {
  data: T | null;
  callRequest: () => void;
  isLoading: boolean;
  error: string | null;
};

export function useFetch<T>(
  request: () => Promise<T>,
  onSuccess?: () => void,
  onError?: () => void,
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const callRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await request();

      setData(response);
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      onError?.();
    } finally {
      setIsLoading(false);
    }
  }, [request, onSuccess]);

  return { callRequest, data, error, isLoading };
}
