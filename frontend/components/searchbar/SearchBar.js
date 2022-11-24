import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  Text,
} from "react-native";

const SearchBar = ({
  location,
  setLocation,
  searchInput,
  setSearchInput,
  setClicked,
}) => {
  const latitude = location?.coords.latitude;
  const longitude = location?.coords.longitude;

  //sets inputvalue to state
  const handelInput = (input) => {
    setSearchInput(input);
  };

  //TODO when butten is clickt we need to check what lat/long that city has ang take ute city/country/weather and send sitty with info to switch Screens..
  const handleClick = () => {
    console.log("Pressable was clicked");
    setClicked(true);
  };

  return (
    <View>
      <TextInput
        placeholder="City"
        value={searchInput}
        onChangeText={handelInput}
      />
      <Pressable onPress={handleClick}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
};

export default SearchBar;
