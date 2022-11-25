import { useState } from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import SearchBar from "../components/searchbar/SearchBar";
import LocationInfo from "../components/location/LocationInfo";
import FavoriteList from "../components/favoritelist/FavoriteList";
import { AppBar } from "@react-native-material/core";

export default function MainScreen() {
  const api_key = "7987049bdcec1050b95c4cecb4ec496d";

  const [location, setLocation] = useState();
  const [favoriteList, setFavoriteList] = useState(["hej", "san"]);

  return (
    <ImageBackground
      source={require("../assets/clouds.jpg")}
      resizeMode="cover"
      style={styles.imagebackground}
    >
      <View style={styles.container}>
        {/* SEARCHBAR */}
        <AppBar
          // color="blue"
          tintColor="black"
          transparent="true"
          title="Todays Weather"
          centerTitle={true}
          titleStyle={[
            {
              fontWeight: "bold",
              marginTop: 31,
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
