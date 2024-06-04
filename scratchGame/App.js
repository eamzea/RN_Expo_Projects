import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

let itemArray = new Array(25).fill("empty");

const App = () => {
  const [randomNumberState, updateRandomNumberState] = useState({
    randomNumber: "",
    isScratched: false,
    itemsShowed: false,
    finishedGame: false,
  });

  const [counterState, updateCounterState] = useState(0);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 25);
    updateRandomNumberState(
      Object.assign({}, randomNumberState, {
        randomNumber,
        itemsShowed: false,
        finishedGame: false,
      })
    );
    updateCounterState(0);
  };

  const scratchItem = (itemNumber) => {
    if (!randomNumberState.finishedGame) {
      updateRandomNumberState(
        Object.assign({}, randomNumberState, {
          isScratched: true,
        })
      );

      if (counterState < 4) {
        updateCounterState(counterState + 1);

        if (randomNumberState.randomNumber === itemNumber) {
          itemArray[itemNumber] = "Lucky";
          updateRandomNumberState(
            Object.assign({}, randomNumberState, { finishedGame: true })
          );
          Alert.alert("You have won");
        } else {
          itemArray[itemNumber] = "Unlucky";
        }
      } else {
        if (randomNumberState.randomNumber === itemNumber) {
          itemArray[itemNumber] = "Lucky";
          Alert.alert("You have won");
          updateRandomNumberState(
            Object.assign({}, randomNumberState, { finishedGame: true })
          );
        } else {
          itemArray[itemNumber] = "Unlucky";
          Alert.alert("You have lose");
          updateRandomNumberState(
            Object.assign({}, randomNumberState, { finishedGame: true })
          );
        }
      }
    }
  };

  const scratchItemIcon = (itemNumber) => {
    if (itemArray[itemNumber] === "Lucky") {
      return "dollar";
    } else if (itemArray[itemNumber] === "Unlucky") {
      return "frown-o";
    }
    return "circle";
  };

  const scratchItemColor = (itemNumber) => {
    if (itemArray[itemNumber] === "Lucky") {
      return "green";
    } else if (itemArray[itemNumber] === "Unlucky") {
      return "red";
    }
    return "black";
  };

  const showAllItem = () => {
    if (!randomNumberState.itemsShowed) {
      itemArray.fill("Unlucky");
      itemArray[randomNumberState.randomNumber] = "Lucky";
      updateRandomNumberState(
        Object.assign({}, randomNumberState, {
          itemsShowed: true,
          finishedGame: true,
        })
      );
    }
  };

  const resetGame = () => {
    itemArray.fill("empty");
    generateRandomNumber();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>Scratch and Win Game</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.itemRow}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(0);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(0)}
              size={50}
              color={scratchItemColor(0)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(1);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(1)}
              size={50}
              color={scratchItemColor(1)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(2);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(2)}
              size={50}
              color={scratchItemColor(2)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(3);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(3)}
              size={50}
              color={scratchItemColor(3)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(4);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(4)}
              size={50}
              color={scratchItemColor(4)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(5);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(5)}
              size={50}
              color={scratchItemColor(5)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(6);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(6)}
              size={50}
              color={scratchItemColor(6)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(7);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(7)}
              size={50}
              color={scratchItemColor(7)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(8);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(8)}
              size={50}
              color={scratchItemColor(8)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(9);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(9)}
              size={50}
              color={scratchItemColor(9)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(10);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(10)}
              size={50}
              color={scratchItemColor(10)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(11);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(11)}
              size={50}
              color={scratchItemColor(11)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(12);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(12)}
              size={50}
              color={scratchItemColor(12)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(13);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(13)}
              size={50}
              color={scratchItemColor(13)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(14);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(14)}
              size={50}
              color={scratchItemColor(14)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(15);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(15)}
              size={50}
              color={scratchItemColor(15)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(16);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(16)}
              size={50}
              color={scratchItemColor(16)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(17);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(17)}
              size={50}
              color={scratchItemColor(17)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(18);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(18)}
              size={50}
              color={scratchItemColor(18)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(19);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(19)}
              size={50}
              color={scratchItemColor(19)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemRow}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(20);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(20)}
              size={50}
              color={scratchItemColor(20)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(21);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(21)}
              size={50}
              color={scratchItemColor(21)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(22);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(22)}
              size={50}
              color={scratchItemColor(22)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(23);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(23)}
              size={50}
              color={scratchItemColor(23)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              scratchItem(24);
            }}
          >
            <FontAwesome
              name={scratchItemIcon(24)}
              size={50}
              color={scratchItemColor(24)}
            />
          </TouchableOpacity>
        </View>
        {randomNumberState.itemsShowed || randomNumberState.finishedGame ? (
          <Button full success style={styles.button} disabled>
            <Text style={styles.buttonText}>Show All coupons</Text>
          </Button>
        ) : (
          <Button full success style={styles.button} onPress={showAllItem}>
            <Text style={styles.buttonText}>Show All coupons</Text>
          </Button>
        )}
        <Button full primary style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </Button>
      </View>
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
  grid: {},
  itemRow: {
    flexDirection: "row",
  },
  item: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    minWidth: 70,
  },
  button: {
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
  },
  topBar: {
    backgroundColor: "#A30B37",
    justifyContent: "center",
    height: 75,
    width: Dimensions.get("window").width,
    marginVertical: 20,
  },
  topText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 24,
  },
});

export default App;
