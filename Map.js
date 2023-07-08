import React, { useCallback, useState } from 'react'
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";


export default function Map({ myLocation, setMyLocation }) {

    const onRegionChange = useCallback((e) => {
        // setMyLocation(e);
        console.log(e)
      }, []);


  return (
    <MapView
        style={styles.map}
        provider={ PROVIDER_GOOGLE }
        onRegionChange={onRegionChange}
        region={myLocation}
        // initialRegion={{
        //   // Dallas
        //   latitude: 32.8053592247793,
        //   latitudeDelta: 0.865790580988083,
        //   longitude: -96.79484700876957,
        //   longitudeDelta: 0.5265133564613365,
        // }}
      >
        <Marker
          coordinate={myLocation}
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
  )
}

const styles = StyleSheet.create({
    map: {
      width: "100%",
      height: "100%",
    },
  });