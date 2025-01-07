import { StyleSheet } from 'react-native';

export const stylesPageRestaurant = StyleSheet.create({
    container: {
        flex: 1,
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

});