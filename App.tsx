import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icone da Expo
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//components
import { ProfileScreen } from './src/tabs/ProfileScreen';
import  MapsScreen  from './src/tabs/MapsScreen';
import { BookingsScreen } from './src/tabs/BookingScreen';
import { FavoritesScreen } from './src/tabs/FavoritesScreen';

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();

export type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
};

//dao
import { getRestaurants } from './src/dao/restaurantsDAO';
import { getUsers } from './src/dao/usersDAO';
import { Restaurant } from './src/utils/interfaces';
import { insertFavoriteRestaurant } from './src/dao/favoritesDAO';
import { getTableReservartionsByUsername, getCulinaryExperienceReservartionsByUsername } from './src/dao/reservationsDAO';

const App = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [users, setUsers] = useState<User[]>([]); // users è un array di utenti
  const [user, setUser] = useState<User | undefined>(undefined);
  const [tableReservations, setTableReservations] = useState<any[]>([]);
  const [specialReservations, setSpecialReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const allRestaurants = await getRestaurants(); 
        if (allRestaurants && Array.isArray(allRestaurants)) {
          setRestaurants(allRestaurants); 
        } else {
          console.error('Error in the response format of getRestaurants');
        }
      } catch (error) {
        console.error('Error in getRestaurants: ', error);
      }
    };
  
    fetchRestaurants(); 

    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        if (allUsers && Array.isArray(allUsers)) {
          setUsers(allUsers);
          setUser(allUsers[0]); // Imposta il primo utente come quello corrente
        } else {
          console.error("Error in the response format of the getUsers");
        }
      } catch (error) {
        console.error("Error in the getUsers: ", error);
      }
    };

    fetchUsers();
  }, []);

  async function fetchBookings(): Promise<void> {
    try {
      if(user){
        const tableRes = await getTableReservartionsByUsername(user.username);
        const specialRes = await getCulinaryExperienceReservartionsByUsername(user.username);
        if (Array.isArray(tableRes)) {
          setTableReservations(tableRes);
        }        
        if(Array.isArray(specialRes)){       
          setSpecialReservations(specialRes);     
        }
      }
    } catch (error) {
      console.error("Error in the getBookings: ", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  
  return (
  <GestureHandlerRootView>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Aggiunta delle icone
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "person";  

            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Maps') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'star' : 'star-outline';
            }

            // Restituiamo l'icona
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000', // Colore quando è selezionato
          tabBarInactiveTintColor: 'gray', // Colore quando non è selezionato
          headerTitle: 'Eating The World', // Titolo impostato per tutti i tab
          
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Maps">
            {() => <MapsScreen restaurants={restaurants}/>}
        </Tab.Screen>
        <Tab.Screen name="Bookings">
            {() => user ? <BookingsScreen username={user.username} tableBookings={tableReservations} specialBookings={specialReservations} fetchBookings={fetchBookings} /> : <Text>Login for view your reservations</Text>}
        </Tab.Screen> 
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};


export default App;
