import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { Context as TrackContext } from "../context/TrackContext";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");

  const track = state.tracks.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <>
      <Text style={styles.title}>{track.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.001,
          latitudeDelta: 0.001,
          ...initialCoords,
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    textAlign: "center",
  },
  map: {
    height: 200,
  },
});

export default TrackDetailScreen;
