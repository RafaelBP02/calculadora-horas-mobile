import React, { useState } from "react";

import { RootStackParamList } from "@/utils/customTypes";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { genericCss } from "@/assets/css/GenericCss";
import { formCss } from "@/assets/css/FormsCss";

type RegistrationProps = NativeStackScreenProps<RootStackParamList, "Registration">;


export default function Registration(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surename, setSurename] = useState<string>("");
  const [workplace, setWorkplace] = useState<string>("");

  const tratarEnvio = () => {
    console.log("CLICOU")
    //TODO: REST REQUEST
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={genericCss.container}>
        <View style={formCss.formContainer}>
        <View>
            <Text>Peencha seus dados para cadastro</Text>
          </View>
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
            placeholder="digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TextInput
            style={formCss.formInput}
            placeholder="repita sua senha"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
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