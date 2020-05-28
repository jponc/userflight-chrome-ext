import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { Loading } from "../../components/Loading";
import { PriorityEventsList } from "../../components/PriorityEventsList";
import { UserEventCards } from "../../components/UserEventCards";
import { useUser } from "../../context/UserContext";
import { useEvents } from "../../hooks/useEvents";
import { useParams } from "react-router";
import { UserQueryInfo } from "../../components/UserQueryInfo";
import { useWorkGroup } from "../../hooks/useWorkGroup";

export type WorkGroupScreenRouteParams = {
  workGroupId: string;
};

export const WorkGroupScreen: React.FC = () => {
  const { token } = useUser();
  const { workGroupId } = useParams<WorkGroupScreenRouteParams>();
  const {
    userEvents,
    priorityEvents,
    isLoading,
    setQuery,
    setUserQuery,
    userQuery,
  } = useEvents(token, workGroupId);
  const { workGroup } = useWorkGroup(token, workGroupId);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (!userQuery) {
    content = (
      <PriorityEventsList
        priorityEvents={priorityEvents}
        onClick={setUserQuery}
      />
    );
  } else {
    content = (
      <>
        <UserQueryInfo userQuery={userQuery} />
        <UserEventCards userEvents={userEvents} />
      </>
    );
  }

  return <AppLayout title={workGroup?.name} onSearchChange={setQuery}>{content}</AppLayout>;
};
