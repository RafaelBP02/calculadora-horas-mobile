import { colors, formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import React, { useContext, useState } from "react";
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
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "@/constants/customTypes";
import { jwtDecode } from "jwt-decode";
import AuthContext from "@/contexts/Auth";

type NavProps = NativeStackScreenProps<RootStackParamList, "Login">;

export interface DecodedJwt{
  iss: string,
  sub: string,
  papel: string,
  exp: number
}

export interface SubjectBody{
  username: string,
  userId: number
}

export default function Login({navigation}: NavProps) {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dadosValidos, setDadosValidos] = useState<boolean>(true);

  const {setUser} = useContext(AuthContext);

  const tratarEnvio = async () => {
    if (!email.includes("@") || !email.includes(".com")) {
      setDadosValidos(false);
      return;
    }
    console.log("ENVIADO!");
    
    setDadosValidos(false);

    try {
      const userToken = await UserAuthentication.login(email, senha);
      
      console.log(userToken.token);
      decodeBearerToken(userToken.token);
      
      navigation.navigate("Home");
  
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }

  };

  const decodeBearerToken = (token: string) => {
    if (!token) {
      console.error("Erro ao recuperar o token");
      return;
    }

    try {
      const jwtPayload: DecodedJwt = jwtDecode<DecodedJwt>(token);
      const subObject: SubjectBody = JSON.parse(jwtPayload.sub);

      setUser({id: subObject.userId, email: subObject.username, role: jwtPayload.papel } )

    } catch (error) {
      console.error('Erro ao decodificar o JWT:', error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={genericCss.container}>
        <View style={formCss.formContainer}>
          <Text style={formCss.formTitle}>LOGIN</Text>
          <TextInput
            style={formCss.formInput}
            placeholder="usuário@mail.com"
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
            <Button color={colors.primary} title="Enviar" onPress={() => tratarEnvio()} />
            <Text onPress={() => navigation.navigate("Registration")}>Não possui uma conta?</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
