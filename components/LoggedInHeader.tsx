import { colors } from "@/assets/css/FormsCss";
import AuthContext, { DEFAULT_VALUE } from "@/contexts/Auth";
import React, { useContext } from "react";
import { Button, ButtonProps, Text, View } from "react-native";


const LoggedInHeader = () => {

  const {user, setUser} = useContext(AuthContext);

  const logoutUser = () =>{
    console.log("APERTOU");
    setUser(DEFAULT_VALUE.user);
  }

  if(!user.email)
    return null;

  return (
    <View testID="logged-component">
      <Text>Bem vindo(a) {user.email}</Text>
      <Button color={colors.primary} onPress={() => logoutUser()} title="Logout" />
    </View>
  );
};

export default LoggedInHeader;
