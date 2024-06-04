import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

const AddContactScreen = ({ navigation }) => {
  const [contactState, updateContactState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const saveContact = async () => {
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
      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
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
        <Button style={styles.button} full onPress={saveContact}>
          <Text style={styles.buttonText}>Save</Text>
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
    height: 500,
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
  empty: {
    height: 500,
    backgroundColor: "#FFF",
  },
});

export default AddContactScreen;
