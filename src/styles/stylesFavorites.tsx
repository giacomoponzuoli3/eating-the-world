import { StyleSheet } from 'react-native';
import { fontSize, spacing } from '../constants/dimensions';
import { colors } from '../constants/color';
import { fontFamily } from '../constants/fontFamily';
import loadFonts from './font';


export const stylesFavorite = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      margin: 10
    },

    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10,
        textAlign: 'center'
    },

    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 15,
      marginVertical: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      
    },

    gridElements: {
        flexDirection: 'row',
        padding: 2,
        width: '100%'
    },

    textElements: {
        flexDirection: 'column',
        padding: 1
    },

    restaurantAddress: {
        fontFamily: 'Poppins-Italic',
    },

    restaurantImage: {
      width: 70,
      height: 70,
      borderRadius: 20,
      marginRight: 15,
    },

    restaurantInfo: {
      flex: 1,
    },

    restaurantName: {
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
      marginBottom: 5,
    },
    
    restaurantRating: {
        marginTop: 2,
        fontSize: 14,
        fontFamily: 'Poppins-MediumItalic',

    },
    
    iconStar: {
        justifyContent: 'center',
        alignItems: 'center',  // Centra orizzontalmente
        flex: 1,               // Usa tutta la larghezza disponibile
        height: '100%',        // Assicurati che prenda tutta l'altezza del suo contenitore
        marginLeft: 10,        // Aggiungi un po' di margine se necessario
    }
      
  });