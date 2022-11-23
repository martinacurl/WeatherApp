import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LocationInfo from "../components/LocationInfo/LocationInfo";


//Not in use yet, will be connected with pressable from main mainscreen searchbar lateon
export default function SearchResultScreen({ route }) {

  const nav = useNavigation()
  const setFavoriteList = route.params.setFavoriteList;
  console.log(route.params.favoriteList);

  //will add the chosen weatherlocation to favoritesList, COMING SOON
  // right now adding String to the "imaginativeList" and navigating back to mainscreen
  const handlePress = () => {
    nav.navigate('mainscreen')
    setFavoriteList(prev => prev.concat("test"))
  }

  return (
    <View style={styles.container}>
      <Text> SEARCH RESULT PRESENTED</Text>
      <LocationInfo />
      <Pressable
        onPress={handlePress }
      >
        <Text style={{ margin: 10, padding: 10, backgroundColor: '#FFF' }} >Add to Favorites</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
