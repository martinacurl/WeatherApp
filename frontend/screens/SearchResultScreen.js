import { View, Text, StyleSheet } from "react-native";

//Not in use yet, will be connected with pressable from main mainscreen searchbar lateon
export default function SearchResultScreen() {
  return (
    <View style={styles.container}>
      <Text> SEARCH RESULT PRESENTED</Text>
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
