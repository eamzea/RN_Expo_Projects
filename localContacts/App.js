import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import EditContactScreen from "./screens/EditContactScreen";
import AddContactScreen from "./screens/AddContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#b83227",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Contact App" }}
        />
        <Stack.Screen
          name="Add"
          component={AddContactScreen}
          options={{ title: "Add New Contact" }}
        />
        <Stack.Screen
          name="View"
          component={ViewContactScreen}
          options={{ title: "View Contact" }}
        />
        <Stack.Screen
          name="Edit"
          component={EditContactScreen}
          options={{ title: "Edit Contact" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
