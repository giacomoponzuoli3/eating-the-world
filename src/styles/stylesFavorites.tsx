import { StyleSheet } from 'react-native';

export const stylesFavorite = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
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
      borderBottomColor: 'rbg(232, 232, 232)',
      borderBottomWidth: 0.4,
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
        fontFamily: 'Poppins-LightItalic',
        fontSize: 12,
        flexShrink: 1, // Riduce la dimensione del testo in caso di overflow
        marginBottom: 3
    },

    restaurantImage: {
      width: 65,
      height: 65,
      borderRadius: 8,
      marginRight: 15,
    },

    restaurantName: {
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
      marginBottom: 5,
    },

    containerPriceRange: {
      flexDirection: 'row',
      marginTop: 2,
    },

    priceRange: {
      fontFamily: 'Poppins-Light',
      fontSize: 13
    },

    
    ellipsis: {
      alignSelf: 'center',  // Centra verticalmente
      padding: 9,
      justifyContent: 'center',  // Centra verticalmente
      alignItems: 'center', // Centra orizzontalmente il contenuto
      borderWidth: 0.1
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

    loadingText: {
      marginTop: 10,
      fontSize: 22,
      fontFamily: 'Poppins-ExtraLight'
    },

    containerCategory: {
      flexDirection: 'row', 
      flexWrap: 'wrap'
    },

    categoryText: {
      fontFamily: 'Poppins-Light',
      fontSize: 13
    }
      
  });