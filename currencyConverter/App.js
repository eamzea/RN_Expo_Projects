import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const currencyPerPeso = {
  DOLLAR: 0.045,
  EURO: 0.039,
  AUSDOLLAR: 0.064,
  CANDOLLAR: 0.06,
  YEN: 4.79,
  RUPEE: 3.36,
  BITCOIN: 0.0000049,
  ARGPESO: 3.2,
  DINAR: 53.35,
};

const App = () => {
  const [valueState, updateValueState] = useState({
    inputValue: "",
    resultValue: "0.0",
  });

  const buttonPressed = (currency) => {
    if (valueState.inputValue === "") {
      Alert.alert("Enter some value");
    }

    let result = parseFloat(valueState.inputValue) * currencyPerPeso[currency];

    updateValueState(
      Object.assign({}, valueState, { resultValue: result.toFixed(2) })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.screenView}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultValue}>{valueState.resultValue}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              selectionColor="#FFFFFF"
              keyboardType="numeric"
              placeholder="Enter Value"
              value={valueState.inputValue}
              onChangeText={(inputValue) =>
                updateValueState(Object.assign({}, valueState, { inputValue }))
              }
            />
          </View>
          <View style={styles.converterButtonContainer}>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("DOLLAR")}
            >
              <Text style={styles.converterButtonText}>Dollar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("EURO")}
            >
              <Text style={styles.converterButtonText}>Euro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("AUSDOLLAR")}
            >
              <Text style={styles.converterButtonText}>Australian Dollar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("CANDOLLAR")}
            >
              <Text style={styles.converterButtonText}>Canadian Dollar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("YEN")}
            >
              <Text style={styles.converterButtonText}>Yen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("RUPEE")}
            >
              <Text style={styles.converterButtonText}>Rupee</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("BITCOIN")}
            >
              <Text style={styles.converterButtonText}>Bitcoin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("ARGPESO")}
            >
              <Text style={styles.converterButtonText}>Argentino Peso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.converterButton}
              onPress={() => buttonPressed("DINAR")}
            >
              <Text style={styles.converterButtonText}>Dinar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1DEDE",
  },
  screenView: {
    margin: 5,
    flex: 1,
  },
  resultContainer: {
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    borderColor: "#00B2CA",
    backgroundColor: "#7180AC",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  resultValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  inputContainer: {
    height: 70,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00B2CA",
  },
  input: {
    fontSize: 30,
  },
  converterButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    borderColor: "#00B2CA",
    borderWidth: 2,
    borderRadius: 10,
  },
  converterButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8390FA",
    height: 100,
    width: "33.33%",
    borderWidth: 1,
    borderColor: "#00B2CA",
    borderRadius: 1,
  },
  converterButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
