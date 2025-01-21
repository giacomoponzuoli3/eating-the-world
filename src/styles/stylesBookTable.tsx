import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const stylesBookTable = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        zIndex: 1
    },

    containerTitle: {
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
        opacity: 0.3,
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
        justifyContent: 'center',
        alignItems: 'center',
      },

      textDeal: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginBottom: 10
      },

      containerDealHours: {
        flexDirection: 'row',
        flexWrap: 'wrap',     // Permette di andare a capo
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },

      containerHourText: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(211, 211, 211, 1)',
      },

      containerHourTextDisabled: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: '#d3d3d3',
        opacity: 0.3,
      },

      containerHourTextSelected: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: '#6200ee',
      },

      hourText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: 'black'
        
      },
      hourTextSelected: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: 'white',
      },

      containerNumbers: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      containerNumberSelected: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: '#6200ee',
      },

      containerNumberDisabled: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: '#d3d3d3',
        opacity: 0.3,
      },

      containerNumber: {
        marginTop: 5,
        width: 90,
        height: 55,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'rgba(211, 211, 211, 1)',
      },

      containerSummary: {
        flex:1
      },

      textSummarySpecialRequest: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10
      },

      containerInformations: {
        marginTop: 2,
        flexDirection: 'column'
      },

      containerIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
      },

      iconSummaryWrapper: {
        marginLeft: 10,
        width: 30, // Larghezza del cerchio
        height: 30, // Altezza del cerchio
        borderRadius: 25,
        backgroundColor: 'rgba(98, 0, 238, 0.1)', // Sfondo nero opaco
        borderWidth: 1, // Spessore del bordo
        borderColor: 'rgba(0, 0, 0, 0.0)', // Colore del bordo
        justifyContent: 'center', // Centrare l'icona verticalmente
        alignItems: 'center', // Centrare l'icona orizzontalmente
      },

    iconSummary: {
      color: 'rgba(98, 0, 238, 1)',
      fontSize: 15
    },

    textSummary: {
      marginLeft: 8,
      fontFamily: 'Poppins-Light'
    },

    containerSpecialRequest: {
      marginTop: 10,
    },

    inputText: {
      height: 200,
      borderRadius: 6,
      marginHorizontal: 10,
      borderColor: 'rgba(211, 211, 211, 1)',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 20,
    },

    buttonBookTable: { 
      marginTop: 5,
      borderRadius: 25,
      backgroundColor: 'rgba(0, 160, 0, 1)', 
      flex: 1, 
      marginRight: 10,
      marginLeft: 10,
      alignItems: 'center'
    },

    textBookTable: {
      padding: 15,
      color: 'white', 
      fontFamily: 'Poppins-Light', 
      fontSize: 15
    },


});