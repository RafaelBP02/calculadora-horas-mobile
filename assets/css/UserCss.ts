import { StyleSheet } from "react-native";
import { colors } from "./FormsCss";

const userCss = StyleSheet.create({
    dataContainer:{
        width:"80%",
        flexDirection:"row",
        marginBottom:10,
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
    },
    inputInfo:{
        paddingTop: 3,
        width:"30%",
        textTransform:"uppercase",
        fontWeight:"bold"
    },
    inputValue:{
        
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: colors.white
    }

    

})

export {userCss}