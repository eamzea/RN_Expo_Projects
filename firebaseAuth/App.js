import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";

import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";

let firebaseConfig = {
  apiKey: "AIzaSyCzC86rlzwGWou_pyK_DjYe7OOnZcC2Cx8",
  authDomain: "reactnativeapp-73e02.firebaseapp.com",
  databaseURL: "https://reactnativeapp-73e02.firebaseio.com",
  projectId: "reactnativeapp-73e02",
  storageBucket: "reactnativeapp-73e02.appspot.com",
  messagingSenderId: "707456442467",
  appId: "1:707456442467:web:6fa6f3a8a146c6d1f8d856",
  measurementId: "G-GYDZ62L28D",
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#E8E1EF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialRouteName="Loading"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ title: "Loading" }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="Sign In"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
