import { View, Text, StyleSheet } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Placeholder for SearchBar</Text>
      </View>
      <View>
        <Text>Placeholder for weather location/Malmö</Text>
      </View>
      <View>
        <Text>Placeholder for list of favorits</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
