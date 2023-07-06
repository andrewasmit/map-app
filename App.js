import { StatusBar } from 'expo-status-bar';
import { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

export default function App() {
  const [location, setLocation] = useState();

  useEffect(()=>{
    const getPermissions = async ()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        console.log("Please grant permission")
        return
      } 
      
      let currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation);
      console.log("Location: ", currentLocation);
    }
    getPermissions();
  }, []);

  const onRegionChange = useCallback((region) =>{
    console.log(region);
  }, []);

  return (
    <View style={styles.container}>
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
    height: '100%'
  }
});
