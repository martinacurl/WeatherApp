import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LocationDisplay from "../components/location/LocationDisplay";
import { useState, useEffect } from "react";
//Not in use yet, will be connected with pressable from main mainscreen searchbar lateon
export default function SearchResultScreen({ route }) {
  const { setFavoriteList, searchInput, favoriteList, api_key } = route.params;

  //will add the chosen weatherlocation to favoritesList, COMING SOON
  // right now adding String to the "imaginativeList" and navigating back to mainscreen

  const [currentLoc, setCurrentLoc] = useState({
    country: null,
    city: null,
    weather: null,
  });
  const [weatherData, setWeatherData] = useState();

  const handlePress = () => {
    nav.navigate("mainscreen");
    setFavoriteList((prev) => prev.concat("test"));
  };

  useEffect(() => {
    if (searchInput && !currentLoc) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${api_key}`
      )
        .then((res) => res.json())
        .then((body) => {
          if (!currentLoc) {
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${body[0].lat}&lon=${body[0].lon}&appid=${api_key}&units=metric`
            )
              .then((res) => res.json())
              .then((body) => {
                setCurrentLoc({
                  city: body.name,
                  country: body.sys.country,
                  weather: body.weather[0].description,
                });
                setWeatherData(body.main.temp);
              });
          }
        });
    }
  }, [currentLoc, searchInput]);

  return (
    <View style={styles.container}>
      <LocationDisplay currentLoc={currentLoc} weatherData={weatherData} />
      <Pressable onPress={handlePress}>
        <Text style={{ margin: 10, padding: 10, backgroundColor: "#FFF" }}>
          Add to Favorites
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

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
