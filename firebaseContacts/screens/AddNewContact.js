import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import * as Random from "expo-random";
import * as firebase from "firebase";
import { Form, Item, Input, Label, Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { CommonActions } from "@react-navigation/native";

const AddNewContactScreen = ({ navigation }) => {
  const [contactState, updateContactState] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    image: "empty",
    imageDownloadUrl: "empty",
    isUploading: false,
    isLoading: true,
  });

  const setNewContact = async () => {
    if (
      contactState.fname !== "" &&
      contactState.lname !== "" &&
      contactState.phone !== "" &&
      contactState.email !== "" &&
      contactState.address !== ""
    ) {
      updateContactState(
        Object.assign({}, contactState, { isUploading: true })
      );

      const storageRef = firebase.storage().ref();

      if (contactState.image !== "empty") {
        const downloadURL = await uploadImageAsync(
          contactState.image,
          storageRef
        );

        updateContactState(
          Object.assign({}, contactState, { imageDownloadUrl: downloadURL })
        );
      }

      saveContact();
    } else {
      Alert.alert("All inputs are required");
    }
  };

  const saveContact = async () => {
    let contact = {
      fname: contactState.fname,
      lname: contactState.lname,
      phone: contactState.phone,
      email: contactState.email,
      address: contactState.address,
      imageDownloadUrl: contactState.imageDownloadUrl,
    };

    const dbReference = firebase.database().ref();

    await dbReference.push(contact, (error) => {
      if (!error) {
        return navigation.dispatch(CommonActions.goBack());
      }
    });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
        base64: true,
      });

      if (!result.cancelled) {
        updateContactState(
          Object.assign({}, contactState, { image: result.uri })
        );
      }
    } catch (E) {
      console.log(E);
    }
  };

  const uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".");
    const fileExtension = parts[parts.length - 1];

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        console.log(e);
        reject(new TypeError("Network Request Failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send();
    });

    let uid = await Random.getRandomBytesAsync(16);

    const ref = storageRef.child("Contact").child(uid + "." + fileExtension);
    const snapshot = await ref.put(blob);

    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  //render method
  if (contactState.isUploading) {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#B83227" />
        <Text style={{ textAlign: "center" }}>
          Contact Uploading please wait..
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={20} // adjust the value here if you need more padding
      style={{ flex: 1 }}
      behavior="padding"
    >
      <TouchableWithoutFeedback
        onPress={() => {
          // dismiss the keyboard if touch any other area then input
          Keyboard.dismiss();
        }}
      >
        <ScrollView style={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                contactState.image === "empty"
                  ? require("../assets/person.png")
                  : {
                      uri: contactState.image,
                    }
              }
              style={styles.imagePicker}
            />
          </TouchableOpacity>

          <Form>
            <Item style={styles.inputItem} floatingLabel>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(fname) =>
                  updateContactState(Object.assign({}, contactState, { fname }))
                }
              />
            </Item>
            <Item style={styles.inputItem} floatingLabel>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(lname) =>
                  updateContactState(Object.assign({}, contactState, { lname }))
                }
              />
            </Item>
            <Item style={styles.inputItem} floatingLabel>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={(phone) =>
                  updateContactState(Object.assign({}, contactState, { phone }))
                }
              />
            </Item>
            <Item style={styles.inputItem} floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) =>
                  updateContactState(Object.assign({}, contactState, { email }))
                }
              />
            </Item>
            <Item style={styles.inputItem} floatingLabel>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={(address) =>
                  updateContactState(
                    Object.assign({}, contactState, { address })
                  )
                }
              />
            </Item>
          </Form>

          <Button style={styles.button} full rounded onPress={setNewContact}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  imagePicker: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#c1c1c1",
    borderWidth: 2,
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

export default AddNewContactScreen;
