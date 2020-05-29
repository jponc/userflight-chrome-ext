import { useState, useEffect } from "react";
import { WorkGroup } from "../common/types";
import {
  fetchWorkGroups,
  getWorkGroupIdFromStorage,
  storeWorkGroupIdToStorage,
} from "../actions/workGroups";

export const useWorkGroups = (token: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [workGroups, setWorkGroups] = useState<WorkGroup[]>([]);
  const [selectedWorkGroupId, setSelectedWorkGroupId] = useState<string | null>(
    getWorkGroupIdFromStorage()
  );

  useEffect(() => {
    if (selectedWorkGroupId) {
      return;
    }

    (async () => {
      setIsLoading(true);
      setWorkGroups(await fetchWorkGroups(token));
      setIsLoading(false);
    })();
  }, [selectedWorkGroupId, token]);

  useEffect(() => {
    if (workGroups.length === 1) {
      setSelectedWorkGroupId(workGroups[0].id);
    }
  }, [workGroups]);

  useEffect(() => {
    if (selectedWorkGroupId && selectedWorkGroupId.length) {
      storeWorkGroupIdToStorage(selectedWorkGroupId);
    }
  }, [selectedWorkGroupId]);

  return {
    isLoading,
    workGroups,
    setSelectedWorkGroupId,
    selectedWorkGroupId,
  };
};
