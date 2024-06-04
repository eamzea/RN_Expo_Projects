import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

const App = () => {
  const [numberState, setNumberState] = useState({
    uri: require("./src/images/dice1.png"),
  });

  const randomNumber = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  const playButtonPress = () => {
    let number = randomNumber();

    switch (number) {
      case 1:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice1.png"),
          })
        );
        break;
      case 2:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice2.png"),
          })
        );
        break;
      case 3:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice3.png"),
          })
        );
        break;
      case 4:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice4.png"),
          })
        );
        break;
      case 5:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice5.png"),
          })
        );
        break;
      case 6:
        return setNumberState(
          Object.assign({}, numberState, {
            uri: require("./src/images/dice6.png"),
          })
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={numberState.uri} />
      <TouchableOpacity onPress={playButtonPress}>
        <Text style={styles.gameButton}>Play Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E74292",
    alignItems: "center",
    justifyContent: "center",
  },
  gameButton: {
    fontSize: 20,
    marginTop: 35,
    color: "#FFFFFF",
    fontWeight: "bold",
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderColor: "#FFFFFF",
  },
});

export default App;
