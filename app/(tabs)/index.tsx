import { RootStackParamList } from "@/utils/customTypes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/home";
import Calculator from "./calculator";
import Login from "../views/login";
import { AuthContextProvider } from "@/contexts/Auth";

export default function HomeScreen() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AuthContextProvider>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Calculator"  component={Calculator} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
      </Stack.Navigator>
    </AuthContextProvider>
  );
}

