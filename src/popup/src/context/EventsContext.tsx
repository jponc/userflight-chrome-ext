import React, { useContext, createContext, useState, useEffect } from "react";
import { Event } from "../common/types";

type EventsContextType = {
  query: string;
  events: Event[];
  isLoading: boolean;
  setQuery: (newQuery: string) => void
};

const EventsContext = createContext<EventsContextType>({
  query: "",
  events: [],
  isLoading: false,
  setQuery: (_newQuery: string) => {}
});

const EventsProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setIsLoading(true)
  }, [query])

  const contextValue = {
    query,
    events,
    isLoading,
    setQuery
  };

  return <EventsContext.Provider value={contextValue} {...props} />;
};

const useEvents = () => useContext(EventsContext);
export { EventsProvider, useEvents };
