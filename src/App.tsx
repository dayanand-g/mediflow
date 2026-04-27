import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { setAuthState, serializeUser } from "./redux/authSlice";
type IAppProps = object;

// Create a small wrapper to handle the listener
const AuthStateListener = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      store.dispatch(setAuthState(serializeUser(user)));
    });
    return () => unsubscribe();
  }, []);
  return <>{children}</>;
};

const App: React.FunctionComponent<IAppProps> = () => {

  return (
    <Provider store={store}>
      <AuthStateListener>
        <RouterProvider router={router} />
      </AuthStateListener>
    </Provider>  
  );
};

export default App;
