import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Button } from "react-native";
import LocationInfo from "../components/LocationInfo/LocationInfo";
import { useNavigation } from "@react-navigation/native";
import FavoriteList from "../components/FavoriteList/FavoriteList";


export default function MainScreen({ route }) {

  // console.log(route.params.test);

  const [favoriteList, setFavoriteList] = useState(["hej", "san"]);

  const nav = useNavigation()


  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
        <Pressable
          onPress={() => nav.navigate('searchresultscreen', { favoriteList, setFavoriteList })}
        >
          <Text>Search Bar Coming Soon, click me</Text>
      </Pressable>
      {/* LOCATION INFO */}
      <LocationInfo />
      {/* LIST OF FAVORITES */}
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
