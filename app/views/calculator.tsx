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
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type NavProps = NativeStackScreenProps<RootStackParamList, "Calculator">;


export default function Calculator({navigation}: NavProps) {
  const {user} = useContext(AuthContext);

  const [inicioExpediente, setInicioExpediente] = useState<string>("");
  const [inicioIntervalo, setInicioIntervalo] = useState<string>("");
  const [fimIntervalo, setFimIntervalo] = useState<string>("");
  // const [fimExpediente, setFimExpediente] = useState<string>("");

  const handleTimeSend = () => {
    const dataIE = Conversions.parseTimeString(inicioExpediente);
    const dataII = Conversions.parseTimeString(inicioIntervalo);
    const dataFI = Conversions.parseTimeString(fimIntervalo);
    // const dataFE = Conversions.parseTimeString(fimExpediente);

    // incluir || dataFE === null
    if (dataIE === null || dataII === null || dataFI === null) {
      Alert.alert(
        "Formato de hora inválido",
        "Por favor, apenas números, insira a hora no formato HH:MM."
      );

      return;
    }

    console.log("sucesso dados validados");

    calculaHorarioSaida(dataIE, dataII, dataFI);
  };

  const calculaHorarioSaida = (
    horaEntrada: Date,
    inicioIntervalo: Date,
    fimIntervalo: Date
  ) => {
    const cargaHoraria: number = 8;

    const horasJaTrabalhadas: number =
      inicioIntervalo.getTime() - horaEntrada.getTime();

    const horarioDeSaida: Date = new Date(
      fimIntervalo.getTime() +
        cargaHoraria * 60 * 60 * 1000 -
        horasJaTrabalhadas
    );

    Alert.alert(
      "Horario de Saída",
      horarioDeSaida.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  const limparHorarios = () => {
    setInicioExpediente("");
    setInicioIntervalo("");
    setFimIntervalo("");
  }

  useEffect (() => {
    console.log(user.email)
  }, [user]) 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={genericCss.container}>
        <View style={formCss.formContainer}>
          <Text style={formCss.formTitle}>Calculadora do Ponto - 8 horas</Text>
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
            {/* <TextInput
            value={fimExpediente}
            placeholder="Hora fim expediente (HH:MM)"
            onChangeText={(text) => setFimExpediente(text)}
            keyboardType="numeric"
          /> */}
          </View>
          <View style={formCss.button}>
            <Button title="calcular" color={colors.primary} onPress={() => handleTimeSend()} />
            <Button title="cancelar" color={colors.secondary} onPress={() => limparHorarios()} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
