import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { stylesFavorite } from '../styles/stylesFavorites';

import { getFavoriteRestaurantsByUsername, deleteFavoriteRestaurant } from '../dao/favoritesDAO';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importa l'icona

const FavoritesScreen = (props: any) => {
  const [favorites, setFavorites] = useState<any[]>();

  const getFavoritesByUsername = async () => {
    try{
      const getFavorites = await getFavoriteRestaurantsByUsername(props.user.username);

      setFavorites(getFavorites);

      console.log(getFavorites)

    }catch(error){
      console.error("Error in the getFavoriteRestaurantsByUsername: ", error);
    }
  }
  
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
          <Image source={require("../../assets/profile-screenshot.png")} style={stylesFavorite.restaurantImage} />
          <View style={stylesFavorite.textElements}>
            <Text style={stylesFavorite.restaurantName}>{item.name}</Text>
            <Text style={stylesFavorite.restaurantAddress}>{item.address}</Text>
            <Text>
              Price Range: 
                <Text style={stylesFavorite.restaurantRating}>
                  {item.price_range <= 10 ? '€' 
                    : item.price_range <= 30 ? '€€' 
                    : item.price_range <= 80 ? '€€€' 
                    : '€€€€'
                  }
                  </Text>
            </Text>
          </View>
          <View style={stylesFavorite.iconStar}>
           {/* Icona della stella che, al click, rimuove il ristorante dai preferiti */}
          <TouchableOpacity onPress={() => deleteAction(item.id)}>
            <Icon name="star" size={30} color="gold" />
          </TouchableOpacity>
          </View>
        </View>
    </View>
    </>
  );


  return(
    <>
      <Text style={stylesFavorite.textTitle}>Favorites</Text>
      <View style={stylesFavorite.container}>
        
        {favorites && favorites.length > 0 ? 
          <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderRestaurant}
        />
        
        : 
          <Text>There isn't favorite restaurant</Text>
        }
      </View>
    </>
  )
};



export { FavoritesScreen }