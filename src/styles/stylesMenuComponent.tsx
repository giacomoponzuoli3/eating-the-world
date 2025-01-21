import { StyleSheet } from "react-native";


export const stylesMenuComponent = StyleSheet.create({ 
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

    textTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },

    containerTextLabel: {
        flexDirection: 'column',
        borderTopWidth: 1,
        borderTopColor: 'rgba(211, 211, 211, 1)',
        borderBottomColor: 'rgba(211, 211, 211, 1)',
        marginBottom: 10,
        borderBottomWidth: 1
    },

    textLabel: {
        marginLeft: 10,
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    textAfterLabel:{
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        marginBottom: 10,
    },

    containerCategoryDish: {
        flexDirection: 'row',
        marginTop: 5,
    },

    containerCategoryTitle: {
        alignSelf: 'flex-start',

        marginLeft: 3,
        marginRight: 3,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee'
    },

    containerCategoryTitleSelected: {
        alignSelf: 'flex-start',

        marginLeft: 3,
        marginRight: 3,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee',

        backgroundColor: '#6200ee'
    },

    containerCategoryTitleFirst: {
        alignSelf: 'flex-start',

        marginLeft: 10,
        marginRight: 3,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee'
    },

    containerCategoryTitleFirstSelected: {
        alignSelf: 'flex-start',

        marginLeft: 10,
        marginRight: 3,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee',

        backgroundColor: '#6200ee'
    },

    containerCategoryTitleLast: {
        alignSelf: 'flex-start',

        marginLeft: 3,
        marginRight: 10,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee'
    },

    containerCategoryTitleLastSelected: {
        alignSelf: 'flex-start',

        marginLeft: 3,
        marginRight: 10,

        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 5,
        paddingBottom: 5,

        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#6200ee',

        backgroundColor: '#6200ee'
    },

    categoryTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-Light',
        color: '#6200ee'
    },

    categoryTitleSelected: {
        fontSize: 15,
        fontFamily: 'Poppins-Medium',
        color: 'white'
    },

    dishItem: {
        fontSize: 16,
        marginLeft: 10,
    },

    containerDishes: {
        flex:1,
        marginTop: 20,
        flexDirection: 'column',
    },

    containerDish: {
        width: '100%',

        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 10, 

        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: 'rgba(211, 211, 211, 1)',
        borderBottomColor: 'rgba(211, 211, 211, 1)',
    },

    imageDish: {
       width: '100%',
       height: 200,
       borderRadius: 0,
    },

    containerTitleDish: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },

    textTitleDish: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    },

    textPrice: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20
    },

    textDescription: {
        marginTop: 5,
        fontFamily: 'Poppins-Regular',
        marginBottom: 12
    },

    containerAllergens: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },

    allergenText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },

    allergenNameText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: 'rgba(107, 142, 35, 1)'
    }

});