import React from "react";
import { Button } from "antd";
import { createBrowserHistory } from "history";
import "./style.scss";

const ConfirmSignOut = () => {
  const history = createBrowserHistory();

  const handleSignOut = () => {
    sessionStorage.removeItem("user");
    history.push("/home");
    window.location.reload();
  };

  return (
    <div className="sign-out">
      <h1>Are you sure you want to sign out?</h1>
      <Button type="primary" onClick={handleSignOut}>
        Yes, sign out
      </Button>
    </div>
  );
};

export default ConfirmSignOut;
