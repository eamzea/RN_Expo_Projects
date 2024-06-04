import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const ListScreen = () => {
  const friends = [
    { name: "Diego", age: 27 },
    { name: "Laura", age: 28 },
    { name: "Layun", age: 27 },
    { name: "Tom", age: 28 },
    { name: "Elias", age: 29 },
    { name: "Diego2", age: 27 },
    { name: "Laura3", age: 28 },
    { name: "Layun4", age: 27 },
    { name: "Tom5", age: 28 },
    { name: "Elias6", age: 29 },
  ];

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={friends}
      renderItem={({ item }) => {
        return (
          <Text style={styles.textStyle}>
            {item.name} - Edad: {item.age}
          </Text>
        );
      }}
      keyExtractor={(friend) => friend.name}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 50,
  },
});

export default ListScreen;
