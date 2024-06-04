import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultsDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: result.image_url }} style={styles.image} />
      <Text style={styles.name}> {result.name} </Text>
      <Text>
        {" "}
        {result.rating} Stars, {result.review_count} Reviews{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  image: {
    borderRadius: 5,
    height: 200,
    width: 250,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ResultsDetail;
