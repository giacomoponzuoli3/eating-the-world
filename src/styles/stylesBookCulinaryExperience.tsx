import { StyleSheet } from "react-native";


export const stylesBookCulinaryExperience = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

    containerTitle: {
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },

    textSpecialExperience: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },

    containerTextSpecialExperience: {
        justifyContent: 'center',
        alignItems: 'center'
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

    textLabelSummary: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18
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

});