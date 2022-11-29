import * as Location from "expo-location";
import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import WeatherInfo from "../weather/WeatherInfo";

const LocationInfo = ({ api_key }) => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const [location, setLocation] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

  // checking location permissions - if granted - get and set current position
  // if not, setting default values(location) to Malmö
  useEffect(() => {
    const getLocation = async () => {      
      if (status?.granted === false && status?.canAskAgain !== false) {
        await requestPermission();
        // setCurrentLat(55.6052931);
        // setCurrentLong(13.0001566);
      }
      else if (status?.granted === true) {
        const loc = await Location.getCurrentPositionAsync();
        
        console.log("LOC in uEff", loc);
        setLocation(loc)
      } else if (status != null) {
        setCurrentLat(55.6052931);
        setCurrentLong(13.0001566);
      }
    };

    getLocation();
  }, [status]);

  if (status === null) {
    console.log("nullvärde på status"); //laddnings icon?
    return <View />;
  }

  return (
    <View style={styles.currentLocationStyle}>
      <Text>CurrentLat: {currentLat}</Text>
      <Text>CurrentLong: {currentLong}</Text>
      <Text>Location.coords.lat: { location?.coords.latitude}</Text>
      <Text>Location.coords.long: { location?.coords.longitude}</Text>
      <WeatherInfo
        api_key={api_key}
        currentLat={ !currentLat ? 
          location?.coords.latitude : currentLat}
        currentLong={ !currentLong ?
          location?.coords.longitude : currentLong }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  currentLocationStyle: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default LocationInfo;
