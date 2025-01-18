import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Per le icone (freccia e chiusura)
import { getQuestionsByRestaurantId } from '../dao/quizDAO';
import { Question } from '../utils/interfaces';
import { stylesQuiz } from '../styles/stylesQuiz';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface QuizScreenProps {
  id_restaurant: number;
  onFinish: () => void; // Aggiungiamo la funzione onFinish come prop
  handleQuizCompletion: (id_resturant: number, discount: string | null) => void;
}

type RootTabParamList = {
  Profile: undefined;
  Maps: undefined;
  Bookings: undefined;
  Favorites: undefined;
};

const shuffleArray = (array: string[], correctIndex: number) => {
  const indexedArray = array.map((value, index) => ({ value, index }));
  const shuffledArray = indexedArray.sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledArray.findIndex((item) => item.index === correctIndex);
  return {
    shuffledArray: shuffledArray.map((item) => item.value),
    newCorrectIndex,
  };
};

const QuizScreen: FC<QuizScreenProps> = ({ id_restaurant, onFinish, handleQuizCompletion }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersSelected, setAnswersSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [numberRight, setNumberRight] = useState(0);
  const [finalDiscount, setFinalDiscount] = useState<(string | null)>(null);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Bookings'>>();  

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
    setAnswersSelected(new Array(formattedQuestions.length).fill(null));
  };

  useEffect(() => {
    fetchQuestions();
  }, [id_restaurant]);

  const handleAnswer = (selectedIndex: number, isCoorect: boolean) => {
    if(isCoorect){
      setNumberRight((prev) => prev+1);
    }
    setAnswersSelected((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = selectedIndex;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length-1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } 
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleEnd = async() => {
    setIsQuizCompleted(true);
    let discount = null;
    if(numberRight == questions.length){
      discount = '20%'; 
    } else if (numberRight == questions.length-1){
      discount = '10%'; 
    } 

    setFinalDiscount(discount);

    if(discount!=null){
      const qrData = `Show this code at checkout: ${finalDiscount}`;
      await AsyncStorage.setItem('qrCode', qrData); // Salva il QR code
    } else {
      await AsyncStorage.removeItem('qrCode'); // Rimuovi il QR code
    }
    handleQuizCompletion(id_restaurant, discount);
  }

  const goToBookings = () => {
    navigation.navigate('Bookings');
    onFinish();
  }


  const currentQuestion = questions[currentQuestionIndex];

  if (isQuizCompleted) {
    if(finalDiscount == null) {
      return (
        <View style={stylesQuiz.completedContainer}>
          <TouchableOpacity style={stylesQuiz.crossButton} onPress={onFinish}>
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <Text style={stylesQuiz.completedText}>Quiz completed!</Text>
          <Text style={stylesQuiz.instructionsText}>Unfortunately, you didn't win a discount this time.{"\n"}Better luck next time!</Text>
          <TouchableOpacity onPress={goToBookings} style={stylesQuiz.button}>
            <Text style={stylesQuiz.buttonText}>Go to Bookings</Text>
          </TouchableOpacity>
        </View>
      );
      } else {
        return (
          <View style={stylesQuiz.completedContainer}>
            <TouchableOpacity style={stylesQuiz.crossButton} onPress={onFinish}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={stylesQuiz.completedText}>
              Congratulations! You've won a {finalDiscount} discount!
            </Text>
            <Text style={stylesQuiz.instructionsText}>
              Please show this QR code at the payment desk to redeem your discount.
            </Text>
            <QRCode value={`Discount: ${finalDiscount}`} size={250} />
            <TouchableOpacity onPress={goToBookings} style={stylesQuiz.button}>
              <Text style={stylesQuiz.buttonText}>Go to Bookings</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }; 

  return (
    <>
      {currentQuestion && (
        <>
          <View style={stylesQuiz.containerQuiz}>
            <TouchableOpacity style={stylesQuiz.closeButton} onPress={onFinish}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <View style={stylesQuiz.progressContainer}>
              <Text style={stylesQuiz.questionCounter}>
                {`${currentQuestionIndex + 1} / ${questions.length}`}
              </Text>
              <View style={stylesQuiz.progressBar}>
                <View
                  style={[
                    stylesQuiz.progressFill,
                    { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },  // Calcola la percentuale
                  ]}
                />
              </View>
            </View>

            <Text style={stylesQuiz.questionText}>{currentQuestion.question}</Text>
            <View style={stylesQuiz.optionsContainer}>
              {currentQuestion.answers.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    stylesQuiz.optionButton,
                    answersSelected[currentQuestionIndex] !== null &&
                      (index === currentQuestion.correct
                        ? stylesQuiz.correctOption
                        : answersSelected[currentQuestionIndex] === index
                        ? stylesQuiz.wrongOption
                        : stylesQuiz.defaultOption),
                  ]}
                  onPress={() => handleAnswer(index, index === currentQuestion.correct)}
                  disabled={answersSelected[currentQuestionIndex] !== null} // Disabilita dopo aver risposto
                >
                  <Text style={stylesQuiz.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {answersSelected[currentQuestionIndex] !== null && (
              <View>
              <Text style={stylesQuiz.solutionText}>Explanation</Text>
              <Text style={stylesQuiz.explanationText}>{currentQuestion.explanation}</Text>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>    
          {currentQuestionIndex != 0 && (      
            <TouchableOpacity
              style={[stylesQuiz.leftArrow]}
              onPress={handleBack}
              disabled={currentQuestionIndex === 0}
            >
              <AntDesign name="arrowleft" size={40} color="rgba(98, 0, 238, 1)" />
            </TouchableOpacity>
          )}

            {currentQuestionIndex === questions.length - 1 ? (
              <TouchableOpacity
                style={stylesQuiz.finishButton}
                onPress={handleEnd}
              >
                <Text style={stylesQuiz.finishButtonText}>End Quiz</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[stylesQuiz.rightArrow]}
                onPress={handleNext}
                disabled={isQuizCompleted}
              >
                <AntDesign name="arrowright" size={40} color="rgba(98, 0, 238, 1)" />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default QuizScreen;
