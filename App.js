import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, Button, TextInput, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function App() {
  const [location, setLocation] = useState({
    latitude: 32.8053592247793,
    longitude: -96.79484700876957,
  });
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      console.log("Location AFTER PERMISSION: ", location);
    };
    getPermissions();
  }, []);

  // if(location){
  //   console.log("LOCATION: ", location)
  // }

  const onRegionChange = useCallback((region) => {
    // console.log("CHANGED REGION: ", region);
  }, []);

  const handleAddressInput = useCallback(
    (e) => {
      setAddress(e);
    },
    [address]
  );

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address: ", geocodedLocation);
    setAddress("");
  };

  return (
    <View style={{marginTop: 50, flex:1}}>
      {/* <TextInput placeholder="Address" value={address} onChangeText={handleAddressInput} />
      <Button title="Geocode Address" onPress={geocode} /> */}

      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "",
          language: "en",
        }}
        styles={{
          container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
          listView: { backgroundColor: 'white' }
        }}
      />

      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          // Dallas
          latitude: 32.8053592247793,
          latitudeDelta: 0.865790580988083,
          longitude: -96.79484700876957,
          longitudeDelta: 0.5265133564613365,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          draggable={true}
          onDragStart={(e) =>
            console.log("Drag start: ", e.nativeEvent.coordinate)
          }
          onDragEnd={(e) => console.log("Drag end: ", e.nativeEvent.coordinate)}
        >
          <Callout>
            <Text>I am here.</Text>
          </Callout>
        </Marker>
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
    height: "100%",
  },
});
