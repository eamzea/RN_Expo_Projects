import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";

const listBackgroundColors = {
  1: "#F4FAFF",
  2: "#7CC6FE",
  3: "#1282A2",
  4: "#A5CCD1",
  5: "#BCD4DE",
  6: "#80A1C1",
  7: "#9ABCA7",
  8: "#20BF55",
  9: "#1E555C",
  10: "#A07178",
};

const arrNumb = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

const soundList = {
  one: require("./assets/one.wav"),
  two: require("./assets/two.wav"),
  three: require("./assets/three.wav"),
  four: require("./assets/four.wav"),
  five: require("./assets/five.wav"),
  six: require("./assets/six.wav"),
  seven: require("./assets/seven.wav"),
  eight: require("./assets/eight.wav"),
  nine: require("./assets/nine.wav"),
  ten: require("./assets/ten.wav"),
};

const App = () => {
  const playSound = async (number) => {
    const soundObject = new Audio.Sound();

    try {
      let path = soundList[number];

      await soundObject.loadAsync(path);
      await soundObject
        .playAsync()
        .then(async (playbackStatus) => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[1] },
                styles.itemText,
              ]}
              onPress={() => playSound("one")}
            >
              One
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[2] },
                styles.itemText,
              ]}
              onPress={() => playSound("two")}
            >
              Two
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[3] },
                styles.itemText,
              ]}
              onPress={() => playSound("three")}
            >
              Three
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[4] },
                styles.itemText,
              ]}
              onPress={() => playSound("four")}
            >
              Four
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[5] },
                styles.itemText,
              ]}
              onPress={() => playSound("five")}
            >
              Five
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[6] },
                styles.itemText,
              ]}
              onPress={() => playSound("six")}
            >
              Six
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[7] },
                styles.itemText,
              ]}
              onPress={() => playSound("seven")}
            >
              Seven
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[8] },
                styles.itemText,
              ]}
              onPress={() => playSound("eight")}
            >
              Eight
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[9] },
                styles.itemText,
              ]}
              onPress={() => playSound("nine")}
            >
              Nine
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.item}>
            <Text
              style={[
                { backgroundColor: listBackgroundColors[10] },
                styles.itemText,
              ]}
              onPress={() => playSound("ten")}
            >
              Ten
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridContainer: {
    flex: 1,
    margin: 5,
  },
  logo: {
    alignSelf: "center",
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    height: 110,
    justifyContent: "center",
    margin: 2,
    borderRadius: 1,
  },
  itemText: {
    textAlign: "center",
    fontSize: 20,
    padding: 24,
  },
});

export default App;
