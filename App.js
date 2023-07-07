import { StatusBar } from 'expo-status-bar';
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, Button, TextInput, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  

  useEffect(()=>{
    const getPermissions = async ()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        console.log("Please grant permission")
        return
      } 
      
      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);
      // console.log("Location: ", currentLocation);
    }
    getPermissions();
  }, []);


  if(location){
    console.log("LOCATION :", location)
  }

  const onRegionChange = useCallback((region) =>{
    console.log("CHANGED REGION: ", region);
  }, []);


  const handleAddressInput = useCallback((e)=>{
    setAddress(e)
  }, [address]);

  const geocode = async ()=>{
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address: ", geocodedLocation);
    setAddress("");
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Address" value={address} onChangeText={handleAddressInput} />
      <Button title="Geocode Address" onPress={geocode} />
      <MapView 
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          // Dallas
          latitude: 32.8053592247793, 
          latitudeDelta: 0.865790580988083, 
          longitude: -96.79484700876957, 
          longitudeDelta: 0.5265133564613365
        }}
      >
        <Marker 
          coordinate={{
            latitude: 32.8053592247793, 
            longitude: -96.79484700876957
          }} 
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: '100%',
    height: '80%'
  }
});


// Location = {
//   "coords": {
//     "accuracy": 8.933091382932549, 
//     "altitude": 197.318115234375, 
//     "altitudeAccuracy": 4, 
//     "heading": 275.9765625, 
//     "latitude": 32.92318250055697, 
//     "longitude": -96.6960574408031, 
//     "speed": 0.2199999988079071
//   }, 
//   "timestamp": 1688738400999.975
// }