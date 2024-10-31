import { genericCss } from "@/assets/css/GenericCss";
import { RootStackParamList } from "@/constants/customTypes";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { CustomUser } from "../models/userModel";
import { AdministrationController } from "../controller/administrationController";
import AuthContext from "@/contexts/Auth";
import TokenContext from "@/contexts/Token";

type NavProps = NativeStackScreenProps<RootStackParamList, "EditUsers">;


export default function EditUsers({navigation}: NavProps){
  const [allUsers, setAllUsers] = useState<CustomUser[]>([]);

  const {token} = useContext(TokenContext);

  const updateUsers = async () => {
    try {
      const users: CustomUser[] = await AdministrationController.listAllUsers(token);
      
      setAllUsers(users);

    } catch (error) {
      console.log("Failed to update users:", error);
    }
  } 

  useEffect(() => {
    updateUsers();
  },[])
 
 return(
    <View style={genericCss.container}>


    </View>
 );   
}