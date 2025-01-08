import { StyleSheet } from 'react-native';

export const stylesPageRestaurant = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    imageBackground: {
      width: '100%', // Larghezza dello sfondo
      height: 280, // Altezza dello sfondo

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

    containerDescription: {
        marginTop: 2,
        flexDirection: 'column'
    },

    description: {
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
        marginBottom: 12
    },

    titleRestaurant: {
        marginTop: 5,
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
    },

    containerIconInformation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },

    iconInformation: {
        color: 'rgba(98, 0, 238, 1)',
        fontSize: 15
    },
    iconInformationWrapper: {
        width: 30, // Larghezza del cerchio
        height: 30, // Altezza del cerchio
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', // Sfondo nero opaco
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },
    textInformation: {
        marginLeft: 8,
        fontFamily: 'Poppins-Light'
    },



});