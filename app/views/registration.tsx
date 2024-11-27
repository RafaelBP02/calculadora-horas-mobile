import React, { useState } from "react";

import { RootStackParamList } from "@/constants/customTypes";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { genericCss } from "@/assets/css/GenericCss";
import { colors, formCss } from "@/assets/css/FormsCss";
import { UserAuthentication } from "../controller/authenticationController";

type NavProps = NativeStackScreenProps<RootStackParamList, "Registration">;

export default function Registration({ navigation }: NavProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surename, setSurename] = useState<string>("");
  const [workplace, setWorkplace] = useState<string>("");

  const [dadosValidos, setDadosValidos] = useState<boolean>(false);

  const tratarRegistro = async () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setDadosValidos(false);
      return;
    }
    console.log("CLICOU");

    setDadosValidos(true);

    try {
      const userRegistration = await UserAuthentication.registration(
        email,
        password,
        name,
        surename,
        workplace
      );

      console.log(userRegistration.concluido);
      navigation.navigate("Login");
    } catch (error) {
      console.log("erro na hora de cadastrar");
    }
  };

  return (
    <View style={genericCss.container}>
      <View style={formCss.formContainer}>
        <Text style={formCss.formTitle}>CADASTRE-SE</Text>
        <TextInput
          style={formCss.formInput}
          placeholder="seuEmail@mail.com"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={formCss.formInput}
          placeholder="Seu Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={formCss.formInput}
          placeholder="Seu Sobrenome"
          value={surename}
          onChangeText={setSurename}
        />
        <TextInput
          style={formCss.formInput}
          placeholder="Seu Local de Trabalho"
          value={workplace}
          onChangeText={setWorkplace}
        />
        <TextInput
          style={formCss.formInput}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={formCss.formInput}
          placeholder="Repita sua senha"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry={true}
        />
        <View style={formCss.button}>
          <Button color={colors.primary} title="Enviar" onPress={() => tratarRegistro()} />
        </View>
      </View>
    </View>
  );
}
