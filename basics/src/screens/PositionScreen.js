import React from "react";
import { Text, StyleSheet, View } from "react-native";

const PositionScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text1}> Child # 1</Text>
      <Text style={styles.text2}> Child # 2</Text>
      <Text style={styles.text3}> Child # 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 5,
    borderColor: "black",
    height: "50%",
  },
  text1: {
    borderWidth: 10,
    borderColor: "red",
    textAlign: "center",
  },
  text2: {
    borderWidth: 5,
    borderColor: "green",
    textAlign: "center",
    position: "absolute",
  },
  text3: {
    borderWidth: 10,
    borderColor: "blue",
    textAlign: "center",
    left: "50%",
    top: 25,
  },
});

export default PositionScreen;
