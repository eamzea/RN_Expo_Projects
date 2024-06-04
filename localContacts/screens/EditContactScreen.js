import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
  ScrollView,
  zz,
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

const EditContactScreen = ({ route, navigation }) => {
  const [contactState, updateContactState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    key: "",
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      let key = route.params?.key ?? "";
      getContact(key);
    });
    return unsubscribe;
  }, [navigation]);

  const updateContact = async () => {
    if (
      contactState.firstName !== "" &&
      contactState.lastName !== "" &&
      contactState.phoneNumber !== "" &&
      contactState.email !== "" &&
      contactState.address !== ""
    ) {
      const contact = {
        firstName: contactState.firstName,
        lastName: contactState.lastName,
        phoneNumber: contactState.phoneNumber,
        email: contactState.email,
        address: contactState.address,
      };
      await AsyncStorage.mergeItem(contactState.key, JSON.stringify(contact))
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("All fields are required");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <ScrollView style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <Label>First Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              value={contactState.firstName}
              onChange={(event) =>
                updateContactState(
                  Object.assign({}, contactState, {
                    firstName: event.nativeEvent.text,
                  })
                )
              }
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              value={contactState.lastName}
              onChange={(event) =>
                updateContactState(
                  Object.assign({}, contactState, {
                    lastName: event.nativeEvent.text,
                  })
                )
              }
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Phone Number</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="phone-pad"
              value={contactState.phoneNumber}
              onChange={(event) =>
                updateContactState(
                  Object.assign({}, contactState, {
                    phoneNumber: event.nativeEvent.text,
                  })
                )
              }
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              value={contactState.email}
              onChange={(event) =>
                updateContactState(
                  Object.assign({}, contactState, {
                    email: event.nativeEvent.text,
                  })
                )
              }
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              value={contactState.address}
              onChange={(event) =>
                updateContactState(
                  Object.assign({}, contactState, {
                    address: event.nativeEvent.text,
                  })
                )
              }
            />
          </Item>
        </Form>
        <Button style={styles.button} full onPress={updateContact}>
          <Text style={styles.buttonText}>Update</Text>
        </Button>
        <View style={styles.empty}></View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  inputItem: {
    margin: 10,
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditContactScreen;
