import React from "react";
import { Text, StyleSheet, View } from "react-native";

const FlexScreen = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}> Child # 1</Text>
      <Text style={styles.text}> Child # 2</Text>
      <Text style={styles.text}> Child # 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 5,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "50%",
  },
  text: {
    borderWidth: 10,
    borderColor: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default FlexScreen;
