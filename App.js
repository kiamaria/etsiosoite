import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {

  const [address, setAddress] = useState("");
  const [placeCoordinates, setPlaceCoordinates] = useState({
    latitude: 60.2017497768936,
    longitude: 24.933790340295058,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getCoordinates = async () => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${address}&api_key=65cc9f4ed4734028628277lrc4beba1`);
      const data = await response.json();

      console.log(data);

      const location = {
        name: data[0].display_name,
        latitude: data[0].lat,
        longitude: data[0].lon,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      };

      setPlaceCoordinates(location);

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)} />
      
      <Button title="Show" onPress={getCoordinates} />

      <MapView style={styles.map} region={placeCoordinates}>
        <Marker style={{color: pink} } coordinate={placeCoordinates} title={address} />
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "70%",
  },
  input: {
    fontSize: 20,
    width: 200,
  },
});
