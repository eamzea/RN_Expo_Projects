import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";
import { StackActions } from "@react-navigation/native";
import * as firebase from "firebase";

const SignInScreen = ({ navigation }) => {
  const [userState, updateUserState] = useState({
    email: "",
    password: "",
  });

  const signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userState.email, userState.password)
      .then(() => {
        navigation.dispatch(StackActions.replace("Home"));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} />
        <Text>Sign In</Text>
      </View>
      <Form style={styles.form}>
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
        <Button style={styles.button} full rounded onPress={signInUser}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Button>
      </Form>
      <View style={styles.footer}>
        <Text>OR</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
          <Text style={{ marginVertical: 24 }}>Create new account</Text>
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
    marginBottom: 30,
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

export default SignInScreen;
