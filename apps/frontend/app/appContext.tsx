"use client";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
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

  const handleLogout = async () => {
    try {
      await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      });
      dispatch({
        type: appActionTypes.RESET,
      });
      router.push("/login");
      console.log("successfully logged out");
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
