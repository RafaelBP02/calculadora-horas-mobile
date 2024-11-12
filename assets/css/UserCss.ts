import { StyleSheet } from "react-native";
import { colors } from "./FormsCss";

const userCss = StyleSheet.create({
    dataContainer:{
        width:"80%",
        flexDirection:"row",
        marginBottom:8,
    },
    dataInfo:{
        width:"30%",
        textTransform:"uppercase",
        fontWeight:"bold"
    },
    dataValue:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:colors.shadow,
    }

})

export {userCss}