import React from "react";
import { AppLayout } from "../../components/AppLayout";
import { Loading } from "../../components/Loading";
import { useUser } from "../../context/UserContext";
import { useWorkGroups } from "../../hooks/useWorkGroups";
import { Typography } from "@material-ui/core";

export const WorkGroupsScreen: React.FC = () => {
  const { token } = useUser();
  const { workGroups, isLoading } = useWorkGroups(token);

  return (
    <AppLayout title="Work Groups">
      {isLoading ? (
        <Loading />
      ) : (
        <Typography variant="h1">{workGroups.length}</Typography>
      )}
    </AppLayout>
  );
};
