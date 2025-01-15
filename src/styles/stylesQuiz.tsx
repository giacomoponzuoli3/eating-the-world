import { Dimensions, StyleSheet } from 'react-native';

const {height} = Dimensions.get("window");

export const stylesQuiz = StyleSheet.create({
    containerQuiz: {
        backgroundColor: 'white',
        height: height - 170,
        overflow: 'hidden', // Impedisce il comportamento di scrolling
      },
      closeButton: {
        top: 10,
        right: 0,
      },
      questionCounter: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      optionsContainer: {
        marginVertical: 20,
        alignItems: 'center',
      },
      optionButton: {
        backgroundColor: 'lightgray',
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        width: '90%',
        textAlign: 'center',
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
      },
      correctOption: {
        backgroundColor: '#56C678',
      },
      wrongOption: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
      },
      explanationText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
      },
      leftArrow: {
        left: 10,
        position: 'relative',
        bottom: 0,
      },
      rightArrow: {
        right: 10,
        bottom: 0,
        position: 'relative',
      },    
      defaultOption: {
        backgroundColor: '#f0f0f0', // Colore neutro
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
      },
      // Contenitore per la schermata di completamento
      completedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
      },
      // Testo per il messaggio di completamento
      completedText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
      },
      // Pulsante per terminare il quiz
      finishButton: {
        backgroundColor: '#4CAF50', // Verde per indicare completamento
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
      },
      // Testo all'interno del pulsante di completamento
      finishButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
      },
})