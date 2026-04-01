/* eslint-disable react-refresh/only-export-components */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, type User, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";

interface IUserAuthProviderProps {
    children: React.ReactNode;
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;  
}

const logIn = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logOut = async () => {
    return signOut(auth);
}

const googleSignIn = async () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}


export const UserAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
})

export const UserAuthProvider: React.FunctionComponent<
    IUserAuthProviderProps
> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            return () => {
                unsubscribe();
            }
        });
    });
    const value: AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn
    }
    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(UserAuthContext);
}