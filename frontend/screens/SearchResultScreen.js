import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import WeatherDisplay from "../components/weatherDisplay/WeatherDisplay";

export default function SearchResultScreen({ route }) {

  const { setFavoriteList, searchInput, favoriteList } = route.params;
  
  const api_key = "";

  const nav = useNavigation();
  
  const [currentCity, setCurrentCity] = useState()
  const [weatherData, setWeatherData] = useState({
    temp: null,
    weather: null
  });
  
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${api_key}&units=metric`
    )
      .then((res) => res.json())
      .then((body) => {
        setCurrentCity(body.name);
        setWeatherData({
          temp: body.main.temp,
          weather: body.weather[0].description
        });
      });
  
}, [])

// will add the chosen weatherlocation to favoritesList, COMING SOON
// right now adding searchInput to the "imaginativeList" and navigating back to mainscreen
  const handlePress = () => {
    nav.navigate("mainscreen");
    setFavoriteList((prev) => prev.concat(searchInput));
  };


  return (
    <View style={styles.container}>
      <WeatherDisplay currentCity={currentCity} weatherData={weatherData} />
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
    justifyContent: "center",
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
