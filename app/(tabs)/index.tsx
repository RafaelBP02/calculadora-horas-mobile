import { RootStackParamList } from "@/constants/customTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home";
import Login from "../views/login";
import AuthContext, { AuthContextProvider, DEFAULT_VALUE } from "@/contexts/Auth";
import LoggedInHeader from "@/components/LoggedInHeader";
import { useContext } from "react";
import Registration from "../views/registration";
import Calculator from "../views/calculator";
import EditUsers from "../views/editUsers";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
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
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={Registration}
        />
        <Stack.Screen
          name="EditUsers"
          options={{
            headerRight: () => (
              <LoggedInHeader/>
            ),
          }}
          component={EditUsers}
        />
      </Stack.Navigator>
  );
}
