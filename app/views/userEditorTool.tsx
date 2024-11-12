import { genericCss } from "@/assets/css/GenericCss";
import { RootStackParamList } from "@/constants/customTypes";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { CustomUser } from "../models/userModel";
import { Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { userCss } from "@/assets/css/UserCss";
import { colors, formCss } from "@/assets/css/FormsCss";
import { Ionicons } from "@expo/vector-icons";

type NavProps = NativeStackScreenProps<RootStackParamList, "UserEditorTool">;

export default function UserEditorTool({ navigation, route }: NavProps) {
  const { selectedUser } = route.params;

  return (
    <View style={genericCss.container}>
      <Text>
        Dados de {selectedUser.name} {selectedUser.surename}
      </Text>
      <View style={userCss.dataContainer}>
        <Text style={userCss.dataInfo}>e-mail</Text>
        <Text style={userCss.dataValue}>{selectedUser.eMail}</Text>
      </View>
      <View style={userCss.dataContainer}>
        <Text style={userCss.dataInfo}>permissão</Text>
        <Text style={userCss.dataValue}>{selectedUser.role.roleName}</Text>
      </View>
      <View style={userCss.dataContainer}>
        <Text style={userCss.inputInfo}>trabalho</Text>
        <TextInput style={userCss.dataValue} value={selectedUser.workplace}></TextInput>
        <Ionicons style={{backgroundColor: colors.shadow}} testID="pencilBtn" name="pencil" size={20} color={colors.black}/>
      </View>
      <View style={formCss.button}>
        <Button title="voltar" color={colors.secondary} onPress={() => navigation.navigate("EditUsers")}/>
        <Button title="salvar" color={colors.primary}/>
      </View>
    </View>
  );
}
