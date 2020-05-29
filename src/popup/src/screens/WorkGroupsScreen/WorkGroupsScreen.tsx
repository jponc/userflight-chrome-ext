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
  const { workGroups, isLoading, selectedWorkGroupId, setSelectedWorkGroupId } = useWorkGroups(token);
  const history = useHistory();

  if (selectedWorkGroupId) {
    history.push(`/work-groups/${selectedWorkGroupId}`);
  }

  const workGroupOnClickHandler = (workGroup: WorkGroup) => {
    setSelectedWorkGroupId(workGroup.id);
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
