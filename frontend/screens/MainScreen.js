import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import LocationInfo from "../components/LocationInfo/LocationInfo";
import SearchBar from "../components/searchbar/SearchBar";

export default function MainScreen() {
  const [location, setLocation] = useState();
  const [favoriteList, setFavoritList] = useState(["hej", "san"]);

  // const latitude = location?.coords.latitude;
  // const longitude = location?.coords.longitude;

  const [searchInput, setSearchInput] = useState("");
  const [clicked, setClicked] = useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* SEARCHBAR */}
      <SearchBar
        location={location}
        setLocation={setLocation}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setClicked={setClicked}
      />

      {/* Current location weather or Malmö */}
      <LocationInfo location={location} setLocation={setLocation} />

      {/* List of favotites */}
      <FlatList data={favoriteList} renderItem={_renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
