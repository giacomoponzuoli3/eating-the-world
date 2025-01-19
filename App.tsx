import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import { GestureHandlerRootView } from "react-native-gesture-handler";
//components
import { ProfileScreen } from './src/tabs/ProfileScreen';
import MapsScreen from './src/tabs/MapsScreen';
import { BookingsScreen } from './src/tabs/BookingScreen';
import { FavoritesScreen } from './src/tabs/FavoritesScreen';
import loadFonts from './src/styles/font';
import { styles } from "./src/styles/styles";
import { LogBox } from 'react-native';

// Disabilita tutti i warning
LogBox.ignoreAllLogs(true);

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();

export type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
  phone_number: string;
};

//dao
import { getRestaurants } from "./src/dao/restaurantsDAO";
import { getUsers } from "./src/dao/usersDAO";
import { getTableReservartionsByUsername, getCulinaryExperienceReservartionsByUsername, deleteExpiredReservations } from './src/dao/reservationsDAO';
import { ActivityIndicator, Text, View } from "react-native";

const App = () => {
  const [fontsLoaded] = loadFonts();

  const [restaurants, setRestaurants] = useState<any[]>([]);

  const [users, setUsers] = useState<User[]>([]); // users è un array di utenti
  const [user, setUser] = useState<User | undefined>(); //prende il primo utente presente nel db
  const [tableReservations, setTableReservations] = useState<any[]>([]);
  const [specialReservations, setSpecialReservations] = useState<any[]>([]);
  const [qrCodeLink, setQrCodeLink] = useState<string>("https://example.com/profile/1");


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const allRestaurants = await getRestaurants();
        if (allRestaurants && Array.isArray(allRestaurants)) {
          setRestaurants(allRestaurants);
        } else {
          console.error("Error in the response format of the getRestaurants");
        }
      } catch (error) {
        console.error("Error in the getRestaurants: ", error);
      }
    };

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

    fetchRestaurants();
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
    deleteExpiredReservations();
    fetchBookings();
  }, [user]);

  // Verifica che user e restaurants siano disponibili
  if (!user || !restaurants) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        {/* Mostra una rotella di caricamento */}
        <ActivityIndicator size="large" color="#6200ee" />
        {/* Oppure puoi usare un testo come alternativa */}
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {user && restaurants &&
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Maps" // Imposta il tab iniziale su "Maps"
              screenOptions={({ route }) => ({
                // Aggiunta delle icone
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: keyof typeof Ionicons.glyphMap = "person";

                  if (route.name === "Profile") {
                    iconName = focused ? "person" : "person-outline";
                  } else if (route.name === "Maps") {
                    iconName = focused ? "map" : "map-outline";
                  } else if (route.name === "Bookings") {
                    iconName = focused ? "calendar" : "calendar-outline";
                  } else if (route.name === "Favorites") {
                    iconName = focused ? "star" : "star-outline";
                  }

                // Restituiamo l'icona
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6200ee', // Colore quando è selezionato
              tabBarInactiveTintColor: 'gray', // Colore quando non è selezionato
              headerTitle: 'Eating The World', // Titolo impostato per tutti i tab
              
            })}
          >
            <Tab.Screen name="Profile">
                {() => <ProfileScreen user={user} users={users} setUser={setUser}/>}
              </Tab.Screen>
            
            <Tab.Screen name="Maps">
                {() => <MapsScreen restaurants={restaurants} setRestaurants={setRestaurants} user={user}/>}
            </Tab.Screen>
            
            <Tab.Screen name="Bookings">
                {() => user ? <BookingsScreen user={user} tableBookings={tableReservations} specialBookings={specialReservations} fetchBookings={fetchBookings} /> : <Text>Login for view your reservations</Text>}
            </Tab.Screen> 
            <Tab.Screen name="Favorites">
              {() => <FavoritesScreen user={user}/>}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
        </GestureHandlerRootView>
      }
    </>
  );
};

export default App;