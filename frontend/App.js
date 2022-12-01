import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import MainScreen from "./screens/MainScreen";
import SearchResultScreen from "./screens/SearchResultScreen";
import { getTableInfo, initDB } from "./utils/db";
import { View, Text } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  //state to make sure db doesn't render and use db before loading is finished
  const [dbInit, setDbInit] = useState(false);

  //useEffect to initialise db when webbapplication renders
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

  //if database still isn't initialised, returning a View with simple text
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
