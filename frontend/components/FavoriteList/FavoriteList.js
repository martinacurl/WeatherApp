import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

const FavoriteList = ({ favoriteList }) => {
  const nav = useNavigation();

  const _renderItem = ({ item: favorite }) => {
    return (
      <View>
        <Pressable
          style={styles.favoriteButton}
          onPress={() => nav.navigate("searchresultscreen", { favorite })}
        >
          <Text style={styles.favoriteText}>{favorite.city}</Text>
        </Pressable>
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
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
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
