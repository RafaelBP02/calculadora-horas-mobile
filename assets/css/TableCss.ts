import { StyleSheet } from "react-native";
import { colors } from "./FormsCss";

const tableCss = StyleSheet.create({
    row: {
      width:"100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginTop: 25,
      padding: 20,

      borderRadius: 10,
      borderWidth: 0.5,

      backgroundColor: colors.black
    },
    cell: {
      fontSize: 16,
      color: colors.white
    },
  });

  export{tableCss}
  