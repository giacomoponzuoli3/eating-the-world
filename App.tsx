import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Icone da Expo
import { GestureHandlerRootView } from "react-native-gesture-handler";
//components
<<<<<<< HEAD
import { ProfileScreen } from "./src/components/ProfileScreen";
import { MapsScreen } from "./src/components/MapsScreen";
import { BookingsScreen } from "./src/components/BookingScreen";
import { FavoritesScreen } from "./src/components/FavoritesScreen";
=======
import { ProfileScreen } from './src/tabs/ProfileScreen';
import  MapsScreen  from './src/tabs/MapsScreen';
import { BookingsScreen } from './src/tabs/BookingScreen';
import { FavoritesScreen } from './src/tabs/FavoritesScreen';
>>>>>>> b830d175a3cf7f997599285ac1bf3a58306c1ff0

// === Configurazione del Navigatore a Schede ===
const Tab = createBottomTabNavigator();

export type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
};

//dao
<<<<<<< HEAD
import { getRestaurants } from "./src/dao/restaurantsDAO";
import { getUsers } from "./src/dao/usersDAO";

const App = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]); // users è un array di utenti
  const [user, setUser] = useState<User | undefined>(undefined);

=======
import { getRestaurants } from './src/dao/restaurantsDAO';
import { Restaurant } from './src/utils/interfaces';
import { insertFavoriteRestaurant } from './src/dao/favoritesDAO';

const App = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [user, setUser] = useState(); //prende il primo utente presente nel db
/*
>>>>>>> b830d175a3cf7f997599285ac1bf3a58306c1ff0
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const allRestaurants = await getRestaurants(); 
        if (allRestaurants && Array.isArray(allRestaurants)) {
          setRestaurants(allRestaurants); 
        } else {
<<<<<<< HEAD
          console.error("Error in the response format of the getRestaurants");
        }
      } catch (error) {
        console.error("Error in the getRestaurants: ", error);
      }
    };
    console.log("entra nel primo useffect");
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

  useEffect(() => {
    console.log("entra nel secondo useeffect");
    console.log("users: ", users);
    console.log("user: ", user);
  } , [users, user]);

=======
          console.error('Error in the response format of getRestaurants');
        }
      } catch (error) {
        console.error('Error in getRestaurants: ', error);
      }
    };
  
    fetchRestaurants(); 
  }, []);
  */

  
>>>>>>> b830d175a3cf7f997599285ac1bf3a58306c1ff0
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
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

<<<<<<< HEAD
              // Restituiamo l'icona
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#000", // Colore quando è selezionato
            tabBarInactiveTintColor: "gray", // Colore quando non è selezionato
            headerTitle: "Eating The World", // Titolo impostato per tutti i tab
          })}
        >
          <Tab.Screen name="Profile">
            {() => <ProfileScreen user={user} users={users} setUser={setUser} />}
          </Tab.Screen>
          <Tab.Screen name="Maps" component={MapsScreen} />
          <Tab.Screen name="Bookings" component={BookingsScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
=======
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
        <Tab.Screen name="Bookings" component={BookingsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
>>>>>>> b830d175a3cf7f997599285ac1bf3a58306c1ff0
    </GestureHandlerRootView>
  );
};

export default App;