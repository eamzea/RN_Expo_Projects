import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Hi Edgar!</Text>
      <Button
        title="Go to Components Demo"
        onPress={() => navigation.navigate("Components")}
      />
      <Button
        title="Go To List Demo"
        onPress={() => navigation.navigate("List")}
      />
      <Button
        title="Go To Image Screen"
        onPress={() => navigation.navigate("Images")}
      />
      <Button
        title="Go To Counter Demo"
        onPress={() => navigation.navigate("Counter")}
      />
      <Button
        title="Go To Add Color Demo"
        onPress={() => navigation.navigate("AddColor")}
      />
      <Button
        title="Go To Square Demo"
        onPress={() => navigation.navigate("Square")}
      />
      <Button
        title="Go To Text Demo"
        onPress={() => navigation.navigate("Text")}
      />
      <Button
        title="Go To Box Demo"
        onPress={() => navigation.navigate("Box")}
      />
      <Button
        title="Go To Flex Demo"
        onPress={() => navigation.navigate("Flex")}
      />
      <Button
        title="Go To Position Demo"
        onPress={() => navigation.navigate("Position")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
