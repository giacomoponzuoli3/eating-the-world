import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const stylesBookTable = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    conainerTitle: {
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },

    containerTextTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    textTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },

    containerTextLabel: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(211, 211, 211, 1)'
    },

    textLabel: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },

    containerBar: {

    },

    containerCalendar: {
        flex: 1,
        alignItems: 'center',
    },

    calendar: {
        width: width - 20,
        backgroundColor: 'white'
    },


    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
      },
      dayButton: {
        width: 45,
        height: 45,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(211, 211, 211, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      
      daySelectedButton: {
        width: 45,
        height: 45,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6200ee',
      },

      dayText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: 'black',
      },

      daySelectedText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: 'white',
      },

      disabledDay: {
        opacity: 0.3, // Rendi la domenica visivamente disabilitata
      },
      disabledDayButton: {
        backgroundColor: '#d3d3d3', // Colore di background per i giorni disabilitati
      },

});