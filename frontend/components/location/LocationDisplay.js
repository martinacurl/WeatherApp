import { Text, View, StyleSheet } from "react-native";

const LocationDisplay = ({ currentLoc, weatherData }) => {
  return (
    <View style={styles.currentLocationStyle}>
      <Text style={styles.text}>WEATHER</Text>
      <Text>
        {currentLoc.city ? currentLoc.city : "Malmö"} /
        {currentLoc.country ? currentLoc.country : "SE"}
      </Text>
      {/* <Text>Country: {currentLoc.country ? currentLoc.country : ""}</Text>
      <Text>City: {currentLoc.city ? currentLoc.city : ""}</Text> */}
      <Text>Weather: {currentLoc.weather ? currentLoc.weather : ""}</Text>
      {/* <Text>
        Lat: {location?.coords.latitude}, Long: {location?.coords.longitude}
      </Text> */}
      <Text>Main temp: {weatherData}C</Text>
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

export default LocationDisplay;
