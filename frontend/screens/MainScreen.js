import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import SearchBar from "../components/searchbar/SearchBar";
import LocationInfo from "../components/location/LocationInfo";
import FavoriteList from "../components/FavoriteList/FavoriteList";
// import { useNavigation } from "@react-navigation/native";
import { AppBar } from "@react-native-material/core";

export default function MainScreen() {
  const api_key = "";

  const [location, setLocation] = useState();
  const [favoriteList, setFavoriteList] = useState(["hej", "san"]);
  const [searchInput, setSearchInput] = useState("");

  // const nav = useNavigation();
  const [currentLoc, setCurrentLoc] = useState({
    country: null,
    city: null,
    weather: null,
  });

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
      <AppBar
        color="blue"
        tintColor="black"
        title="Todays Weather"
        centerTitle={true}
        titleStyle={[
          {
            fontWeight: "bold",
            marginTop: 20,
          },
        ]}
      >
        <SearchBar
          favoriteList={favoriteList}
          setFavoriteList={setFavoriteList}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          currentLoc={currentLoc}
          setCurrentLoc={setCurrentLoc}
          api_key={api_key}
        />
      </AppBar>

      {/* Current location weather or Malmö */}
      <LocationInfo
        location={location}
        setLocation={setLocation}
        currentLoc={currentLoc}
        setCurrentLoc={setCurrentLoc}
        api_key={api_key}
      />

      {/* List of favotites */}
      <FavoriteList favoriteList={favoriteList} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 50,
  },
  container: {
    flex: 1,
    //   alignItems: "center",
    // justifyContent: "space-around",
    //   marginTop: 100,
    //   width: Dimensions.get("window").width,
  },
});
