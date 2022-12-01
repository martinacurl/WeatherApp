import { View, Text, StyleSheet } from "react-native";

const WeatherDisplay = ({ currentCity, weatherData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Current Weather</Text>
      <Text style={styles.text}>{currentCity}</Text>
      <Text style={styles.text}>{weatherData.temp}°C</Text>
      <Text style={styles.text}>{weatherData.weather}</Text>
    </View>
  );
};

export default WeatherDisplay;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  headText: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 15,
  },
  text: {
    // fontWeight: "bold",
    fontSize: 17,
    padding: 1,
  },
});
