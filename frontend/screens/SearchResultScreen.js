import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import WeatherDisplay from "../components/weather/WeatherDisplay";

export default function SearchResultScreen({ route }) {
  const { setFavoriteList, searchInput } = route.params;

  const api_key = "";

  const nav = useNavigation();

  const [currentCity, setCurrentCity] = useState();
  const [weatherData, setWeatherData] = useState({
    temp: null,
    weather: null,
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
          weather: body.weather[0].description,
        });
      });
  }, []);

  // will add the chosen weatherlocation to favoritesList, COMING SOON
  // right now adding searchInput to the "imaginativeList" and navigating back to mainscreen
  const handlePress = () => {
    nav.navigate("mainscreen");
    setFavoriteList((prev) => prev.concat(searchInput));
  };

  return (
    <ImageBackground
      source={require("../assets/clouds.jpg")}
      resizeMode="cover"
      style={styles.imagebackground}
    >
      <View style={styles.container}>
        <WeatherDisplay currentCity={currentCity} weatherData={weatherData} />
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Add to Favorites</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagebackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationStyle: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.5,
  },
  buttonText: {
    textAlign: "center",
  },
});
