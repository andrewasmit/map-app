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