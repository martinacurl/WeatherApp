import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import WeatherDisplay from "./WeatherDisplay";


const WeatherInfo = ({api_key, currentLat, currentLong }) => {

    const [currentCity, setCurrentCity] = useState();
    const [weatherData, setWeatherData] = useState({
        temp: null,
        weather: null
      });
    
    const getCurrentWeather = () => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${api_key}&units=metric`
        )
            .then((res) => res.json())
            .then((body) => {
                setCurrentCity(body.name)
                setWeatherData({
                    temp: body.main.temp,
                    weather: body.weather[0].description
                });
            });
}

    useEffect(() => {
        getCurrentWeather()      
   }, [currentLat]) 

    return (
        // MAYBE USE WEATHER DISPLAY HERE, TOO, INSTEAD OF REPEATING 
        <View style={styles.currentLocationStyle}>
            <Text style={styles.text}>Weather Info</Text>
            <Text>City: {currentCity}</Text>
            <Text>Temp: { weatherData.temp}°C</Text>
            <Text>Weather: { weatherData.weather}</Text>
        </View> 
    )

}

export default WeatherInfo;

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
  