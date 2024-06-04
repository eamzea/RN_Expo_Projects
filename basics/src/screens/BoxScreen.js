import React from "react";
import { Text, StyleSheet, View } from "react-native";

const BoxScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Box Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 5,
    borderColor: "black",
    height: "50%",
  },
  text: {
    borderWidth: 10,
    borderColor: "red",
    padding: 50,
    margin: 50,
    textAlign: "center",
  },
});

export default BoxScreen;
