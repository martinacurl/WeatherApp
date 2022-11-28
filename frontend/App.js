import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MainScreen from "./screens/MainScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import { getTableInfo, initDB } from "./utils/db";
import { View, Text } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  //state to make sure db dont render and use db before finnish loading
  const [dbInit, setDbInit] = useState(false);

  //useEffect to initilise db when weppapplication redners
  useEffect(() => {
    initDB()
      .then((res) => {
        return getTableInfo();
      })
      .then((res) => {
        if (res) {
          setDbInit(true);
        }
      });
  }, []);

  //if statement if still loading
  if (!dbInit)
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="mainscreen"
          component={MainScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="searchresultscreen"
          component={SearchResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
