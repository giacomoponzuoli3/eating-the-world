import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Abilita LayoutAnimation su Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface Reservation {
  id: number;
  restaurantId: number;
  restaurantName: string;
  date: string; // Formato: 'YYYY-MM-DD'
  time: string; // Formato: 'HH:mm'
  numberOfGuests: number;
  isSpecialExperience: boolean;
  imageUrl: string; // URL immagine ristorante
}

const mockReservations = [
  {
    id: 1,
    restaurantId: 101,
    restaurantName: 'La Dolce Vita',
    date: '2024-12-25',
    time: '19:30',
    numberOfGuests: 4,
    isSpecialExperience: false,
    imageUrl: 'https://example.com/trattoria-mario.jpg', 
  },
  {
    id: 2,
    restaurantId: 102,
    restaurantName: 'Gourmet Experience',
    date: '2024-12-31',
    time: '20:00',
    numberOfGuests: 2,
    isSpecialExperience: true,
    imageUrl: "../../assets/profile-screenshot.png", // Cambia con l'immagine reale
  },
  {
    id: 3,
    restaurantId: 103,
    restaurantName: 'Trattoria da Mario',
    date: '2024-12-22',
    time: '13:00',
    numberOfGuests: 6,
    isSpecialExperience: false,
    imageUrl: 'src/images/Immagine WhatsApp 2024-12-23 ore 15.37.32_6a54259d.jpg', // Cambia con l'immagine reale
  },
];

const formatDate = (date: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [year, month, day] = date.split('-');
  return `${year} ${months[parseInt(month) - 1]} ${day}`;
};

const BookingsScreen: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderReservation = ({ item }: { item: Reservation }) => {
    const currentTime = new Date();
    const reservationTime = new Date(item.date + ' ' + item.time);
    const isLearnAndEarnEnabled = currentTime >= reservationTime;
    const isExpanded = expandedCards[item.id];

    return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleCard(item.id)}>
      <View style={styles.rowContainer}>
      <Image source={require("../../assets/profile-screenshot.png")} style={styles.restaurantImage}/>
      <View style={styles.infoContainer}>
        {item.isSpecialExperience && (
          <View style={styles.specialExperienceLabel}>
            <Text style={styles.specialExperienceLabelText}>Special Experience</Text>
          </View>
        )}
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text>{formatDate(item.date)} - {item.time}</Text>
        <Text>{item.numberOfGuests} Guests</Text>
      </View>
      </View>
      </TouchableOpacity>

      {isExpanded && (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: isLearnAndEarnEnabled ? '#666666' : '#CCC' },
          ]}
          disabled={!isLearnAndEarnEnabled}
          onPress={() => isLearnAndEarnEnabled && console.log('Learn&Earn')}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.iconAndText}>
            <Icon name="emoji-events" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.actionButtonText}>Learn & Earn</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
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
          onPress={() => console.log('Delete Reservation')}
        >
          <View style={styles.actionButtonContent}>
            <View style={styles.iconAndText}>
              <Icon name="delete" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.actionButtonText}>Delete Reservation</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
      )}
    </View>
    );
};

  return (
      <FlatList
        data={mockReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReservation}
        contentContainerStyle={styles.container}
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
});

export { BookingsScreen };
