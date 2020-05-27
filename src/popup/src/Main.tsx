import React from "react";
import { LoginScreen } from "./screens/LoginScreen";
import { useUser } from "./context/UserContext";
import { Loading } from "./components/Loading";
import "./Main.scss";
import { AppRouter } from "./AppRouter";

export const Main = () => {
  const { token, doneCheckingAuth } = useUser();
  const isLoggedIn = token.length > 0;

  if (!doneCheckingAuth) {
    return <Loading />;
  }

  return (
    <>
      <div className="s-main">
        {isLoggedIn ? <AppRouter /> : <LoginScreen />}
      </div>
    </>
  );
};
