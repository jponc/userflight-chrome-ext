import { useState, useEffect } from "react";
import { Event, UserQuery } from "../common/types";
import {
  fetchAutocompletePriorityEvents,
  fetchEventsForCustomer,
  getQueryFormStorage,
  getUserQueryFromStorage,
  storeQueryToStorage,
  storeUserQueryToStorage,
  removeUserQueryFromStorage
} from "../actions/events";
import { useDebounce } from "./useDebounce";
import { uniqWith } from "lodash";

export const useEvents = (token: string, workGroupId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(getQueryFormStorage() || "");
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [priorityEvents, setPriorityEvents] = useState<Event[]>([]);
  const [userQuery, setUserQuery] = useState<UserQuery | null>(getUserQueryFromStorage());

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setIsLoading(false);
      setPriorityEvents([]);
      return;
    }

    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const fetchedPriorityEvents = await fetchAutocompletePriorityEvents(
        token,
        workGroupId,
        debouncedQuery
      );

      if (!cancelled) {
        const uniqueEvents = uniqWith(
          fetchedPriorityEvents,
          (val, other) =>
            val.fullName === other.fullName &&
            val.ip === other.ip &&
            val.email === other.email &&
            val.phone === other.phone
        );
        setPriorityEvents(uniqueEvents);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, workGroupId, debouncedQuery]);

  useEffect(() => {
    if (!userQuery) {
      setUserEvents([]);
      return;
    }

    let cancelled = false;
    (async () => {
      setIsLoading(true);

      const fetchedUserEvents = await fetchEventsForCustomer(
        token,
        workGroupId,
        userQuery
      );

      if (!cancelled) {
        setUserEvents(fetchedUserEvents);
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, workGroupId, userQuery]);


  useEffect(() => {
    storeQueryToStorage(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    if (userQuery) {
      storeUserQueryToStorage(userQuery);
    } else {
      removeUserQueryFromStorage();
    }
  }, [userQuery]);

  const onSearchChange = (value: string) => {
    setIsLoading(true);
    setUserQuery(null);
    setQuery(value);
  }

  return {
    isLoading,
    query,
    userEvents,
    priorityEvents,
    onSearchChange,
    setUserQuery,
    userQuery,
  };
};
