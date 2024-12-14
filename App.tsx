import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icone da Expo

//components
import { ProfileScreen } from './src/components/ProfileScreen';
import { MapsScreen } from './src/components/MapsScreen';
import { BookingsScreen } from './src/components/BookingScreen';
import { FavoritesScreen } from './src/components/FavoritesScreen';

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
          
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerTitle: 'Eating The World' }}/>
        <Tab.Screen name="Maps" component={MapsScreen} options={{ headerTitle: 'Eating The World' }}/>
        <Tab.Screen name="Bookings" component={BookingsScreen} options={{ headerTitle: 'Eating The World' }}/>
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerTitle: 'Eating The World' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
