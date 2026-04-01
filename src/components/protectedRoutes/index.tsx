import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type IProtectedRoutesProps = object;

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = () => {

    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    // if loading is true, we just returning null
    if(loading){
        return null;
    }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{from: location}} />
  )
};

export default ProtectedRoutes;
