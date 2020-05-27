import { useState, useEffect } from "react";
import { WorkGroup } from "../common/types";
import { fetchWorkGroups } from "../actions/workGroups";

export const useWorkGroups = (token: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        setWorkGroups(await fetchWorkGroups(token));
      } catch {
        alert("Failed fetching work groups!");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [token]);

  return {
    isLoading,
    workGroups
  };
};
