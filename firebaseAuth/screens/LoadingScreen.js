import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { StackActions } from "@react-navigation/native";
import * as firebase from "firebase";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authenticate) => {
      if (authenticate) {
        navigation.dispatch(StackActions.replace("Home"));
      } else {
        navigation.dispatch(StackActions.replace("Sign In"));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00BBF9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
