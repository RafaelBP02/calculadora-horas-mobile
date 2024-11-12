import { genericCss } from "@/assets/css/GenericCss";
import { RootStackParamList } from "@/constants/customTypes";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { CustomUser } from "../models/userModel";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type NavProps = NativeStackScreenProps<RootStackParamList, "UserEditorTool">;


export default function UserEditorTool({ navigation, route }: NavProps) {
    const {selectedUser} = route.params;

    return(
        <View style={genericCss.container}>
            <Text>Dados de {selectedUser.name} {selectedUser.surename}</Text>
            <Text>e-mail: {selectedUser.eMail}</Text>
            <Text>permissão: {selectedUser.role.roleName}</Text>
            <TextInput value={selectedUser.workplace}></TextInput>
        </View>
    )
}