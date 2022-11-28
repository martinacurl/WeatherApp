import * as Location from "expo-location";
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import WeatherInfo from "../weather/WeatherInfo";

const LocationInfo = ({ api_key }) => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();

  // checking location permissions - if granted - get and set current position
  // if not, setting default values(location) to Malmö
  useEffect(() => {
    const getLocation = async () => {
      if (status?.granted === false) {
        setCurrentLat(55.6052931);
        setCurrentLong(13.0001566);
        await requestPermission();
      } else if (status?.granted === true) {
        const loc = await Location.getCurrentPositionAsync();
        setCurrentLat(loc.coords.latitude);
        setCurrentLong(loc.coords.longitude);
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
      <WeatherInfo
        api_key={api_key}
        currentLat={currentLat}
        currentLong={currentLong}
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
