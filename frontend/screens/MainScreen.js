import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  DeviceEventEmitter,
} from "react-native";
import SearchBar from "../components/searchbar/SearchBar";
import LocationInfo from "../components/location/LocationInfo";
import FavoriteList from "../components/favoritelist/FavoriteList";
import { AppBar } from "@react-native-material/core";
import { deleteByCityName, findAll } from "../utils/db";

export default function MainScreen() {
  const api_key = "";

  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    DeviceEventEmitter.addListener("renderToMainScreen", async () => {
      const res = await findAll();
      setFavoriteList(res);
    });

    DeviceEventEmitter.addListener("RemoveByCityName", async (city) => {
      await deleteByCityName(city);
      const res = await findAll();
      setFavoriteList(res);
    });

    findAll().then((res) => setFavoriteList(res));
  }, []);

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
            // favoriteList={favoriteList}
            setFavoriteList={setFavoriteList}
            api_key={api_key}
          />
        </AppBar>

        {/* Current location weather or Malmö(default) */}
        <LocationInfo api_key={api_key} />

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
