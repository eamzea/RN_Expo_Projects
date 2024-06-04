import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ViewContactScreen from "./screens/ViewContact";
import EditContactScreen from "./screens/EditContact";
import AddNewContactScreen from "./screens/AddNewContact";

//TODO: import firebase
import * as firebase from "firebase";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer
      screenOptions={{
        headerStyle: {
          backgroundColor: "#B83227",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Contact App" }}
        />
        <Stack.Screen
          name="Add"
          component={AddNewContactScreen}
          options={{ title: "Add Contact" }}
        />
        <Stack.Screen
          name="View"
          component={ViewContactScreen}
          options={{ title: "View Contact" }}
        />
        <Stack.Screen name="Edit" component={EditContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//TODO: Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyDVtCIJRqoqWwikLfzUKBzW271Q3PagKBA",
  authDomain: "fir-contactreactnativeapp.firebaseapp.com",
  databaseURL: "https://fir-contactreactnativeapp.firebaseio.com",
  projectId: "fir-contactreactnativeapp",
  storageBucket: "fir-contactreactnativeapp.appspot.com",
  messagingSenderId: "878599925850",
  appId: "1:878599925850:web:2c55454533a49f2d756863",
  measurementId: "G-F2YGZ6N1GT",
};

firebase.initializeApp(firebaseConfig);

export default App;
