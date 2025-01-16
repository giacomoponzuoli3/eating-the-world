import { StyleSheet } from 'react-native';

export const stylesPageRestaurant = StyleSheet.create({
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

    containerDescription: {
        marginTop: 2,
        flexDirection: 'column'
    },

    description: {
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
        marginBottom: 12
    },

    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,

    },

    titleRestaurant: {
        marginTop: 5,
        fontFamily: 'Poppins-Bold',
        fontSize: 30,
    },

    iconMenuWrapper: {
        flexDirection: 'column',
        width: 36, // Larghezza del cerchio
        height: 36, // Altezza del cerchio
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', // Sfondo nero opaco
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(98, 0, 238, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
        marginLeft: 20
    },

    textMenu: {
        fontSize: 9,
        fontFamily: 'Poppins-Medium',
        color: 'rgba(98, 0, 238, 1)',
    },

    iconMenu: {
        padding:0,
        color: 'rgba(98, 0, 238, 1)',
        fontSize: 19,
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
        width: 30,
        height: 30, 
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', 
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },
    textInformation: {
        marginLeft: 8,
        fontFamily: 'Poppins-Light'
    },

    textOpen: {
        marginLeft: 8,
        fontFamily: 'Poppins-Bold',
        color: 'rgba(0, 128, 0, 1)'
    },
    textClosed: {
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
        color: 'rgba(255, 0, 0, 1)'
    },
    containerHours: {
        flexDirection: 'row',
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
    },
    iconHours: {
        marginLeft: 5
    },

    //per gli orari che vengono visualizzati
    openingHoursContainer: {
        marginTop: 10,
        paddingLeft: 10,
    },

    dayRow: {
        flexDirection: 'row',
        marginBottom: 5,
        width: '40%'
    },

    textDays: {
        width: 95,
        marginLeft: 29,
        fontFamily: 'Poppins-Light',
    },

    textToday: {
        width: 95,
        marginLeft: 29,
        fontFamily: 'Poppins-Bold'
    },

    textHours:{
        fontFamily: 'Poppins-Medium',
        marginRight: 4
    },
    textHoursClosed: {
        fontFamily: 'Poppins-Regular',
        color: 'rgba(255, 0, 0, 1)'
    },
    touchHoursDays: {
        marginBottom: 4,

    },

    

    containerCategory: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginLeft: 8,
        flex: 1, // Assicura che la View occupi tutta la larghezza disponibile
    },
    textCategory: {
        fontFamily: 'Poppins-Light',
        flexShrink: 1, // Consente al testo di restringersi e andare a capo
    },
    containerMenu: {
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: 'white',
        marginBottom: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    buttonBookTable: { 
        marginTop: 5,
        borderRadius: 4,
        backgroundColor: 'rgba(98, 0, 238, 1)', 
        flex: 1, 
        marginRight: 5,
        alignItems: 'center'
    },

    buttonCulinaryExperience: { 
        backgroundColor: 'rgba(98, 0, 238, 0.1)', 
        marginTop: 10,
        alignSelf: 'flex-start', // Si estende per tutta la larghezza del contenitore
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'rgba(90, 0, 230, 1)',

    },

    textBookTable: {
        padding: 15,
        color: 'white', 
        fontFamily: 'Poppins-Light', 
        fontSize: 15
    },

    textCulinaryExperience: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 4,
        paddingTop: 4,
        color: 'rgba(90, 0, 230, 1)', 
        fontFamily: 'Poppins-Medium', 
        fontSize: 14
    },

});