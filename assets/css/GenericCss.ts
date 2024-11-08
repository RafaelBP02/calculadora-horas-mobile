import { StyleSheet } from 'react-native';

const genericCss = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: 'auto',
        height: '100%',

        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center'
    },
    mediumContainer: {
        flexDirection: 'column',
        marginTop: 20,
        width: 'auto',
        height: '80%',

        padding:20,
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center'
    }

})

export {genericCss};