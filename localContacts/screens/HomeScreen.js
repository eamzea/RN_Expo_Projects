import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [dataState, updateDataState] = useState({
    data: [],
  });

  const getContacts = async () => {
    await AsyncStorage.getAllKeys()
      .then((keys) => {
        return AsyncStorage.multiGet(keys)
          .then((result) => {
            updateDataState({
              data: result.sort((a, b) => {
                return JSON.parse(a[1]).firstName < JSON.parse(a[1]).firstName
                  ? -1
                  : 1;
              }),
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getContacts();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataState.data}
        renderItem={({ item }) => {
          let contact = JSON.parse(item[1]);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("View", { key: item[0].toString() })
              }
            >
              <Card style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <Text style={styles.contactIcon}>
                    {contact.firstName[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {contact.firstName} {contact.lastName}
                  </Text>
                  <Text style={styles.infoText}>{contact.phoneNumber}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item[0].toString()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.floatButton}
      >
        <Entypo name="plus" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100,
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff",
  },
  infoContainer: {
    flexDirection: "column",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2,
  },
  floatButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100,
  },
});

export default HomeScreen;
