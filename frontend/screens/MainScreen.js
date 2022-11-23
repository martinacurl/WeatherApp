import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import LocationInfo from "../components/LocationInfo/LocationInfo";

export default function MainScreen() {
  const [favoriteList, setFavoritList] = useState(["hej", "san"]);

  const _renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Placeholder for SearchBar</Text>
      </View>
      <View>
        <LocationInfo />
      </View>
      <View>
        <FlatList data={favoriteList} renderItem={_renderItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
