import { useState, useEffect } from "react";
import { Event } from "../common/types";
import { fetchAutocompletePriorityEvents } from "../actions/events";

export const useEvents = (token: string, workGroupId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        setEvents(await fetchAutocompletePriorityEvents(token, workGroupId, query));
      } catch {
        alert("Failed fetching work groups!");
      }
    })();
  }, [query, token, workGroupId]);

  return {
    query,
    events,
    isLoading,
    setQuery,
  };
};
