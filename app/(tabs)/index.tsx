import { RootStackParamList } from "@/utils/customTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home";
import Calculator from "./calculator";
import Login from "../views/login";
import AuthContext, { AuthContextProvider, DEFAULT_VALUE } from "@/contexts/Auth";
import LoggedInHeader from "@/components/LoggedInHeader";
import { useContext } from "react";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AuthContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <LoggedInHeader/>
            ),
          }}
        />
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{
            headerRight: () => (
              <LoggedInHeader/>
            ),
          }}
          
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
      </Stack.Navigator>
    </AuthContextProvider>
  );
}
