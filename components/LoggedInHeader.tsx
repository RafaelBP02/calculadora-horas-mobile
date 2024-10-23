import AuthContext from "@/contexts/Auth";
import React, { useContext } from "react";
import { Button, ButtonProps, Text, View } from "react-native";

interface HeaderButtonProps extends ButtonProps {}

const LoggedInHeader: React.FC<HeaderButtonProps> = ({ onPress, title }) => {

  const {user} = useContext(AuthContext);

  if(!user.email)
    return null;

  return (
    <View>
      <Text>Bem vindo(a) {user.email}</Text>
      <Button onPress={onPress} title={title} />
    </View>
  );
};

export default LoggedInHeader;
