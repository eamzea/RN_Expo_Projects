import React, { useContext } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { NavigationEvents } from "react-navigation";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  console.log(state);

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />

      <FlatList
        data={state.tracks}
        keyExtractor={(item) => {
          item._id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 48,
  },
});

TrackListScreen.navigationOptions = {
  title: "Tracks",
};

export default TrackListScreen;
