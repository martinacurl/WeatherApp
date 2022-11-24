import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const SearchBar = ({ favoriteList, setFavoriteList }) => {
  // create navigation connection
  const nav = useNavigation();
  const [searchInput, setSearchInput] = useState("");

  //sets input value to state
  const handleInput = (input) => {
    setSearchInput(input);
  };

  //Sending input (city) from the search bar to SearchResultScreen to show weather data
  const handleClick = () => {
    if (searchInput !== null) {
      //getLocation? function
      //TODO fix passing off setFavoriteList DONT KNOW HOW YET
      nav.navigate("searchresultscreen", {
        favoriteList,
        setFavoriteList,
        searchInput,
      });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="City"
        value={searchInput}
        onChangeText={handleInput}
      />
      <Pressable style={styles.searchButton} onPress={handleClick}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  searchBox: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
  },
  searchButton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
  },
});

export default SearchBar;
