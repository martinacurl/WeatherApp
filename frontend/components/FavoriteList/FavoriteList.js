import { View, FlatList, Text } from "react-native"


const FavoriteList = ({ favoriteList }) => {

    const _renderItem = ({ item }) => {
        return (
          <View>
            <Text>{item}</Text>
          </View>
        );
      };    

    return (
        <View>
            <Text>Your Favorites</Text>
            <FlatList data={favoriteList} renderItem={_renderItem} />
            </View>
    )

}

export default FavoriteList;