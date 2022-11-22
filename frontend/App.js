import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import SearchResultScreen from "./screens/SearchResultScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="mainscreen"
          component={MainScreen}
        />
        <Stack.Screen
          name="searchresultscreen"
          component={SearchResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
