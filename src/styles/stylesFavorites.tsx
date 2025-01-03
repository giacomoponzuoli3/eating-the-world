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
      marginLeft: 10,
      marginRight: 10
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
      marginVertical: 4,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.01,
      shadowRadius: 5,
      
    },

    gridElements: {
        flexDirection: 'row',
        padding: 2,
        width: '100%'
    },

    textElements: {
        flexDirection: 'column',
        padding: 1,
        width: '80%', // 70% della larghezza del contenitore
    },

    restaurantAddress: {
        fontFamily: 'Poppins-Italic',
        fontSize: 10,
        flexShrink: 1, // Riduce la dimensione del testo in caso di overflow
        marginBottom: 3
    },

    restaurantImage: {
      width: 60,
      height: 60,
      borderRadius: 20,
      marginRight: 15,
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
    
    ellipsis: {
      marginLeft: 'auto',  // Spinge il contenitore dei tre puntini a destra
      alignSelf: 'center',  // Centra verticalmente
      paddingRight: 10, // Puoi aggiungere un po' di spazio a destra se necessario
      justifyContent: 'center',  // Centra verticalmente
      alignItems: 'center', // Centra orizzontalmente il contenuto
    },

    button: {
      backgroundColor: '#6200ee',  // Colore di sfondo
      paddingVertical: 12,          // Spazio sopra e sotto
      paddingHorizontal: 30,        // Spazio a sinistra e a destra
      borderRadius: 25,            // Rende gli angoli arrotondati
      justifyContent: 'center',    // Centra il testo orizzontalmente
      alignItems: 'center',        // Centra il testo verticalmente
      marginTop: 20,               // Spazio sopra il pulsante
      shadowColor: '#000',         // Colore dell'ombra
      shadowOffset: { width: 0, height: 2 },  // Offset dell'ombra
      shadowOpacity: 0.4,          // Opacità dell'ombra
      shadowRadius: 4,             // Raggio dell'ombra
    },
    
    buttonText: {
      color: '#fff',               // Colore del testo (bianco)
      fontSize: 18,                 // Dimensione del testo
      fontFamily: 'Poppins-Light'
    },

    
      
  });