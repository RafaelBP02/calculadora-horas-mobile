import { formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import AuthContext from "@/contexts/Auth";
import { RootStackParamList } from "@/utils/customTypes";
import React, { useContext, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: HomeProps) {

  const {user} = useContext(AuthContext);

  useEffect (() => {
  }, [user]) 

  return (
    <View style={genericCss.container}>
      <Text>Bem vindo(a) {user.email}</Text>
      {user.email && <Text>CALCULADORA DE HORAS</Text>}
      <View style={formCss.button}>
        <Button
          title="calculadora"
          onPress={() => navigation.navigate("Calculator")}
        />
        {!user.email && <Button
          title="login"
          onPress={() => navigation.navigate("Login")}
        />}
      </View>
    </View>
  );
}
