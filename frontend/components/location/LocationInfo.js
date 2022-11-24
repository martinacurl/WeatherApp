import * as Location from "expo-location";
import { Linking, Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import LocationDisplay from "./LocationDisplay";

const LocationInfo = ({ location, setLocation, api_key }) => {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [weatherData, setWeatherData] = useState();
  const [currentLoc, setCurrentLoc] = useState({
    country: null,
    city: null,
    weather: null,
  });

  // checking location permissions - if granted - get current position
  useEffect(() => {
    const getLocation = async () => {
      if (status?.granted === false && status?.canAskAgain !== false) {
        await requestPermission();
      } else if (status?.granted === true) {
        const loc = await Location.getCurrentPositionAsync();
        setLocation(loc);
      } else if (status != null) {
        Linking.openSettings();
      }
    };

    // if we dont have location yet, we ask for it and fetch malmo data until we have it
    if (!location) {
      getLocation();
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q={Malmö}&limit=1&appid=${api_key}`
      )
        .then((res) => res.json())
        .then((body) => {
          console.log("GEOLOCATE body", body);
          console.log(body[0].name);
          console.log("LATITUDE", body[0].lat, "LONGITUDE", body[0].lon);
        });
    }

    // if we have location we fetching data from API using long and lat
    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${api_key}&units=metric`
      )
        .then((res) => res.json())
        .then((body) => {
          console.log("WEATHER API: ", body);
          // console.log(
          //   "WEATHER; main temp: ",
          //   body.main.temp,
          //   "MAX",
          //   body.main.temp_max,
          //   "MIN",
          //   body.main.temp_min,
          //   "sunrise",
          //   body.sys.sunrise
          // );
          setCurrentLoc({
            city: body.name,
            country: body.sys.country,
            weather: body.weather[0].description,
          });
          setWeatherData(body.main.temp);
        });
    }
  }, [status, location]);

  if (status === null) {
    console.log("nullvärde på status");
    return <View />;
  }

  return (
    <View style={styles.currentLocationStyle}>
      <LocationDisplay currentLoc={currentLoc} />
    </View>
  );
};

const styles = StyleSheet.create({
  currentLocationStyle: {
    // när det blir flex 1 här - försvinner den från main screen
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",

    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default LocationInfo;
