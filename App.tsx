import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icone da Expo

//components
import { ProfileScreen } from './src/components/ProfileScreen';
import { MapsScreen } from './src/components/MapsScreen';
import { BookingsScreen } from './src/components/BookingScreen';
import { FavoritesScreen } from './src/components/FavoritesScreen';

import * as SQLite from 'expo-sqlite'

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const dbPath = `${FileSystem.documentDirectory}db.db`;


async function copyDatabaseFile() {
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  
  if (!fileInfo.exists) {
    console.log('Copia del file db.db in corso...');
    const asset = Asset.fromModule(require('./assets/db.db'));
      await asset.downloadAsync(); // Assicurati che l'asset venga scaricato
      await FileSystem.copyAsync({
        from: asset.localUri ? asset.localUri : "",
        to: dbPath
      });
    console.log(dbPath);
    console.log('File db.db copiato con successo.');
  } else {
    console.log('Il file db.db esiste già.');
  }
}

async function openDatabase() {
  await copyDatabaseFile();
  return await SQLite.openDatabaseAsync(`db.db`, undefined, `${FileSystem.documentDirectory}`);
}

const App = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        await FileSystem.deleteAsync(dbPath, {idempotent: true});
        
        const db = await openDatabase();
        
        // Esegui la query SELECT * FROM restaurants
        const results = await db.getAllAsync('SELECT * FROM restaurants', []);
        console.log('Ristoranti trovati:', results);
        
        setRestaurants(results);

        console.log("result: " + results);
      } catch (error) {
        console.error('Errore durante il caricamento dei ristoranti:', error);
      }
    };

    loadRestaurants();
  }, []);
  
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
          headerTitle: 'Eating The World', // Titolo impostato per tutti i tab
          
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
