import { View, Text, StyleSheet } from "react-native"

const WeatherDisplay = ({currentCity, weatherData}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Weather Info</Text>
            <Text>City: {currentCity}</Text>
            <Text>Temp: { weatherData.temp}°C</Text>
            <Text>Weather: { weatherData.weather}</Text>
        </View>
    )

}

export default WeatherDisplay;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      margin: 10,
      padding: 10,
    },
    text: {
      fontWeight: "bold",
      fontSize: 30,
    },
  });
