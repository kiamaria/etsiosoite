import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [address, setAddress] = useState("");
  const [placeCoordinates, setPlaceCoordinates] = useState(null);


  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("No permission to get location");
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setPlaceCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      } catch (error) {
        Alert.alert("Error fetching location", error.message);
      }
    };

    getLocation();
  }, []); 

  const getCoordinates = async () => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${address}&api_key=65cc9f4ed4734028628277lrc4beba1`
      );
      const data = await response.json();

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
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />

      <Button title="Show" onPress={getCoordinates} />

      <MapView style={styles.map} region={placeCoordinates}>
        <Marker coordinate={placeCoordinates} title={address} />
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
    height: "80%",
  },
  input: {
    fontSize: 20,
    width: 200,
  },
});
