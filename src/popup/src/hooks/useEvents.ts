import { useState, useEffect } from "react";
import { Event, UserQuery } from "../common/types";
import { fetchAutocompletePriorityEvents, fetchEventsForCustomer } from "../actions/events";
import { useDebounce } from "./useDebounce";
import { uniqWith } from "lodash";

export const useEvents = (token: string, workGroupId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [priorityEvents, setPriorityEvents] = useState<Event[]>([]);
  const [userQuery, setUserQuery] = useState<UserQuery | undefined>(undefined);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setIsLoading(false);
      setPriorityEvents([])
      return;
    }

    setUserQuery(undefined);

    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const fetchedPriorityEvents = await fetchAutocompletePriorityEvents(token, workGroupId, debouncedQuery);

      if (!cancelled) {
        setPriorityEvents(fetchedPriorityEvents);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true
    }
  }, [token, workGroupId, debouncedQuery]);

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
        const uniqueEvents = uniqWith(fetchedPriorityEvents, (val, other) => (
          val.fullName === other.fullName &&
            val.ip === other.ip &&
            val.email === other.email &&
            val.phone === other.phone
        ))
        setUserEvents(uniqueEvents);
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
