import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useActiveWeb3React } from "../services/exchange/hooks";

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
export const PublicRoute = ({ component: Component, children, ...rest }) => {
  const { account } = useActiveWeb3React();
  const location = useLocation();
  return (
    <>
      <Route
        {...rest}
        render={({ props }) =>
          account ? (
            <Redirect
              to={{
                pathname: location.state ? location.state.from.pathname : "/",
              }}
            />
          ) : Component ? (
            <Component {...props} {...rest} />
          ) : (
            children
          )
        }
      />
    </>
  );
};

export default PublicRoute;
