import { RootStackParamList } from "@/constants/customTypes";
import { AuthContextProvider } from "@/contexts/Auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import Calculator from "../views/calculator";
import LoggedInHeader from "@/components/LoggedInHeader";
import Home from "../views/home";

export default function CalculatorTab() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
      <Stack.Navigator>
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
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
            <LoggedInHeader />
            ),
          }}
        />
      </Stack.Navigator>
  );
}
