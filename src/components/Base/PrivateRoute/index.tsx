import React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {adminRoute} from "../../../utils";

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const { data: loginUser } = useTypedSelector(state => state.user);

    return (
      <Route
        {...rest}
        render={(props) =>
          loginUser ? (
              <Component {...props} />
          ) : (
            <Redirect to={'/login'} />
          )
        }
      />
    );
};

export default PrivateRoute;
