import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Random from "expo-random";
import { ImagePicker } from "expo";
import { Form, Item, Input, Label, Button } from "native-base";
import { CommonActions } from "@react-navigation/native";
import * as firebase from "firebase";

const EditContactScreen = ({ navigation, route }) => {
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
    key: "",
  });

  useEffect(() => {
    let { key } = route.params;
    getContact(key);
  }, []);

  //TODO: getContact  method
  const getContact = async (key) => {
    let contactRef = firebase.database().ref().child(key);

    await contactRef.on("value", (dataSnapshot) => {
      if (dataSnapshot.val()) {
        let contactValue = dataSnapshot.val();
        return updateContactState(
          Object.assign({}, contactState, {
            fname: contactValue.fname,
            lname: contactValue.lname,
            phone: contactValue.phone,
            email: contactValue.email,
            address: contactValue.address,
            imageDownloadUrl: contactValue.imageDownloadUrl,
            key: key,
            isLoading: false,
          })
        );
      }
    });
  };

  //TODO: update contact method
  const updateContact = async (key) => {
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

      const dbReference = firebase.database().ref();
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

      let contact = {
        fname: contactState.fname,
        lname: contactState.lname,
        phone: contactState.phone,
        email: contactState.email,
        address: contactState.address,
        imageDownloadUrl: contactState.imageDownloadUrl,
      };

      await dbReference.child(key).set(contact, (error) => {
        if (!error) {
          return navigation.dispatch(CommonActions.goBack());
        }
      });
    }
  };

  //TODO: pick image from gallery
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

  //TODO: upload to firebase
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
      xhr.send(null);
    });

    let uid = await Random.getRandomBytesAsync(16);

    const ref = storageRef
      .child("ContactImages")
      .child(uid + "." + fileExtension);
    const snapshot = await ref.put(blob);

    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  // render method
  if (contactState.isUploading) {
    return (
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#B83227" />
        <Text style={{ textAlign: "center" }}>
          Contact Updateing please wait..
        </Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback
        onPress={() => {
          // dismiss the keyboard if touch any other area then input
          Keyboard.dismiss();
        }}
      >
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              source={
                contactState.imageDownloadUrl === "empty"
                  ? require("../assets/person.png")
                  : {
                      uri: contactState.imageDownloadUrl,
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
                value={
                  // set current contact value to input box
                  contactState.fname
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
                value={contactState.lname}
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
                value={contactState.phone}
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
                value={contactState.email}
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
                value={contactState.address}
              />
            </Item>
          </Form>

          <Button
            style={styles.button}
            full
            rounded
            onPress={() => {
              updateContact(contactState.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
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
  inputItem: {
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
