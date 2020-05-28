import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { Loading } from "../../components/Loading";
import { PriorityEventsList } from "../../components/PriorityEventsList";
import { useUser } from "../../context/UserContext";
import { useEvents } from "../../hooks/useEvents";
import { useParams } from "react-router";

export type WorkGroupScreenRouteParams = {
  workGroupId: string;
};

export const WorkGroupScreen: React.FC = () => {
  const { token } = useUser();
  const { workGroupId } = useParams<WorkGroupScreenRouteParams>();
  const { priorityEvents, isLoading, setQuery, setUserQuery } = useEvents(
    token,
    workGroupId
  );

  return (
    <AppLayout onSearchChange={setQuery}>
      {isLoading ? (
        <Loading />
      ) : (
        <PriorityEventsList
          priorityEvents={priorityEvents}
          onClick={setUserQuery}
        />
      )}
    </AppLayout>
  );
};
