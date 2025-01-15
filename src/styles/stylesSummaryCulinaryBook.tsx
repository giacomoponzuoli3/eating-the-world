import { StyleSheet } from 'react-native';

export const stylesSummaryCulinaryBook = StyleSheet.create({
    textSummarySpecialRequest: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10
    },

    containerInformations: {
        marginTop: 2,
        flexDirection: 'column'
    },

    containerIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },

    iconSummaryWrapper: {
        marginLeft: 10,
        width: 30, // Larghezza del cerchio
        height: 30, // Altezza del cerchio
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', // Sfondo nero opaco
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },

    iconSummary: {
        color: 'rgba(98, 0, 238, 1)',
        fontSize: 15
    },

    textSummary: {
        marginLeft: 8,
        fontFamily: 'Poppins-Light'
    },

    buttonBookSpecialExperience: { 
        marginTop: 5,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 160, 0, 1)', 
        flex: 1, 
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center'
    },

    textBookSpecialExperience: {
        padding: 15,
        color: 'white', 
        fontFamily: 'Poppins-Light', 
        fontSize: 15
    },

});