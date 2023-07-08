import React, { useCallback } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY } from '@env'
import * as Location from 'expo-location'


function Autocomplete({ myLocation, setMyLocation, geocode }) {

  const handleSearchSubmit = useCallback((data, details = null) => {
    geocode(details.vicinity);
    console.log(details.vicinity)
  })

  // const geocode = async (region)=>{
  //   const geocodedLocation = await Location.geocodeAsync(region);
  //   console.log("Geocoded Location: ")
  //   console.log(geocodedLocation)
  // }

  return (
    <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance'
        }}
        onPress={handleSearchSubmit}
        query={{
          key: PLACES_API_KEY,
          language: "en",
          components: 'country:us',
          types: 'establishment',
          // **** Look in docs for all the different types to search for ****
          radius: 30000,
          location: `${myLocation.latitude}, ${myLocation.longitude}`
        }}
        styles={{
          container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
          listView: { backgroundColor: 'white' }
        }}
      />
  )
}

export default Autocomplete