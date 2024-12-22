import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icone da Expo
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//components
import { ProfileScreen } from './src/components/ProfileScreen';
import { MapsScreen } from './src/components/MapsScreen';
import { BookingsScreen } from './src/components/BookingScreen';
import { FavoritesScreen } from './src/components/FavoritesScreen';

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();


//dao
import { getRestaurants } from './src/dao/restaurantsDAO';


const App = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [user, setUser] = useState(); //prende il primo utente presente nel db

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const allRestaurants = await getRestaurants();
        if (allRestaurants && Array.isArray(allRestaurants)) {
          setRestaurants(allRestaurants);
        } else {
          console.error('Error in the response format of the getRestaurants');
        }
      } catch (error) {
        console.error('Error in the getRestaurants: ', error);
      }
    };

    fetchRestaurants();
  }, []);
  
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
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};


export default App;
