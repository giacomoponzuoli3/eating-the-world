import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Per le icone (freccia e chiusura)
import { getQuestionsByRestaurantId } from '../dao/quizDAO';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris'],
    correct: 2,
    explanation: 'Paris is the capital of France.',
  },
  {
    question: 'Which language is primarily spoken in Brazil?',
    options: ['Spanish', 'Portuguese', 'English'],
    correct: 1,
    explanation: 'The official language of Brazil is Portuguese.',
  },
  // Aggiungi altre domande come preferisci
];

const QuizScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const fetchQuestions = async () => {
    const res = await getQuestionsByRestaurantId(3);
    console.log(res);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    if (answers[currentQuestionIndex] === null) {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestionIndex] = selectedIndex;
        return newAnswers;
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* X per chiudere il quiz */}
      <TouchableOpacity style={styles.closeButton} onPress={onFinish}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>

      {/* Numero domanda e testo */}
      <Text style={styles.questionCounter}>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</Text>
      <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>

      {/* Opzioni */}
      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              answers[currentQuestionIndex] === index &&
                (index === questions[currentQuestionIndex].correct ? styles.correctOption : styles.wrongOption),
            ]}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Spiegazione (solo dopo risposta) */}
      {answers[currentQuestionIndex] !== null && (
        <Text style={styles.explanationText}>{questions[currentQuestionIndex].explanation}</Text>
      )}

      {/* Frecce per navigare */}
      <View style={styles.navigationContainer}>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <TouchableOpacity onPress={handleNext}>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  questionCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: 'lightgray',
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  wrongOption: {
    backgroundColor: 'red',
  },
  explanationText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default QuizScreen;
