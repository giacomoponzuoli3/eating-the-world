import { Dimensions, StyleSheet } from 'react-native';

const {height} = Dimensions.get("window");

export const stylesQuiz = StyleSheet.create({
    containerQuiz: {
        backgroundColor: 'white',
        height: height - 180,
        overflow: 'hidden',
        paddingBottom: 60,
        flex: 1
      },
      closeButton: {
        top: 10,
        position: 'relative',
        left: 350,
      },
      questionText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        width: '90%',
        alignSelf: 'center',
        color: 'rgba(98, 0, 238, 1)',
        fontFamily: 'Poppins-Medium',
      },
      optionsContainer: {
        marginVertical: 5,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
      },
      optionButton: {
        backgroundColor: 'rgba(192, 192, 192, 1)',
        marginVertical: 10,
        padding: 15,
        borderRadius: 4,
        width: '90%',
        textAlign: 'center',
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        color: 'white',
      },
      correctOption: {
        backgroundColor: '#56C678',
      },
      wrongOption: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
      },
      explanationText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        fontFamily: 'Poppins-Light',
      },
      leftArrow: {
        left: 10,
        position: 'absolute',
        bottom: 10
      },
      rightArrow: {
        right: 10,
        bottom: 10, 
        position: 'absolute',
      },    
      solutionText: {
        fontFamily: 'Poppins',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
      },
      defaultOption: {
        backgroundColor: '#f0f0f0', 
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
      },
      completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        height: height - 170,
        overflow: 'hidden',   
      },
      completedText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
        fontFamily: 'Poppins-Medium'
      },
      finishButton: {
        position: 'absolute',
        right: 10,  
        bottom: 10, 
        backgroundColor: 'rgba(98, 0, 238, 1)', 
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      finishButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-LightItalic'
      },
      progressContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        alignSelf: 'center'
      },
      questionCounter: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(98, 0, 238, 1)',  
        marginBottom: 5,
      },
      progressBar: {
        width: '80%',
        height: 10,
        backgroundColor: '#f0f0f0',  
        borderRadius: 5, 
        overflow: 'hidden',
      },
      progressFill: {
        height: '100%',
        backgroundColor: 'rgba(98, 0, 238, 1)',  
      },
      instructionsText: {
        fontSize: 16, 
        color: '#333',
        textAlign: 'center', 
        marginTop: 10,
        fontFamily: 'Poppins-Light',
        marginBottom: 20
      },   
      button: {
        backgroundColor: '#6200ee',  
        paddingVertical: 12,         
        paddingHorizontal: 30,       
        borderRadius: 25,            
        justifyContent: 'center',    
        alignItems: 'center',        
        marginTop: 35,               
        shadowColor: '#000',         
        shadowOffset: { width: 0, height: 2 },  
        shadowOpacity: 0.4,          
        shadowRadius: 4,                 
      },
      buttonText: {
          color: '#fff',               
          fontSize: 18,                
          fontFamily: 'Poppins-Light'
      },
      crossButton: {
        top: 10,
        position: 'absolute',
        left: 350,
        zIndex: 1
      },  

})