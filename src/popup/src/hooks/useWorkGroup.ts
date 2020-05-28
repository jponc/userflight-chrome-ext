import { useState, useEffect } from "react";
import { WorkGroup } from "../common/types";
import { fetchWorkGroup } from "../actions/workGroups";

export const useWorkGroup = (token: string, workGroupId: string) => {
  const [isWorkGroupLoading, setIsWorkGroupLoading] = useState<boolean>(false);
  const [workGroup, setWorkGroup] = useState<WorkGroup | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setIsWorkGroupLoading(true);

      try {
        setWorkGroup(await fetchWorkGroup(token, workGroupId));
      } catch {
        alert("Failed fetching work groups!");
      } finally {
        setIsWorkGroupLoading(false);
      }
    })();
  }, [token, workGroupId]);

  return {
    isWorkGroupLoading,
    workGroup
  };
};
