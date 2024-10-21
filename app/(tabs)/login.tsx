import { formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { UserAuthentication } from "../controller/authenticationController";
import { BearerToken } from "../models/authenticationModel";
import { saveUserToken } from "@/utils/DeviceStorage";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/utils/customTypes";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Login">;


export default function Login({navigation}: HomeProps) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dadosValidos, setDadosValidos] = useState<boolean>(false);

  const tratarEnvio = async () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setDadosValidos(false);
      return;
    }
    console.log("ENVIADO!");

    try {
      const userToken = await UserAuthentication.login(email, senha);
      saveUserToken(userToken.token).then(() =>
        navigation.navigate("Home")
      );
      console.log(userToken.token);
  
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={genericCss.container}>
        <View style={formCss.formContainer}>
        <View>
            <Text>LOGIN</Text>
          </View>
          <TextInput
            style={formCss.formInput}
            placeholder="usuaruio@mail.com"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={formCss.formInput}
            placeholder="digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
          <View style={formCss.button}>
            <Button title="Enviar" onPress={() => tratarEnvio()} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
