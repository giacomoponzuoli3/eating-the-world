import { StyleSheet } from "react-native";


export const stylesMenuComponent = StyleSheet.create({ 
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    containerTitle: {
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },

    textTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },

    containerTextLabel: {
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: 'rgba(211, 211, 211, 1)'
    },

    textLabel: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    textAfterLabel:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        fontFamily: 'Poppins-Light',
        fontSize: 15
    }

});