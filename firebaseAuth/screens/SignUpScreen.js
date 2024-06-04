import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import * as firebase from "firebase";
import { Form, Item, Input, Label, Button } from "native-base";

const SignUpScreen = ({ navigation }) => {
  const [userState, updateUserState] = useState({
    email: "",
    passsword: "",
    name: "",
  });

  const signUpUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authenticate) => {
        return authenticate.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            navigation.dispatch(StackActions.replace("Home"));
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
        <Text>Sign Up</Text>
      </View>
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label>Name</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={(name) =>
              updateUserState(Object.assign({}, userState, { name }))
            }
          />
        </Item>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(email) =>
              updateUserState(Object.assign({}, userState, { email }))
            }
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="visible-password"
            onChangeText={(password) =>
              updateUserState(Object.assign({}, userState, { password }))
            }
          />
        </Item>
        <Button
          style={styles.button}
          full
          rounded
          onPress={() => {
            signUpUser(userState.name, userState.email, userState.password);
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </Form>
      <View style={styles.footer}>
        <Text>OR</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={{ marginVertical: 24 }}>Alredy have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100,
  },
  form: {
    padding: 20,
    width: "100%",
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  footer: {
    alignItems: "center",
  },
});

export default SignUpScreen;
