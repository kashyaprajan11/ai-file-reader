"use client";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  createdAt?: Date;
}

interface AppContextData {
  user: User | undefined;
  isLoading: boolean;
  dispatch: React.Dispatch<Action>;
  handleLogout: () => void;
}

interface Action {
  type: string;
  user?: User;
  isLoading?: boolean;
}

const AppContext = React.createContext<AppContextData | null>(null);

const initialState: AppContextData = {
  user: undefined,
  isLoading: false,
  dispatch: () => null,
  handleLogout: () => null,
};

const appActionTypes = {
  TOGGLE_LOADING: "TOGGLE_LOADING",
  UPDATE_LOGGED_IN_USER: "UPDATE_LOGGED_IN_USER",
  RESET: "RESET",
};

function appReducer(state = initialState, action: Action): AppContextData {
  switch (action.type) {
    case appActionTypes.TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading ?? !state.isLoading };
    case appActionTypes.UPDATE_LOGGED_IN_USER: {
      return { ...state, user: action.user };
    }
    case appActionTypes.RESET: {
      return { ...state, user: undefined };
    }
    default:
      return state;
  }
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  React.useEffect(() => {
    // Authorize and go to dashboard if valid token exists
    dispatch({
      type: appActionTypes.TOGGLE_LOADING,
      isLoading: true,
    });
    async function checkAuth() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/auth-check`,
          {
            withCredentials: true,
          }
        );

        // If user exists set the user in appContext and push to dashboard page
        if (!!res.data.user) {
          dispatch({
            type: appActionTypes.UPDATE_LOGGED_IN_USER,
            user: { id: res.data.user?.id, email: res.data.user?.email },
          });
          router.push("/dashboard");
        }
      } catch (err) {
        console.log("Error encountered", err);
      }
    }
    checkAuth();
    dispatch({
      type: appActionTypes.TOGGLE_LOADING,
      isLoading: false,
    });
  }, []);

  const handleLogout = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        withCredentials: true,
      });
      dispatch({
        type: appActionTypes.RESET,
      });
      router.push("/login");
    } catch (err) {
      console.error("Could not logout", err);
    }
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext(): AppContextData {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

export { AppContext, AppProvider, useAppContext, appActionTypes };
