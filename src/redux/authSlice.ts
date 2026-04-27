import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider, 
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Adjust path if needed

// 1. Create a serializable user type to prevent Redux errors
export interface SerializedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: SerializedUser | null;
  isAuthLoaded: boolean;
}

interface UserCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  isAuthLoaded: false, // Helps prevent flickering before Firebase checks auth
};

// Helper to strip non-serializable data from Firebase User
export const serializeUser = (user: User | null): SerializedUser | null => {
  if (!user) return null;
  return { uid: user.uid, email: user.email, displayName: user.displayName };
};

// 2. Thunks (Replacing your Context functions)
export const logInUser = createAsyncThunk("auth/logIn", async ({ email, password }: UserCredentials) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return serializeUser(userCredential.user);
});

export const signUpUser = createAsyncThunk("auth/signUp", async ({ email, password }: UserCredentials) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return serializeUser(userCredential.user);
});

export const googleSignInUser = createAsyncThunk("auth/googleSignIn", async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return serializeUser(userCredential.user);
});

export const logOutUser = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
  return null;
});

// 3. The Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This will be called by the Firebase listener
    setAuthState: (state, action: PayloadAction<SerializedUser | null>) => {
      state.user = action.payload;
      state.isAuthLoaded = true;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;