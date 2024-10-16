import { StyleSheet, View  } from "react-native";

import { RootStackParamList } from "@/utils/customTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import Calculator from "./calculator";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Calculator" component={Calculator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
