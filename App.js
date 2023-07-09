import { StatusBar } from "expo-status-bar";
import { useCallback, useState, useEffect } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import Autocomplete from "./Autocomplete";
import Map from "./Map";


export default function App() {
  const [myLocation, setMyLocation] = useState({
    latitude: 32.8053592247793,
    latitudeDelta: 0.865790580988083,
    longitude: -96.79484700876957,
    longitudeDelta: 0.5265133564613365,
  });

  // const [region, setRegion] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync();
      setMyLocation({
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 0.865790580988083,
        longitude: currentLocation.coords.longitude,
        longitudeDelta: 0.5265133564613365
      });
      console.log("Location AFTER PERMISSION: ", myLocation);
    };
    getPermissions();
  }, []);

  const geocode = async (region)=>{
    const geocodedLocation = await Location.geocodeAsync(region);
    console.log("Geocoded Location: ")
    setMyLocation({
      latitude: geocodedLocation[0].latitude,
      latitudeDelta: 0.1874635234195665,
      longitude: geocodedLocation[0].longitude,
      longitudeDelta: 0.10968223214149475
    });
    console.log("after geocode: ", myLocation);
  }

  return (
    <View style={{marginTop: 50, flex:1}}>
      <Autocomplete 
        myLocation={myLocation} 
        setMyLocation={setMyLocation} 
        geocode={geocode}
      />
      <Map 
        myLocation={myLocation} 
        setMyLocation={setMyLocation} 
      />
      <StatusBar style="auto" />
    </View>
  );
};