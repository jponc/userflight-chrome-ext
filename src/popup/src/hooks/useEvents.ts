import { useState, useEffect } from "react";
import { Event, UserQuery } from "../common/types";
import { fetchAutocompletePriorityEvents, fetchEventsForCustomer } from "../actions/events";

export const useEvents = (token: string, workGroupId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [priorityEvents, setPriorityEvents] = useState<Event[]>([]);
  const [userQuery, setUserQuery] = useState<UserQuery | undefined>(undefined);

  useEffect(() => {
    if (query.length === 0) {
      setIsLoading(false);
      setPriorityEvents([])
      return;
    }

    setUserQuery(undefined);

    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const fetchedPriorityEvents = await fetchAutocompletePriorityEvents(token, workGroupId, query);

      if (!cancelled) {
        setPriorityEvents(fetchedPriorityEvents);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true
    }
  }, [token, workGroupId, query]);

  useEffect(() => {
    if (!userQuery) {
      setUserEvents([]);
      return;
    }

    let cancelled = false;
    (async () => {
      setIsLoading(true);

      const fetchedPriorityEvents = await fetchEventsForCustomer(token, workGroupId, userQuery);

      if (!cancelled) {
        setUserEvents(fetchedPriorityEvents);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true
    }
  }, [token, workGroupId, userQuery]);

  return {
    isLoading,
    userEvents,
    priorityEvents,
    setQuery,
    setUserQuery,
    userQuery
  };
};
