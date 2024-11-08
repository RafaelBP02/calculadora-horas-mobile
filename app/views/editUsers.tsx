import { genericCss } from "@/assets/css/GenericCss";
import { tableCss } from "@/assets/css/TableCss";
import { RootStackParamList } from "@/constants/customTypes";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { CustomUser } from "../models/userModel";
import { AdministrationController } from "../controller/administrationController";
import TokenContext from "@/contexts/Token";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/assets/css/FormsCss";

type NavProps = NativeStackScreenProps<RootStackParamList, "EditUsers">;

const PAGE_SIZE = 10;

export default function EditUsers({ navigation }: NavProps) {
  const [allUsers, setAllUsers] = useState<CustomUser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listToRender, setListToRender] = useState<CustomUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { token } = useContext(TokenContext);

  const updateUsers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const users: CustomUser[] = await AdministrationController.listAllUsers(
        token
      );

      setAllUsers((prevUsers) => [...prevUsers, ...users]);
      setHasMore(users.length === PAGE_SIZE);

    } catch (error) {
      console.log("Failed to update users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateListRendering = (users: CustomUser[]) => {

    const newUsers = users.slice(currentIndex, currentIndex + 5);
    if (newUsers.length > 0) {
      setListToRender((prevList) => [...prevList, ...newUsers]);
      setCurrentIndex((prevIndex) => prevIndex + 5);
    } else {
      setHasMore(false); 
    }
  };
  
  useEffect(() => {
    updateUsers();
  }, []);
  
  useEffect(() => {
    if (allUsers.length > 0) {
      updateListRendering(allUsers);
    }
  }, [allUsers]);


  return (
    <View>
      {loading && (
        <View style={genericCss.container}>
          <Text>CARREGANDO...</Text>
        </View>
      )}
      {!loading && (
        <View style={genericCss.mediumContainer}>
          <FlatList
            testID="flatlist"
            data={listToRender}
            renderItem={({ item }) => <ListItem data={item}/>}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => updateListRendering(allUsers)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
}

function ListItem({data}: {data:CustomUser}) {
  return (
    <View style={tableCss.row}>
      <Text style={tableCss.cell}>{data.name || 'Nome não disponível'}</Text>
      <Text style={tableCss.cell}>{data.workplace || 'Local de trabalho não disponível'}</Text>
      <TouchableOpacity onPress={() => console.log(`usuario: ${data.name, data.id}`)}>
        <Ionicons testID="pencilBtn" name="pencil" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

