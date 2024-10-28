import { colors, formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import AuthContext from "@/contexts/Auth";
import { RootStackParamList } from "@/constants/customTypes";
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
      {user.email && <Text style={formCss.title}>Bem vindo(a) {user.email}</Text>}
      <View style={formCss.button}>
        <Button
          title="calculadora"
          color={colors.primary}
          onPress={() => navigation.navigate("Calculator")}
        />
        {!user.email && <Button
          title="login"
          color={colors.primary}
          onPress={() => navigation.navigate("Login")}
        />}
      </View>
    </View>
  );
}
