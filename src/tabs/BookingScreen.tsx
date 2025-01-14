import React, { FC, useState, useEffect, useMemo } from 'react';
import { View, Button, Text, TouchableOpacity, FlatList, Image, LayoutAnimation, ActionSheetIOS} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import {deleteTableReservation, deleteCulinaryExperienceReservation} from '../dao/reservationsDAO';
import { Reservation } from '../utils/interfaces';
import Modal from 'react-native-modal';
import { getRestaurantById } from '../dao/restaurantsDAO';
import { getCulinaryExperiencesByRestaurant } from '../dao/culinaryExperienceDAO'; 
import QuizScreen from '../components/Quiz'; 
import { stylesBookings } from '../styles/stylesBookings'; 
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagesRestaurants from '../utils/imagesRestaurants';

interface BookingScreenProps{
  username: string;
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

const formatDate = (date: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = date.split('/');
  return `${year} ${months[parseInt(month) - 1]} ${day}`;
};  

const BookingsScreen: FC<BookingScreenProps> = ({username, tableBookings, specialBookings, fetchBookings}) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalQuizVisible, setIsModalQuizVisible] = useState(false);
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [specialExperienceDetails, setSpecialExperienceDetails] = useState<{ [key: number]: { description: string; price: string; } }>({});
  const [isQuizVisible, setIsQuizVisible] = useState(false); 
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Bookings'>>();

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

  const reservations = useMemo(() => {
    const tableReservations: Reservation[] = (tableBookings as any[]).map((res, index) => ({
      id: index, 
      restaurantId: res.id_restaurant,
      restaurantName: res.restaurant_name,
      date: res.data, 
      time: res.hour, 
      numberOfGuests: res.number_people,
      isSpecialExperience: false,
      imageUrl: res.image_url || 'default_image_path', // Se l'immagine non è disponibile, usa un valore predefinito
    }));

    const specialReservations: Reservation[] = (specialBookings as any[]).map((res, index) => ({
      id: index+2000,
      restaurantId: res.id_restaurant,
      restaurantName: res.restaurant_name,
      date: res.data,  
      numberOfGuests: res.number_people,
      isSpecialExperience: true,
      language: res.language,
      time: res.time,
      imageUrl: res.image_url || 'default_image_path', // Se l'immagine non è disponibile, usa un valore predefinito
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
      await deleteCulinaryExperienceReservation(username, item.restaurantId, item.date);
    }else{
      await deleteTableReservation(username, item.restaurantId, item.date, item.time || '');
    }
    setIsModalVisible(false);
    fetchBookings();
  }

  const goToMap = () => {
    navigation.navigate('Maps'); // Naviga alla tab "Maps"
  };

  useEffect(() => {
    setAllReservations(reservations);
  }, [reservations]);  

  const handleQuiz = () => {
    setIsQuizVisible(true);
    //setIsModalQuizVisible(false);
  }

  const RestaurantLearnModal = ({ isVisible, onClose, restaurantName, description,}: { isVisible: boolean; onClose: () => void; restaurantName: string; description: string;}) => {
    return (
        <Modal
          isVisible={isVisible}
          onBackdropPress={onClose}
          style={stylesBookings.modalOverlay}
        >
        <View style={stylesBookings.modalContent}>
          <TouchableOpacity onPress={onClose} style={stylesBookings.closeButton}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
  
          <Text style={stylesBookings.modalTitle}>{restaurantName}</Text>
          <Text style={stylesBookings.modalDescription}>{description}</Text>
          <Text style={stylesBookings.explanationText}>
          Scan the QR code on the table to access a quick quiz about the history of the dishes and ingredients at our restaurant. If you score enough points, you'll receive a special discount at the checkout!
          </Text>
          
          <TouchableOpacity style={stylesBookings.scanButton} onPress={() => handleQuiz()}>
            <Text style={stylesBookings.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
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

  const renderReservation = ({ item }: { item: Reservation }) => {
    const currentTime = new Date();
    const reservationTime = new Date(item.date + ' ' + item.time);
    const isLearnAndEarnEnabled = currentTime >= reservationTime;
    const isExpanded = expandedCards[item.id];

    const openModalQuiz = async (id: number) => {
      setIsModalQuizVisible(true);
      const restaurant: any = await getRestaurantById(id);
      setRestaurantDescription(restaurant[0].description);
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
            console.log('Edit reservation');
          } else if (buttonIndex === 1) {
            setIsModalVisible(true);
          }
        }
      );
    };  

    return (
      <View style={stylesBookings.containerExtern}>
        {!isQuizVisible && (
          <>
            <View style={stylesBookings.card}>
              <TouchableOpacity onPress={() => toggleCard(item.id, item.isSpecialExperience)}>
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
                <View style={stylesBookings.downArrow}>
                  <Text style={{fontFamily: 'Poppins-LightItalic'}}>{item.numberOfGuests} {item.numberOfGuests === 1 ? 'Guest' : 'Guests'}</Text>
                  {item.isSpecialExperience && (<AntDesign name="down" size={24} color="black"/>)}
                </View>
                </View>
                <TouchableOpacity onPress={() => showActionSheet()}>
                  <View style={stylesBookings.ellipsis}>
                  {/* Icona dei 3 puntini che, al click, mostra le varie opzioni */}
                  <Icon name="ellipsis-h" size={15} color='black'/>
                  </View>
                </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View style={stylesBookings.buttonsContainer}>  
                {!item.isSpecialExperience && ( 
                  <>
                    <View>
                      <TouchableOpacity 
                        disabled={!isLearnAndEarnEnabled}
                        onPress={() => isLearnAndEarnEnabled && openModalQuiz(item.restaurantId)} 
                        style={stylesBookings.actionButton}>
                        <View style={stylesBookings.actionButtonContent}>
                          <Text style={stylesBookings.actionButtonText}>Learn & Earn</Text>
                          <Icon name="chevron-right" size={20} color="#FFF" />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <RestaurantLearnModal
                      isVisible={isModalQuizVisible}
                      onClose={() => setIsModalQuizVisible(false)}
                      restaurantName={item.restaurantName}
                      description={restaurantDescription}
                    />
                  </>
                )}
              </View>
      <ConfirmationModal
          isVisible={isModalVisible}
          onConfirm={() => deleteReservation(item)}
          onCancel={() => setIsModalVisible(false)}
      />
      {isExpanded && (
        <View>
          <Text style={stylesBookings.specialExperienceTitle}>Details</Text>
          <Text style={stylesBookings.specialExperienceDescription}>
            {specialExperienceDetails[item.restaurantId].description}
          </Text>
          <Text style={stylesBookings.specialExperiencePrice}>
            Price: {specialExperienceDetails[item.restaurantId].price}€
          </Text>
        </View>
      )}
    </View>
    </>
  )}
  {isQuizVisible && (
      <QuizScreen
        id_restaurant={item.restaurantId}
        onFinish={() => {
          setIsQuizVisible(false);
          setIsModalVisible(false);
        }} 
      />
  )}
  </View>
    );
};

  return (
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
  );
};

export { BookingsScreen };
