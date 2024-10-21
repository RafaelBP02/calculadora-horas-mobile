import { formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import { RootStackParamList } from "@/utils/customTypes";
import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={genericCss.container}>
      <Text>BEM VINDO À CALCULADORA DE HORAS</Text>
      <View style={formCss.button}>
        <Button
          title="calculadora"
          onPress={() => navigation.navigate("Calculator")}
        ></Button>
        <Button
          title="login"
          onPress={() => navigation.navigate("Login")}
        ></Button>
      </View>
    </View>
  );
}
