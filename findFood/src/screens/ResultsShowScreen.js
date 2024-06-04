import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.location}>Location:</Text>
      <Text style={styles.location}>
        {result.location.address1}, {result.location.address2},{" "}
        {result.location.city}
      </Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.image} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  location: {
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 5,
  },
  image: {
    alignSelf: "center",
    borderRadius: 5,
    height: 200,
    marginVertical: 5,
    width: 300,
  },
});

export default ResultsShowScreen;
