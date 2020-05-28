import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { Loading } from "../../components/Loading";
import { useUser } from "../../context/UserContext";
import { useWorkGroups } from "../../hooks/useWorkGroups";
import { WorkGroupCards } from "../../components/WorkGroupCards";
import { WorkGroup } from "../../common/types";
import { useHistory } from "react-router";

export const WorkGroupsScreen: React.FC = () => {
  const { token } = useUser();
  const { workGroups, isLoading } = useWorkGroups(token);
  const history = useHistory();

  if (workGroups.length === 1) {
    history.push(`/work-groups/${workGroups[0].id}`);
  }

  const workGroupOnClickHandler = (workGroup: WorkGroup) => {
    history.push(`/work-groups/${workGroup.id}`);
  };

  return (
    <AppLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <WorkGroupCards
          workGroups={workGroups}
          onClick={workGroupOnClickHandler}
        />
      )}
    </AppLayout>
  );
};
