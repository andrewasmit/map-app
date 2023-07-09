import React, { useCallback, useEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PLACES_API_KEY, OPENTRIP_API_KEY, OPENTRIP_BASE_URL } from '@env'
// import * as Location from 'expo-location'


function Autocomplete({ myLocation, setMyLocation, geocode }) {

  const handleSearchSubmit = useCallback((data, details = null) => {
    geocode(details.vicinity);
  })


  const fetchNearbyPlaces = ()=>{
    const lon = myLocation.longitude
    const lat = myLocation.latitude 

    fetch(`${OPENTRIP_BASE_URL}lon=${lon}&lat=${lat}&format=json&limit=200&apikey=${OPENTRIP_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    //  This data return is nearby attractions in the form of an array of objects (capped at 200 within a 5000m radius)
    // Here is a sample object of returned data

    // {
    //  "dist": 105.28873891, 
    //   "kinds": "theatres_and_entertainments,cultural,interesting_places,other_theatres", 
    //   "name": "Undermain Theatre", 
    //   "point": {
    //     "lat": 32.78498077392578, 
    //     "lon": -96.77764892578125
    //    }, 
    //   "rate": 2, 
    //   "wikidata": "Q7883714", 
    //   "xid": "Q7883714"
    // }
  };

  useEffect(()=>{
    fetchNearbyPlaces()
  },[myLocation]);


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