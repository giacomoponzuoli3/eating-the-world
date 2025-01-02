import React, { FC, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteTableReservation, getTableReservartionsByUsername, getCulinaryExperienceReservartionsByUsername, deleteCulinaryExperienceReservation} from '../dao/reservationsDAO';
import { Reservation } from '../utils/interfaces';
import { useIsFocused } from '@react-navigation/native';

// Abilita LayoutAnimation su Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface BookingScreenProps{
  username: string;
  tableBookings: any[];
  specialBookings: any[];
}

const BookingsScreen: FC<BookingScreenProps> = ({username, tableBookings, specialBookings}) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  //const [tableReservations, setTableReservations] = useState<Reservation[]>([]);
  //const [specialReservations, setSpecialReservations] = useState<Reservation[]>([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const isFocused = useIsFocused();

  /*const loadTableReservations = async (): Promise<Reservation[]> => { 
    try{
      const dbReservations = await getTableReservartionsByUsername(username);

      const formattedReservations: Reservation[] = (dbReservations as any[]).map((res, index) => ({
        id: index, 
        restaurantId: res.id_restaurant,
        restaurantName: res.restaurant_name,
        date: res.data, 
        time: res.hour, 
        numberOfGuests: res.number_people,
        isSpecialExperience: false,
        imageUrl: res.image_url || 'default_image_path', // Se l'immagine non è disponibile, usa un valore predefinito
      }));

      return formattedReservations;
    }catch(error){
      console.error("Error loading table reservations: ", error);
      return [];
    }
  };

  const loadSpecialReservations = async (): Promise<Reservation[]> => {
    try{
      const dbReservations = await getCulinaryExperienceReservartionsByUsername(username);
      const formattedReservations: Reservation[] = (dbReservations as any[]).map((res, index) => ({
        id: index+2000,
        restaurantId: res.id_restaurant,
        restaurantName: res.restaurant_name,
        date: res.data,  
        numberOfGuests: res.number_people,
        isSpecialExperience: true,
        language: res.language,
        imageUrl: res.image_url || 'default_image_path', // Se l'immagine non è disponibile, usa un valore predefinito
    }));

      return formattedReservations;
    }catch(error){
      console.error("Error loading special reservations: ", error);
      return [];
    }
  }*/

  const loadReservations = async () => {
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
      imageUrl: res.image_url || 'default_image_path', // Se l'immagine non è disponibile, usa un valore predefinito
    }));

    //setTableReservations(await loadTableReservations());
    //setSpecialReservations(await loadSpecialReservations());

    const combinedReservations = [...tableReservations, ...specialReservations];

    const sortedReservations = combinedReservations.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateA - dateB;
    });

    setAllReservations(sortedReservations);
  };

  useEffect(() => {
    if(isFocused){
      loadReservations();
    }
  }, [isFocused]);  

  const formatDate = (date: string): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = date.split('-');
    return `${year} ${months[parseInt(month) - 1]} ${day}`;
  };  

  const toggleCard = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        You have no reservations yet.
      </Text>
    </View>
  );

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
        <Text>{formatDate(item.date)}{item.time ? ` - ${item.time}` : ''}</Text>
        <Text>{item.numberOfGuests} Guests</Text>
      </View>
      </View>
      </TouchableOpacity>

      {isExpanded && (
      /*<View>
        {item.isSpecialExperience && (
          <View style={styles.specialExperienceContainer}>
            <Text style={styles.specialExperienceTitle}>Special Experience</Text>
            <Text style={styles.specialExperienceDescription}>
              {item.specialExperienceDetails}
            </Text>
          </View>
        )}*/

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
      //</View>
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
});

export { BookingsScreen };
