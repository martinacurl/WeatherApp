import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import SearchBar from "../components/searchbar/SearchBar";
import LocationInfo from "../components/location/LocationInfo";
import FavoriteList from "../components/favoriteList/FavoriteList";
import { AppBar } from "@react-native-material/core";

export default function MainScreen() {
  const api_key = "7987049bdcec1050b95c4cecb4ec496d";

  const [location, setLocation] = useState();
  const [favoriteList, setFavoriteList] = useState(["hej", "san"]);


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
        />
      </AppBar>

      {/* Current location weather or Malmö(default) */}
      <LocationInfo
        location={location}
        setLocation={setLocation}
        api_key={api_key}
      />

      {/* List of favorites */}
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
