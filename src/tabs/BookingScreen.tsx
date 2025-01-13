import React, { FC, useState, useEffect, useMemo } from 'react';
import { View, Button, Text, TouchableOpacity, FlatList, StyleSheet, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteTableReservation, deleteCulinaryExperienceReservation} from '../dao/reservationsDAO';
import { Reservation } from '../utils/interfaces';
import Modal from 'react-native-modal';
import { getRestaurantById } from '../dao/restaurantsDAO';
import { getCulinaryExperiencesByRestaurant } from '../dao/culinaryExperienceDAO'; 
import QuizScreen from '../components/Quiz';  


// Abilita LayoutAnimation su Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface BookingScreenProps{
  username: string;
  tableBookings: any[];
  specialBookings: any[];
  fetchBookings: () => void;
}

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }: { isVisible: boolean, onConfirm: () => void, onCancel: () => void }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel} style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure to delete the reservation?</Text>
        <View style={styles.buttonContainer}>
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

const renderEmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      You have no reservations yet.
    </Text>
  </View>
);

const BookingsScreen: FC<BookingScreenProps> = ({username, tableBookings, specialBookings, fetchBookings}) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalQuizVisible, setIsModalQuizVisible] = useState(false);
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [specialExperienceDetails, setSpecialExperienceDetails] = useState<{ [key: number]: { description: string; price: string; } }>({});
  const [isQuizVisible, setIsQuizVisible] = useState(false); 

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
          style={styles.modalOverlay}
        >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
  
          <Text style={styles.modalTitle}>{restaurantName}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <Text style={styles.explanationText}>
          Scan the QR code on the table to access a quick quiz about the history of the dishes and ingredients at our restaurant. If you score enough points, you'll receive a special discount at the checkout!
          </Text>
          
          <TouchableOpacity style={styles.scanButton} onPress={() => handleQuiz()}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </TouchableOpacity>
          </View>
        </Modal>
      );
  };  

  const toggleCard = (id: number, restaurantId: number, isSpecialExperience: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderReservation = ({ item }: { item: Reservation }) => {
    const currentTime = new Date();
    const formattedDate = item.date.replace(/\//g, '-');
    const reservationTime = new Date(formattedDate + ' ' + item.time);
    const isLearnAndEarnEnabled = currentTime >= reservationTime;
    const isExpanded = expandedCards[item.id];

    const openModalQuiz = async (id: number) => {
      setIsModalQuizVisible(true);
      const restaurant: any = await getRestaurantById(id);
      setRestaurantDescription(restaurant[0].description);
    }

    return (
  <View>
  {!isQuizVisible && (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleCard(item.id, item.restaurantId, item.isSpecialExperience)}>
      <View style={styles.rowContainer}>
      <Image source={require("../../assets/profile-screenshot.png")} style={styles.restaurantImage}/>
      <View style={styles.infoContainer}>
        {item.isSpecialExperience && (
          <View style={styles.specialExperienceLabel}>
            <Text style={styles.specialExperienceLabelText}>Special Experience</Text>
          </View>
        )}
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text>{formatDate(item.date)}{` - ${item.time}`}</Text>
        <Text>{item.numberOfGuests} Guests</Text>
      </View>
      </View>
      </TouchableOpacity>

      {isExpanded && (
      <View>
        {item.isSpecialExperience && (
          <View>
            <Text style={styles.specialExperienceTitle}>Details</Text>
            <Text style={styles.specialExperienceDescription}>
              {specialExperienceDetails[item.restaurantId].description}
            </Text>
            <Text style={styles.specialExperiencePrice}>
              Price: {specialExperienceDetails[item.restaurantId].price}€
            </Text>
          </View>
        )}

      <View style={styles.buttonsContainer}>  
        {!item.isSpecialExperience && ( 
        <View>       
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isLearnAndEarnEnabled ? '#666666' : '#CCC' },
          ]}
          disabled={!isLearnAndEarnEnabled}
          onPress={() => isLearnAndEarnEnabled && openModalQuiz(item.restaurantId)}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.iconAndText}>
            <Icon name="emoji-events" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.actionButtonText}>Learn & Earn</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <RestaurantLearnModal
          isVisible={isModalQuizVisible}
          onClose={() => setIsModalQuizVisible(false)}
          restaurantName={item.restaurantName}
          description={restaurantDescription}
        />
        </View>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => console.log('Modify Reservation')}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.iconAndText}>
              <Icon name="edit" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.actionButtonText}>Edit Reservation</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.iconAndText}>
              <Icon name="delete" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.actionButtonText}>Delete Reservation</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
        <ConfirmationModal
          isVisible={isModalVisible}
          onConfirm={() => deleteReservation(item)}
          onCancel={() => setIsModalVisible(false)}
        />
      </View>
      </View>
      )}
    </View>
  )}
  {isQuizVisible && (
      <QuizScreen
        onFinish={() => {
          setIsQuizVisible(false);  // Nascondiamo il quiz
        }}
      />
  )}
  </View>
    );
};

  return (
      <FlatList
        data={allReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReservation}
        contentContainerStyle={allReservations.length === 0 ? styles.emptyContainer : styles.container}
        ListEmptyComponent={renderEmptyList}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row', 
    marginBottom: 5,
  },
  restaurantImage: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  dateText: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservationDetails: {
    fontSize: 14,
    marginTop: 4,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  specialExperienceLabel: {
    backgroundColor: '#FF0000', 
    paddingVertical: 2, 
    paddingHorizontal: 4, 
    borderRadius: 4, 
    marginBottom: 4, 
    alignSelf: 'flex-start', 
    textAlign: 'center', 
  },
  specialExperienceLabelText: {
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 12, 
  },  
  actionButton: {
    backgroundColor: '#666666',
    padding: 12,
    borderRadius: 8,
    marginBottom: 1,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  actionButtonContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  iconAndText: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon: {
    marginRight: 8, 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modalOverlay: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,  
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontStyle: 'italic', 
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  scanButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
  },
  specialExperienceTitle: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#333', 
    textTransform: 'uppercase', 
    letterSpacing: 1.2, 
    marginBottom: 2, 
    marginTop: 10, 
  },
  specialExperienceDescription: {
    fontSize: 14, 
    color: '#555',
    lineHeight: 22, 
    marginBottom: 10, 
    fontStyle: 'italic', 
  },
  specialExperiencePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

export { BookingsScreen };
