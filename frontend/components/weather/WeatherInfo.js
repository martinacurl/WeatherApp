import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import WeatherDisplay from "./WeatherDisplay";
import { API_KEY } from "@env";

const WeatherInfo = ({ currentLat, currentLong }) => {
  const [currentCity, setCurrentCity] = useState();
  const [weatherData, setWeatherData] = useState({
    temp: null,
    weather: null,
  });

  // fetching data from API, sending in the values from LocationInfo
  const getCurrentWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((body) => {
        setCurrentCity(body.name);
        setWeatherData({
          temp: body.main.temp,
          weather: body.weather[0].description,
        });
      })
      .catch((e) => console.log(e));
  };

  //checking if currentLat and CurrentLong have a value before calling GetCurrentWeather
  useEffect(() => {
    if (currentLat && currentLong) {
      getCurrentWeather();
    }
  }, [currentLat, currentLong]);

  return (
    <View style={styles.currentLocationStyle}>
      <WeatherDisplay currentCity={currentCity} weatherData={weatherData} />
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  currentLocationStyle: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
