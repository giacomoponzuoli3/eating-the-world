
import { StyleSheet } from 'react-native';

export const stylesCulinaryExperience = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },

    imageBackground: {
        width: '100%', // Larghezza dello sfondo
        height: 250, // Altezza dello sfondo
  
    },
      imagesStyle: {
          flexDirection: 'row', // Dispone i pulsanti in riga
          justifyContent: 'space-between', // Spazio tra i pulsanti
          alignItems: 'center', // Allinea i pulsanti verticalmente al centro
          paddingHorizontal: 10, // Spazio dai lati sinistro e destro
          marginTop: 5, // Spazio dal bordo inferiore
    },
    iconWrapper: {
        
        width: 35, // Larghezza del cerchio
        height: 35, // Altezza del cerchio
        borderRadius: 25, // Bordo circolare
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Sfondo nero opaco
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },

    containerText: {
        marginLeft: 10,
        marginRight: 10
    },

    textCulinaryExperience: {
        marginTop: 5,
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
    },

    containerTitleRestaurant: {
        flexDirection: 'row',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        marginTop: 4,
    },

    textOfferedBy: {
        fontFamily: 'Poppins-Light',
        fontSize: 15
    },

    textTitleRestaurant: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6200ee',
        color: '#6200ee'
    },

    containerDescription: {
        marginTop: 2,
        flexDirection: 'column'
    },

    titleDescription:{
        fontFamily: 'Poppins-SemiBold',
        marginTop: 10,
        fontSize: 18,
    },

    description: {
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
        marginBottom: 10
    },

    titleInformations: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        marginBottom: 5,
    },

    containerIconInformation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    iconInformationWrapper: {
        width: 30,
        height: 30, 
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', 
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },
    iconInformation: {
        color: 'rgba(98, 0, 238, 1)',
        fontSize: 15
    },
    textInformation: {
        marginLeft: 8,
        fontFamily: 'Poppins-Light'
    },
    


});