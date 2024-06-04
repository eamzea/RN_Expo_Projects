import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "sign":
      return { token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signOut":
      return { toke: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "sign", payload: token });
    navigate("TrackList");
  } else {
    navigate("SignUp");
  }
};

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "sign", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({ type: "add_error", payload: "Email already exists" });
  }
};

const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "sign", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with Sign In",
    });
  }
};

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signOut" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signUp,
    signOut,
    clearErrorMessage,
    tryLocalSignIn,
  },
  {
    token: null,
    errorMessage: "",
  }
);
