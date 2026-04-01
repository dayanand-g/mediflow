import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { UserAuthProvider } from './context/userAuthContext';
type IAppProps = object;

const App: React.FunctionComponent<IAppProps> = () => {

  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
