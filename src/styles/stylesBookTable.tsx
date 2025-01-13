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

      containerIcons: {
        marginTop: 20, 
        marginBottom: 20, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
      },

      iconCalendar: {
        fontSize: 20,
        color: '#6200ee',

        // margin
        marginLeft: 10,

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,

        //border
        borderStartWidth: 2,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#6200ee'

      },

      iconClockDisabled: {
        fontSize: 21,
        color: 'rgba(211, 211, 211, 1)',

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 9.5,

        //border
        borderBottomWidth: 2,
        borderTopWidth: 2,

        borderBottomColor: 'rgba(211, 211, 211, 1)',
        borderTopColor: 'rgba(211, 211, 211, 1)'
      },

      centralBorder: {
        position: 'absolute',
        left: 0, // Per il bordo sinistro
        top: '50%', // Posiziona al centro verticalmente
        transform: [{ translateY: -10 }], // Centra esattamente (10 è metà altezza del bordo)
        height: 20, // Altezza del bordo centrale
        width: 2, // Larghezza del bordo
        backgroundColor: 'rgba(211, 211, 211, 1)', // Colore del bordo
      },

      iconClockEnabled: {
        fontSize: 21,
        color: '#6200ee',

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 9.5,

        //border
        borderBottomWidth: 2,
        borderTopWidth: 2,

        borderBottomColor: '#6200ee',
        borderTopColor: '#6200ee'
      },

      iconPeopleDisabled: {
        fontSize: 21,
        color: 'rgba(211, 211, 211, 1)',

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 9.5,

        //border
        borderBottomWidth: 2,
        borderTopWidth: 2,

        borderBottomColor: 'rgba(211, 211, 211, 1)',
        borderTopColor: 'rgba(211, 211, 211, 1)'
      },

      iconPeopleEnabled: {
        fontSize: 21,
        color: '#6200ee',

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 9.5,

        //border
        borderBottomWidth: 2,
        borderTopWidth: 2,

        borderBottomColor: '#6200ee',
        borderTopColor: '#6200ee'
      },

      iconCheckmarkDisabled: {
        fontSize: 20,
        color: 'rgba(211, 211, 211, 1)',

        // margin
        marginRight: 10,

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,

        //border
        borderEndWidth: 2,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: 'rgba(211, 211, 211, 1)'
      },

      iconCheckmarkEnabled: {
        fontSize: 21,
        color: '#6200ee',

        // margin
        marginRight: 10,

        //padding
        paddingLeft: 35,
        paddingRight: 35,
        paddingTop: 10,
        paddingBottom: 10,

        //border
        borderEndWidth: 2,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: '#6200ee'
      },

      containerHours: {
        flex: 1,
        alignItems: 'center',
      },


});