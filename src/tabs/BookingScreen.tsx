import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { View, Button, Text, TouchableOpacity, FlatList, Image, LayoutAnimation, ActionSheetIOS, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import {deleteTableReservation, deleteCulinaryExperienceReservation, getTableReservartionsByUsername, getCulinaryExperienceReservartionsByUsername} from '../dao/reservationsDAO';
import { Reservation } from '../utils/interfaces';
import Modal from 'react-native-modal';
import { getClosureDaysByRestaurant, getRestaurantById } from '../dao/restaurantsDAO';
import { getCulinaryExperiencesByRestaurant, getLanguagesByCulinaryExperience } from '../dao/culinaryExperienceDAO';  
import { stylesBookings } from '../styles/stylesBookings'; 
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagesRestaurants from '../utils/imagesRestaurants';
import QuizScreen from '../components/Quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import CameraScreen from '../components/Camera';
import { BookTable } from '../components/BookTable';
import { BookCulinaryExperience } from '../components/BookCulinaryExperience';
import {getRestaurantsWithQuiz} from '../dao/quizDAO';
interface BookingScreenProps{
  user: any;
  tableBookings: any[];
  specialBookings: any[];
  fetchBookings: () => void;
}

type RootTabParamList = {
  Profile: undefined;
  Maps: undefined;
  Bookings: undefined;
  Favorites: undefined;
};

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }: { isVisible: boolean, onConfirm: () => void, onCancel: () => void }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel} style={stylesBookings.modalOverlay}>
      <View style={stylesBookings.modalContent}>
        <Text style={stylesBookings.modalText}>Are you sure to delete the reservation?</Text>
        <View style={stylesBookings.buttonContainer}>
          <Button title="No" onPress={onCancel} />
          <Button title="Yes" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', // Anno completo (es. 2025)
    month: 'short',  // Mese abbreviato (es. Jan)
    day: 'numeric',  // Giorno numerico (es. 13)
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const BookingsScreen: FC<BookingScreenProps> = ({user, tableBookings, specialBookings, fetchBookings}) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalQuizVisible, setIsModalQuizVisible] = useState(false);
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [specialExperienceDetails, setSpecialExperienceDetails] = useState<{ [key: number]: { description: string; price: string;} }>({});
  const [isQuizVisible, setIsQuizVisible] = useState(false); 
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Bookings'>>();  
  const [labelOpacity] = useState(new Animated.Value(0)); // Opacità animata della label
  const [visibleLabels, setVisibleLabels] = useState<{ [key: number]: boolean }>({});
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const [restaurantStates, setRestaurantStates] = useState<{[key: number]: { quizCompleted: boolean, hasDiscount: string | null }}>({});
  const [qrCode, setQrCode] = useState<string | null>(null); 
  const [quizFound, setQuizFound] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [activeQuizRestaurantId, setActiveQuizRestaurantId] = useState<number>(0);

  //for edit booking
  const [showBook, setShowBook] = useState<boolean>(false);
  const [bookingSelected, setBookingSelected] = useState<Reservation | null>(null);
  const [closingDays, setClosingDays] = useState<any[] | null>(null);
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [culinaryExperience, setCulinaryExperience] = useState<any | null>(null)

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const fetchSpecialExperienceDetails = async (id: number) => {
    const details = await getCulinaryExperiencesByRestaurant(id);
    setSpecialExperienceDetails((prev) => ({
      ...prev,
      [id]: {
        description: details[0].description,
        price: details[0].price,
      },
    }));
  }

  const handleQuizCompletion = (restaurantId: number, scoredDiscount: string | null) => {
    setRestaurantStates(({
      [restaurantId]: {
        quizCompleted: true,
        hasDiscount: scoredDiscount
      }
    }));
  };

  const reservations = useMemo(() => {
    const tableReservations: Reservation[] = (tableBookings as any[]).map((res, index) => ({
      id: index, 
      restaurantId: res.id_restaurant,
      restaurantName: res.restaurant_name,
      date: res.data, 
      time: res.hour, 
      numberOfGuests: res.number_people,
      isSpecialExperience: false,
      special_request: res.special_request
    }));

    const specialReservations: Reservation[] = (specialBookings as any[]).map((res, index) => ({
      id: index+2000,
      restaurantId: res.id_restaurant,
      restaurantName: res.restaurant_name,
      date: res.data,  
      numberOfGuests: res.number_people,
      isSpecialExperience: true,
      language: {id: res.id_language_selected, name: res.name},
      time: res.time,
      special_request: null
    }));

    const combinedReservations = [...tableReservations, ...specialReservations];

    specialReservations.forEach(reservation => {
      if (!specialExperienceDetails[reservation.restaurantId]) {
      fetchSpecialExperienceDetails(reservation.restaurantId);
      }
    });

    return combinedReservations.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateA - dateB;
    });
  }, [tableBookings, specialBookings]);

  const deleteReservation = async (item: Reservation) => {
    if(item.isSpecialExperience){
      await deleteCulinaryExperienceReservation(user.username, item.restaurantId, item.date);
    }else{
      await deleteTableReservation(user.username, item.restaurantId, item.date, item.time || '');
    }

    setAllReservations((prev: any) =>
      prev.filter(
        (res: Reservation) =>
          res.id !== item.id // Filtra l'elemento eliminato
      )
    );
    setIsModalVisible(false);
  }

  const goToMap = () => {
    navigation.navigate('Maps'); // Naviga alla tab "Maps"
  };

  useEffect(() => {
    setAllReservations(reservations);
  }, [reservations]);  

  useFocusEffect(
    useCallback(() => {
      fetchBookings(); 
    }, [user])
  );

  const RestaurantLearnModal = ({ isVisible, onClose, restaurantName, description, quizFound}: { isVisible: boolean; onClose: () => void; restaurantName: string; description: string; quizFound: boolean;}) => {

    const openCamera = () => {
      onClose();
      setIsCameraVisible(true);
    };

    return (
        <Modal
          isVisible={isVisible}
          onBackdropPress={onClose}
          style={stylesBookings.modalOverlay}
        >
        <View style={stylesBookings.modalContent}>
          <TouchableOpacity onPress={onClose} style={stylesBookings.closeButton}>
            <Icon name="times" size={30} color="black" />
          </TouchableOpacity>

          {quizFound ? (
            <>
          <Text style={stylesBookings.modalTitle}>{restaurantName}</Text>
          <Text style={stylesBookings.modalDescription}>{description}</Text>
          <Text style={stylesBookings.explanationText}>
          Scan the QR code on the table to access a quick quiz about the history of the dishes and ingredients at our restaurant. If you score enough points, you'll receive a special discount at the checkout!
          </Text>
          
          <TouchableOpacity style={stylesBookings.scanButton} onPress={() => openCamera()}>
            <Text style={stylesBookings.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
            </>
          ) : (
            <>
            <Text style={stylesBookings.modalTitle}>Not Found 😭</Text>
            <Text style={stylesBookings.modalDescription}> Quiz isn't available for this restaurant yet.</Text>
            </>
          )}
          </View>
        </Modal>
      );
  }; 
  
  const toggleCard = (id: number, isSpecialExperience: boolean) => {
    if (isSpecialExperience){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }
  };

  const handleViewQRCode = async(restaurantId: number) => {
    const restaurantState = restaurantStates[restaurantId];
    if (restaurantState && restaurantState.hasDiscount) {
      setIsQRCodeVisible(true);
    }
    const savedQrCode = await AsyncStorage.getItem('qrCode'); // Recupera il QR code
    if (savedQrCode) {
      setQrCode(savedQrCode); // Aggiorna lo stato con il QR code recuperato
      setIsQRCodeVisible(true); // Mostra il QR code
    }
  };

  const handleQrData = () => {
    setIsCameraVisible(false);
    setIsQuizVisible(true);
  };

  const renderReservation = ({ item }: { item: Reservation }) => {
    const currentTime = new Date();
    const formattedDate = item.date.replace(/\//g, '-'); //Per confronto fra date yyyy/mm/dd e l'oggetto Date()
    const reservationTime = new Date(formattedDate + ' ' + item.time);
    const isLearnAndEarnEnabled = currentTime >= reservationTime;
    const isExpanded = expandedCards[item.id];
    const restaurantState = restaurantStates[item.restaurantId] || { quizCompleted: false, hasDiscount: null };

    const openModalQuiz = async (id: number) => {
      const restaurantsWithQuiz = await getRestaurantsWithQuiz();
      setActiveQuizRestaurantId(id);
      if(restaurantsWithQuiz.find((r: any) => r.id_restaurant === id)){ 
        setQuizFound(true);
        const restaurant: any = await getRestaurantById(id);
        setRestaurantDescription(restaurant[0].description); 
        setName(restaurant[0].name);  
      } else {
        setQuizFound(false);
      }
      setIsModalQuizVisible(true);
    }



    const showActionSheet = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Edit Reservation', 'Delete Reservation', 'Cancel'],
          cancelButtonIndex: 2, 
          destructiveButtonIndex: 1, 
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            setShowBook(true);
            setBookingSelected(item);
          } else if (buttonIndex === 1) {
            setIsModalVisible(true);
            setBookingSelected(item);
          }
        }
      );
    };  

    const handlePressIn = (id: number) => {
      if (!isLearnAndEarnEnabled) {
        setVisibleLabels((prev) => ({ ...prev, [id]: true })); 
        Animated.timing(labelOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          setVisibleLabels((prev) => ({ ...prev, [id]: false }));
        }, 2000); 
      } 
    };

    return (
      <View style={stylesBookings.containerExtern}>
        {!isQuizVisible && (
          <>
            <View style={stylesBookings.card}>
              <View style={stylesBookings.rowContainer}>
              <Image 
                source={imagesRestaurants[item.restaurantName]} 
                style={stylesBookings.restaurantImage} 
              />
              <View style={stylesBookings.infoContainer}>
              {item.isSpecialExperience && (
                <View style={stylesBookings.specialExperienceLabel}>
                <Text style={stylesBookings.specialExperienceLabelText}>Special Experience</Text>
                </View>
              )}
              <Text style={stylesBookings.restaurantName}>{item.restaurantName}</Text>
              <Text style={{fontFamily: 'Poppins-Light'}}>{formatDate(item.date)}{` - ${item.time}`}</Text>
              <Text style={{fontFamily: 'Poppins-LightItalic'}}>{item.numberOfGuests} {item.numberOfGuests === 1 ? 'Guest' : 'Guests'}</Text>
              {!item.isSpecialExperience && !restaurantState.quizCompleted ? ( 
                  <View>
                    <TouchableOpacity 
                      onPress={() => isLearnAndEarnEnabled && openModalQuiz(item.restaurantId) }
                      onPressIn={() => handlePressIn(item.id)}
                      style={[stylesBookings.actionButton, !isLearnAndEarnEnabled && stylesBookings.disabledButton]}>
                      <View style={stylesBookings.actionButtonContent}>
                      <Icon name="coins" size={20} color="#FFF" style={{marginRight: 10}}/>
                        <Text style={stylesBookings.actionButtonText}>Learn & Earn</Text>
                      </View>
                    </TouchableOpacity>
                    {!isLearnAndEarnEnabled && visibleLabels[item.id] && (
                      <Animated.View style={[stylesBookings.labelContainer, { opacity: labelOpacity }]}>
                        <Text style={stylesBookings.disabledLabel}>Available only at the reservation time</Text>
                      </Animated.View>
                    )}
                  </View>
                  ) : !item.isSpecialExperience && restaurantState.hasDiscount!=null ? (
                    <TouchableOpacity 
                      onPress={() => handleViewQRCode(item.restaurantId)} 
                      style={stylesBookings.actionButton}>
                      <View style={stylesBookings.actionButtonContent}>
                        <Text style={stylesBookings.actionButtonText}>View Discount Code</Text>
                      </View>
                    </TouchableOpacity>
                  ) : !item.isSpecialExperience && (
                    <TouchableOpacity style={[stylesBookings.actionButton]}>
                      <View style={stylesBookings.actionButtonContent}>
                        <Text style={stylesBookings.actionButtonText}>No Discount Available</Text>
                      </View>
                    </TouchableOpacity>
                  )
              }
              </View>
              <View style={stylesBookings.upButtons}></View>
                <TouchableOpacity onPress={() => showActionSheet()}>
                  <View style={stylesBookings.ellipsis}>
                  {/* Icona dei 3 puntini che, al click, mostra le varie opzioni */}
                  <Icon name="ellipsis-h" size={15} color='black'/>
                  </View>
                </TouchableOpacity>
                {item.isSpecialExperience && (
                  <TouchableOpacity onPress={() => toggleCard(item.id, item.isSpecialExperience)} style={stylesBookings.downArrow}>
                    <AntDesign name={isExpanded ? "up" : "down"} size={21} color="black"/>
                  </TouchableOpacity>
                )}
              </View>
              <RestaurantLearnModal
                isVisible={isModalQuizVisible}
                onClose={() => setIsModalQuizVisible(false)}
                restaurantName={name}
                description={restaurantDescription}
                quizFound={quizFound}
              />
              <ConfirmationModal
                  isVisible={isModalVisible}
                  onConfirm={() => bookingSelected && deleteReservation(bookingSelected)}
                  onCancel={() => setIsModalVisible(false)}
              />
              {isExpanded && (
                <View>
                  <Text style={stylesBookings.specialExperienceTitle}>Details special experience</Text>
                  <Text style={stylesBookings.specialExperienceDescription}>
                    {specialExperienceDetails[item.restaurantId].description}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={stylesBookings.specialExperiencePrice}>Price: </Text>
                    <Text style={[stylesBookings.specialExperiencePrice, {fontFamily:'Poppins-Light'}]}>
                      {specialExperienceDetails[item.restaurantId].price}€ per person
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={stylesBookings.specialExperiencePrice}>Language: </Text>
                    <Text style={[stylesBookings.specialExperiencePrice, {fontFamily:'Poppins-Light'}]}>
                      {item.language && item.language.name}
                    </Text>
                  </View>
                </View>
              )}
              {isQRCodeVisible && qrCode && (
              <Modal isVisible={isQRCodeVisible} onBackdropPress={() => setIsQRCodeVisible(false)}>
                <View style={stylesBookings.qrCodeBox}>
                  <Text style={stylesBookings.qrCodeTitle}>{restaurantState.hasDiscount} discount on your current meal!</Text>
                  <QRCode value={qrCode} size={290} />
                  <TouchableOpacity
                    style={stylesBookings.buttonQRcode}
                    onPress={() => setIsQRCodeVisible(false)}
                  >
                  <Text style={[stylesBookings.buttonText, {}]}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              )}
            </View>
          </>
        )}
      
    {activeQuizRestaurantId === item.restaurantId && isQuizVisible && (
              <QuizScreen
              id_restaurant={item.restaurantId}
              onFinish={() => {
                setIsQuizVisible(false);
                setIsModalQuizVisible(false);
                setRestaurantStates((prev) => ({
                  ...prev,
                  [item.restaurantId]: {
                    quizCompleted: true,
                    hasDiscount: prev[item.restaurantId]?.hasDiscount || null,
                  },
                }));
              }}
              handleQuizCompletion={handleQuizCompletion}
            />  
          )}
      </View>
    );
  };

  const getInformationsEditBooking = async (booking: any) => {
    try{
      
      //restaurant
      const r: any = await getRestaurantById(booking.restaurantId);
      setRestaurant({...r[0], id: booking.restaurantId});

      //closure days
      const cd: any[] = await getClosureDaysByRestaurant(booking.restaurantId);
      setClosingDays(cd);

      //se è una special experience
      if(booking.isSpecialExperience){
        const ce = await getCulinaryExperiencesByRestaurant(booking.restaurantId);

        const languages = await getLanguagesByCulinaryExperience(ce[0].id);

        ce[0] = {...ce[0], languages: languages} 

        setCulinaryExperience(ce[0]);
      }

    }catch(error){
      console.error("Error in restaurantClosureDaysHours: ", error);
      return error;
    }
  };

  useEffect(() => {
    if(bookingSelected){
      getInformationsEditBooking(bookingSelected);
    }
    
  }, [bookingSelected])

  const getReservations = async () => {
    try{
      const tr = await getTableReservartionsByUsername(user.username);

      const tableReservations: Reservation[] = (tr as any[]).map((res, index) => ({
        id: index, 
        restaurantId: res.id_restaurant,
        restaurantName: res.restaurant_name,
        date: res.data, 
        time: res.hour, 
        numberOfGuests: res.number_people,
        isSpecialExperience: false,
        special_request: res.special_request
      }));

      const sr = await getCulinaryExperienceReservartionsByUsername(user.username); 
  
      const specialReservations: Reservation[] = (sr as any[]).map((res, index) => ({
        id: index+2000,
        restaurantId: res.id_restaurant,
        restaurantName: res.restaurant_name,
        date: res.data,  
        numberOfGuests: res.number_people,
        isSpecialExperience: true,
        language: res.language,
        time: res.time,
        special_request: null
      }));

      const combinedReservations = [...tableReservations, ...specialReservations];

      setAllReservations(combinedReservations);
    
    }catch(error){

    }
  }

  useFocusEffect(
    useCallback(() => {
      getReservations(); 
    }, [])
  );
  
  /** */
  if(showBook && bookingSelected && closingDays && restaurant){

    if(bookingSelected.isSpecialExperience && culinaryExperience){
      return (
        <BookCulinaryExperience
          user={user}
          closingDays={closingDays}
          culinaryExperience={culinaryExperience}
          onCloseRestaurant={
            () => {
              setShowBook(false);
              setBookingSelected(null);
              getReservations();
            }
          } 
          restaurant={restaurant}
          onClose={
            () => {
              setShowBook(false);
              setBookingSelected(null);
              getReservations();
            }
          } 
          date={bookingSelected.date}
          people={bookingSelected.numberOfGuests}
          language={bookingSelected.language}

          isUpdate={true}
        />
      );
    }else{
      return (
        <BookTable
          onCloseRestaurant={
            () => {
              setShowBook(false);
              setBookingSelected(null);
              getReservations();
            }
          } 
          user={user}
          onClose={() => {
            setShowBook(false);
            setBookingSelected(null);
            getReservations();
          }}

          closingDays={closingDays}
          restaurant={restaurant}
          date={bookingSelected.date}
          hour={bookingSelected.time}
          people={bookingSelected.numberOfGuests}
          specialRequest_={bookingSelected.special_request}

          isUpdate={true}
        />
      )
    }
  }

  
  return (
    <>
    {isCameraVisible ? (
      <CameraScreen onQrScanned={handleQrData} onClose={() => setIsCameraVisible(false)} />
    ) : (
    <View style={{flex: 1}}>
      {allReservations.length > 0 ? (
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{ flexGrow: 1 }}
        data={allReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReservation}
      />
       ) : (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {/* Emoji sopra il testo */}
        <Text style={{fontSize: 30, marginBottom: 3}}>😞</Text>
        
        {/* Testo sotto l'emoji */}
        <Text style={{ fontFamily: 'Poppins-ExtraLight', fontSize: 17, textAlign: 'center' }}>
          You don't have any reservations yet.
        </Text>

        {/* Pulsante per navigare alla tab "Maps" */}
        <TouchableOpacity onPress={() => {goToMap()}} style={stylesBookings.button}>
          <Text style={stylesBookings.buttonText}>Go To Map &gt;</Text>
        </TouchableOpacity>
      </View>
    )}
      </View>
    )}
    </>
  );
};

export { BookingsScreen };
