import React from "react";
import { useUser } from "../../context/UserContext";
import { AppLayout } from "../../components/AppLayout";
import {Loading} from "../../components/Loading";

export const HomeScreen = () => {
  const { token } = useUser();

  return (
    <AppLayout title="Search">
      <Loading />

    </AppLayout>
  );
};
