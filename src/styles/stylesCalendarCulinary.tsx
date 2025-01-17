import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const stylesCalendarCulinary = StyleSheet.create({

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
        opacity: 0.3,
      },
      disabledDayButton: {
        backgroundColor: '#d3d3d3', // Colore di background per i giorni disabilitati
      },

});