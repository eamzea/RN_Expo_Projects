import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const MyApp = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          padding: 24,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.incCounter()}
        >
          <Text style={{ color: "#FFF" }}>Increase</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginHorizontal: 8 }}>
          {props.myCounter}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.decCounter()}
        >
          <Text style={{ color: "#FFF" }}>Decrease</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    myCounter: state.myCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incCounter: () =>
      dispatch({
        type: "INC_COUNTER",
      }),
    decCounter: () =>
      dispatch({
        type: "DEC_COUNTER",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#000",
  },
});
