import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

const TextScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text style={styles.title}>Enter your name :</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={(value) => {
          setName(value);
        }}
      />
      <Text style={styles.text}>Your name is {name}</Text>
      <Text style={styles.title}>Enter password :</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(value) => {
          setPassword(value);
        }}
      />
      {password.length < 4 ? (
        <Text style={styles.alert}>Password must be at least 4 characters</Text>
      ) : null}
      <Text style={styles.text}>Your password is {password}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    padding: 15,
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 1,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  text: {
    fontSize: 28,
    textAlign: "center",
  },
  alert: {
    fontSize: 24,
    color: "red",
    textAlign: "center",
  },
});

export default TextScreen;
