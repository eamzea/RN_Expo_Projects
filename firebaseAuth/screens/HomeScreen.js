import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "native-base";
import { StackActions } from "@react-navigation/native";

import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [userState, updateUserState] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        updateUserState(
          Object.assign({}, userState, {
            email: authenticate.email,
            name: authenticate.displayName,
          })
        );
      } else {
        navigation.dispatch(StackActions.replace("Sign In"));
      }
    });
  }, []);

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Sign Out"))
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
        <Text>Home</Text>
      </View>
      <View style={styles.userDetails}>
        <Text>Hey {userState.name}</Text>
        <Text>You are signed in as: {userState.email}</Text>
      </View>
      <Button full rounded success style={styles.button} onPress={signOutUser}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100,
  },
  logo: {
    height: 100,
    width: 100,
  },
  userDetails: {},

  button: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
});

export default HomeScreen;
