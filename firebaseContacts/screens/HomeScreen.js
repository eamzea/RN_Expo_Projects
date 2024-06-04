import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [componentState, updateComponentState] = useState({
    data: [],
    isLoading: true,
    isListEmpty: false,
  });

  // lifecycle method
  useEffect(() => {
    getAllContact();
  }, []);

  const getAllContact = () => {
    let contactRef = firebase.database().ref();

    contactRef.on("value", (dataSnapshot) => {
      if (dataSnapshot.val()) {
        let contactResult = Object.values(dataSnapshot.val());
        let contactKey = Object.keys(dataSnapshot.val());

        contactKey.forEach((value, key) => {
          contactResult[key]["key"] = value;
        });

        return updateComponentState(
          Object.assign({}, componentState, {
            data: contactResult.sort((a, b) => {
              let nameA = a.fname.toUpperCase();
              let nameB = b.fname.toUpperCase();

              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }),
            isListEmpty: false,
            isLoading: false,
          })
        );
      } else {
        return updateComponentState(
          Object.assign({}, componentState, {
            isListEmpty: true,
            isLoading: false,
          })
        );
      }
    });
  };

  // render method
  // if its loading show ActivityIndicator
  if (componentState.isLoading) {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#B83227" />
        <Text style={{ textAlign: "center" }}>
          Contacts loading please wait..
        </Text>
      </View>
    );
  } else if (componentState.isListEmpty) {
    // else if loading is completed and no contact found show this
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <Entypo style={{ alignSelf: "center" }} name="plus" size={35} />
        <Text style={{ textAlign: "center" }}>No Contacts please Add</Text>
        <TouchableOpacity
          onPress={() => {
            // add icon
            //navigate to Add Contact screen
            navigation.navigate("Add");
          }}
          style={styles.floatButton}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  console.log(componentState);
  // return list of contacts
  return (
    <View style={styles.container}>
      <FlatList
        data={componentState.data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                //navigate to view contact screen with passing key
                navigation.navigate("View", {
                  key: item.key,
                });
              }}
            >
              <Card style={styles.listItem}>
                <View>
                  <Image
                    style={styles.contactIcon}
                    source={
                      item.imageDownloadUrl === "empty"
                        ? require("../assets/person.png")
                        : { uri: item.imageDownloadUrl }
                    }
                  />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {item.fname} {item.lname}
                  </Text>
                  <Text style={styles.infoText}>{item.phone}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => {
          // add icon
          //navigate to Add Contact screen
          navigation.navigate("Add");
        }}
        style={styles.floatButton}
      >
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 100,
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
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
