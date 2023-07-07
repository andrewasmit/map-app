import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env'


function Autocomplete({ myLocation }) {

  return (
    <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance'
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: API_KEY,
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