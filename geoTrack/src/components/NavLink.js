import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Spacer from "../components/Spacer";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default withNavigation(NavLink);
