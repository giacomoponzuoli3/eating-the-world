import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Per le icone (freccia e chiusura)
import { getQuestionsByRestaurantId } from '../dao/quizDAO';
import { Question } from '../utils/interfaces';

interface QuizScreenProps {
  id_restaurant: number;
  onFinish: () => void; // Aggiungiamo la funzione onFinish come prop
}

const shuffleArray = (array: string[], correctIndex: number) => {
  const indexedArray = array.map((value, index) => ({ value, index }));
  const shuffledArray = indexedArray.sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledArray.findIndex((item) => item.index === correctIndex);
  return {
    shuffledArray: shuffledArray.map((item) => item.value),
    newCorrectIndex,
  };
};

const QuizScreen: FC<QuizScreenProps> = ({ id_restaurant, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersSelected, setAnswersSelected] = useState<(number | null)[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const fetchQuestions = async () => {
    const rawQuestions = await getQuestionsByRestaurantId(id_restaurant) as any[]; // Usare id_restaurant
    const formattedQuestions: Question[] = rawQuestions.map((res) => {
      const { shuffledArray, newCorrectIndex } = shuffleArray(
        [res.answers[0], res.answers[1], res.answers[2]],
        2
      );

      return {
        question: res.question,
        explanation: res.explanation,
        answers: shuffledArray,
        correct: newCorrectIndex,
      };
    });

    setQuestions(formattedQuestions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [id_restaurant]);

  const handleAnswer = (selectedIndex: number) => {
    setAnswersSelected((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = selectedIndex;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length-1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswersSelected([]);
    setIsQuizCompleted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {currentQuestion && (
        <View style={styles.containerQuiz}>
          <TouchableOpacity style={styles.closeButton} onPress={onFinish}>
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.questionCounter}>
            {`${currentQuestionIndex + 1} / ${questions.length}`}
          </Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.answers.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answersSelected[currentQuestionIndex] !== null &&
                    (index === currentQuestion.correct
                      ? styles.correctOption
                      : answersSelected[currentQuestionIndex] === index
                      ? styles.wrongOption
                      : null),
                ]}
                onPress={() => handleAnswer(index)}
                disabled={answersSelected[currentQuestionIndex] !== null} // Disabilita dopo aver risposto
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {answersSelected[currentQuestionIndex] !== null && (
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          )}

          <TouchableOpacity
            style={[styles.leftArrow]}
            onPress={handleBack}
            disabled={currentQuestionIndex === 0 || isQuizCompleted}
          >
            <AntDesign name="arrowleft" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rightArrow]}
            onPress={handleNext}
            disabled={currentQuestionIndex === questions.length - 1|| isQuizCompleted}
          >
            <AntDesign name="arrowright" size={40} color="black" />
          </TouchableOpacity>
          </View>
      )}
      {isQuizCompleted && (
          <TouchableOpacity onPress={handleReset}>
            <Text>Reset Quiz</Text>
          </TouchableOpacity>
      )}
    
    </>
  );
};

const styles = StyleSheet.create({
  containerQuiz: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    
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
    backgroundColor: 'red',
  },
  explanationText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  leftArrow: {
    left: 10,
    position: 'absolute',
    bottom: 0,
  },
  rightArrow: {
    right: 10,
    bottom: 0,
    position: 'absolute',
  },
});

export default QuizScreen;
