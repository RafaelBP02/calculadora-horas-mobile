import { colors, formCss } from "@/assets/css/FormsCss";
import { genericCss } from "@/assets/css/GenericCss";
import { RootStackParamList } from "@/constants/customTypes";
import AuthContext from "@/contexts/Auth";
import { Conversions } from "@/utils/Conversions";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type NavProps = NativeStackScreenProps<
  RootStackParamList,
  "NotificationConfig"
>;

export default function NotificationConfig({ navigation }: NavProps) {
  const { user } = useContext(AuthContext);

  const [inicioExpediente, setInicioExpediente] = useState<string>("");
  const [inicioIntervalo, setInicioIntervalo] = useState<string>("");
  const [fimIntervalo, setFimIntervalo] = useState<string>("");
  const [fimExpediente, setFimExpediente] = useState<string>("");

  const handleNotificationConfig = () => {
    const dataIE = Conversions.parseTimeString(inicioExpediente);
    const dataII = Conversions.parseTimeString(inicioIntervalo);
    const dataFI = Conversions.parseTimeString(fimIntervalo);
    const dataFE = Conversions.parseTimeString(fimExpediente);

    if (
      dataIE === null ||
      dataII === null ||
      dataFI === null ||
      dataFE === null
    ) {
      Alert.alert(
        "Formato de hora inválido",
        "Por favor, apenas números, insira a hora no formato HH:MM."
      );

      return;
    }

    console.log("sucesso dados validados");

    enviarHorarioConfigurado(dataIE, dataII, dataFI, dataFE);
  };

  const enviarHorarioConfigurado = async (
    iExpediente: Date,
    iIntervalo: Date,
    fIntervalo: Date,
    fExpediente: Date
  ) => {
    console.log("enviando dados salvos...");
    //TODO: async API call
  };

  const limparHorarios = () => {
    setInicioExpediente("");
    setInicioIntervalo("");
    setFimIntervalo("");
    setFimExpediente("");
  };

  useEffect(() => {}, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View testID="notify-config" style={genericCss.container}>
        <View style={formCss.formContainer}>
          <Text style={formCss.formTitle}>Configuração de Notificações</Text>
          <View style={formCss.formItems}>
            <TextInput
              style={formCss.formInput}
              value={inicioExpediente}
              placeholder="Hora início expediente (HH:MM)"
              onChangeText={(text) => setInicioExpediente(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={formCss.formInput}
              value={inicioIntervalo}
              placeholder="Hora início intervalo (HH:MM)"
              onChangeText={(text) => setInicioIntervalo(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={formCss.formInput}
              value={fimIntervalo}
              placeholder="Hora fim intervalo (HH:MM)"
              onChangeText={(text) => setFimIntervalo(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={formCss.formInput}
              value={fimExpediente}
              placeholder="Hora fim expediente (HH:MM)"
              onChangeText={(text) => setFimExpediente(text)}
              keyboardType="numeric"
            />
          </View>
          <View style={formCss.button}>
            <Switch
            />
            <Button
              title="salvar"
              color={colors.primary}
              onPress={() => handleNotificationConfig()}
            />
            <Button
              title="cancelar"
              color={colors.secondary}
              onPress={() => limparHorarios()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
