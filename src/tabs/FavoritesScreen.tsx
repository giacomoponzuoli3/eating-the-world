import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActionSheetIOS, ActivityIndicator } from 'react-native';
import { stylesFavorite } from '../styles/stylesFavorites';

import { getFavoriteRestaurantsByUsername, deleteFavoriteRestaurant } from '../dao/favoritesDAO';
import Icon from 'react-native-vector-icons/FontAwesome5';  // Importa l'icona
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'; // Importa BottomTabNavigationProp
import { Restaurant } from '../utils/interfaces';

//images
import imageMap from '../utils/imageMap';


type RootTabParamList = {
  Profile: undefined;
  Maps: undefined;
  Bookings: undefined;
  Favorites: undefined;
};

const FavoritesScreen = (props: any) => {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Favorites'>>();

  const [favorites, setFavorites] = useState<Restaurant[] | null>(null);
  const [images, setImages] = useState<any | null>(null);

  const goToMap = () => {
    navigation.navigate('Maps'); // Naviga alla tab "Maps"
  };

  const getFavoritesByUsername = async () => {
    try{

      const getFavorites: any[] = await getFavoriteRestaurantsByUsername(props.user.username);

      setFavorites(getFavorites);

    }catch(error){
      console.error("Error in the getFavoriteRestaurantsByUsername: ", error);
    }
  }

  const showActionSheet = (id_restaurant: number, name_restaurant: string) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Remove from Favorites', 'Book a table', 'Cancel'],
        cancelButtonIndex: 2, // L'indice del pulsante "Cancel"
        destructiveButtonIndex: 0, // L'indice del pulsante "Remove from list"
        title: name_restaurant
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          deleteAction(id_restaurant);
        } else if (buttonIndex === 1) {
          console.log('Book a table selected');
        }
      }
    );
  };
  
  const deleteAction = async (id_restaurant: number) => {
    try{
      await deleteFavoriteRestaurant(props.user.username, id_restaurant);

      const getFavorites = await getFavoriteRestaurantsByUsername(props.user.username);

      setFavorites(getFavorites);

    }catch(error){
      console.error("Error in delete favorite restaurant: ", error);
    }
  }

  useEffect(() => {
    getFavoritesByUsername();
  }, []);

  const renderRestaurant = ({ item }: { item: any }) => (
    <>
    <View style={stylesFavorite.listItem}>
        <View style={stylesFavorite.gridElements}>
          <Image 
            source={imageMap[item.name]} 
            style={stylesFavorite.restaurantImage} 
          />
          <View style={stylesFavorite.textElements}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <Text style={stylesFavorite.restaurantName}>{item.name}</Text>
              <Text>{item.imageBlob}</Text>
              <View style={stylesFavorite.ellipsis}>
                {/* Icona della stella che, al click, rimuove il ristorante dai preferiti */}
                <TouchableOpacity onPress={() => showActionSheet(item.id, item.name)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="ellipsis-h" size={12} color='black'/>
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={stylesFavorite.restaurantAddress}>{item.address}</Text>
            <Text>
              Price Range:  
                <Text style={stylesFavorite.restaurantRating}>
                  {item.price_range <= 10 ? ' €' 
                    : item.price_range <= 30 ? ' €€' 
                    : item.price_range <= 80 ? ' €€€' 
                    : ' €€€€'
                  }
                  </Text>
            </Text>
          </View>
        </View>
    </View>
    </>
  );
    
  // Verifica che user e restaurants siano disponibili
  if (!favorites) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        {/* Mostra una rotella di caricamento */}
        <ActivityIndicator size="large" color="#6200ee" />
        {/* Oppure puoi usare un testo come alternativa */}
        <Text style={stylesFavorite.loadingText}>Loading...</Text>
      </View>
    );
  }

  return(
    <>
      <View style={stylesFavorite.container}>
        
        {favorites && favorites.length > 0 ? 
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRestaurant}
          />
        
        : 
          <View style={{ alignItems: 'center' }}>
            {/* Emoji sopra il testo */}
            <Text style={{fontSize: 30, marginBottom: 3}}>😞</Text>
            
            {/* Testo sotto l'emoji */}
            <Text style={{ fontFamily: 'Poppins-ExtraLight', fontSize: 17, textAlign: 'center' }}>
              Explore restaurants and add them to this list
            </Text>

            {/* Pulsante per navigare alla tab "Maps" */}
            <TouchableOpacity onPress={() => {goToMap()}} style={stylesFavorite.button}>
              <Text style={stylesFavorite.buttonText}>Go To Map &gt;</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </>
  )
};



export { FavoritesScreen }