import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage,
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

const ViewContactScreen = ({ route, navigation }) => {
  const [contactState, updateContactState] = useState({
    firstName: "DummyText",
    lastName: "DummyText",
    phoneNumber: "DummyText",
    email: "DummyText",
    address: "DummyText",
    key: "DummyText",
  });

  const getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then((contactString) => {
        let contact = JSON.parse(contactString);
        contact["key"] = key;

        updateContactState(contact);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const callAction = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((error) => console.log(error));
  };

  const smsAction = (phone) => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((error) => console.log(error));
  };

  const editContact = (key) => {
    navigation.navigate("Edit", { key });
  };

  const deleteContact = (key) => {
    Alert.alert(
      "Delete Contact ?",
      `${contactState.firstName} ${contactState.lastName}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel tap"),
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem(contactState.key)
              .then(() => {
                navigation.navigate("Home");
              })
              .catch((error) => console.log(error));
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      let key = route.params?.key ?? "";
      getContact(key);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contactIconContainer}>
        <Text style={styles.contactIcon}>
          {contactState.firstName[0].toUpperCase()}
        </Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {contactState.firstName} {contactState.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Phone</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{contactState.phoneNumber}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Email</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{contactState.email}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Address</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{contactState.address}</Text>
          </CardItem>
        </Card>
      </View>
      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={() => smsAction(contactState.phoneNumber)}>
            <Entypo name="message" size={50} color="#b83227" />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity
            onPress={() => callAction(contactState.phoneNumber)}
          >
            <Entypo name="phone" size={50} color="#b83227" />
          </TouchableOpacity>
        </CardItem>
      </Card>
      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={() => editContact(contactState.key)}>
            <Entypo name="edit" size={36} color="#b83227" />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={styles.actionButton}>
          <TouchableOpacity onPress={() => deleteContact(contactState.key)}>
            <Entypo name="trash" size={36} color="#b83227" />
          </TouchableOpacity>
        </CardItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff",
  },
  nameContainer: {
    width: "100%",
    height: 100,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  name: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "900",
  },
  infoContainer: {
    flexDirection: "column",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300",
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900",
  },
});

export default ViewContactScreen;
