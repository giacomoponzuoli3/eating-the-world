import { StyleSheet } from "react-native";

export const stylesLanguage = StyleSheet.create({
    containerNumbers: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        alignItems: 'center',
      },


      containerLanguageSelected: {
        marginTop: 5,
        width: '48%',
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

      containerLanguage: {
        marginTop: 5,
        width: '48%',
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

      languageTextSelected: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: 'white',
      },

      languageText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: 'black'
        
      },
});
