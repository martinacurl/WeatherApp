import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
  DeviceEventEmitter,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import WeatherDisplay from "../components/weather/WeatherDisplay";
import { insert, findAll } from "../utils/db";
import WeatherFavorite from "../entities/WeatherFavorite";

export default function SearchResultScreen({ route }) {
  const { searchInput, favorite } = route.params;

  const api_key = "";

  const nav = useNavigation();

  const [geoResult, setGeoResult] = useState({ lon: null, lat: null });
  const [currentCity, setCurrentCity] = useState();
  const [weatherData, setWeatherData] = useState({
    temp: null,
    weather: null,
  });

  useEffect(() => {
    // console.log(searchInput || favorite.city);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        searchInput || favorite.city
      }&appid=${api_key}&units=metric`
    )
      .then((res) => res.json())
      .then((body) => {
        if (body.message == "city not found") {
          nav.navigate("mainscreen");
          Alert.alert("City not found. Try again.");
        } else {
          const lat = body.coord.lat;
          const lon = body.coord.lon;
          setGeoResult({ lon, lat });
          setCurrentCity(body.name);
          setWeatherData({
            temp: body.main.temp,
            weather: body.weather[0].description,
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);

  // adding searched weatherlocation to favoritesList
  const handlePress = async () => {
    await insert(
      new WeatherFavorite(currentCity, geoResult.lat, geoResult.lon)
    );
    DeviceEventEmitter.emit("renderToMainScreen");
    nav.navigate("mainscreen");
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
        <Pressable
          style={styles.button}
          onPress={() => nav.navigate("mainscreen")}
        >
          <Text style={styles.buttonText}>Go Back</Text>
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
