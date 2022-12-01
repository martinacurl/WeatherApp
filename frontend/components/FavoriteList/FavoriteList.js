import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  DeviceEventEmitter,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FavoriteList = ({ favoriteList }) => {
  const nav = useNavigation();

  const _renderItem = ({ item: favorite }) => {
    const handleDelete = () => {
      console.log("DELETE", favorite.city);

      DeviceEventEmitter.emit("RemoveByCityName", favorite.city);
      nav.navigate("mainscreen", {});
    };

    return (
      <View style={styles.favotiteContainer}>
        <Pressable
          style={styles.favoriteButton}
          onPress={() => nav.navigate("searchresultscreen", { favorite })}
        >
          <Text style={styles.favoriteText}>{favorite.city}</Text>
        </Pressable>
        <Icon name="delete" size={20} color="black" onPress={handleDelete} />
      </View>
    );
  };

  return (
    <View style={styles.favoriteLocationStyle}>
      <Text style={styles.text}>Your Favorites</Text>
      <FlatList data={favoriteList} renderItem={_renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteLocationStyle: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    flex: 1,
    flexGrow: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
  favotiteContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteButton: {
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.25,
  },
  favoriteText: {
    textAlign: "center",
  },
});

export default FavoriteList;
