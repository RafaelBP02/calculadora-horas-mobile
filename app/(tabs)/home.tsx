import { RootStackParamList } from "@/utils/customTypes";
import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({navigation}: HomeProps){
    
    
    return(
        <View>
            <Text>Calcule seu horario</Text>
            <Button title="calculadora" onPress={() => navigation.navigate('Calculator')}></Button>
        </View>
    )
}