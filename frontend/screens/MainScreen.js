import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import SearchBar from "../components/searchbar/SearchBar";
import LocationInfo from "../components/LocationInfo/LocationInfo";
import FavoriteList from "../components/FavoriteList/FavoriteList";
import { useNavigation } from "@react-navigation/native";

export default function MainScreen({ route }) {
  const [location, setLocation] = useState();
  const [favoriteList, setFavoritList] = useState(["hej", "san"]);

  // const latitude = location?.coords.latitude;
  // const longitude = location?.coords.longitude;

  const [searchInput, setSearchInput] = useState("");
  const [clicked, setClicked] = useState(false);

  const nav = useNavigation();

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
      <Pressable
        onPress={() =>
          nav.navigate("searchresultscreen", { favoriteList, setFavoriteList })
        }
      >
        <Text>Search Bar Coming Soon, click me</Text>
      </Pressable>

      {/* Current location weather or Malmö */}
      <LocationInfo location={location} setLocation={setLocation} />

      {/* List of favotites */}
      <FavoriteList favoriteList={favoriteList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-around",
    marginTop: 100,
  },
});
