import React, { FC, useCallback, useEffect, useState } from "react";
import { Restaurant } from "../utils/interfaces";
import { View, TouchableOpacity, Text, ImageBackground, ScrollView } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesPageRestaurant } from "../styles/stylesPageRestaurant";
import imagesRestaurants from "../utils/imagesRestaurants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { deleteFavoriteRestaurant, insertFavoriteRestaurant, isFavoriteRestaurant } from "../dao/favoritesDAO";
import { styles } from "../styles/styles";
import { useFocusEffect } from "@react-navigation/native";


interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
  
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
   
  const initialValue = async () => {
    try{
      const result: Boolean = await isFavoriteRestaurant(user.username, restaurant.id);
      setIsFavorite(result);
    }catch(error){
      console.error("Error in isFavoriteRestaurant: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      initialValue(); // Aggiorna i dati ogni volta che la tab diventa attiva
    }, [])
  );


  const modifyFavorite = async (id_restaurant: number) => {
    if(isFavorite){ //true
      //delete from favorite 
      await deleteFavoriteRestaurant(user.username, id_restaurant);
      setIsFavorite(false);
      
    }else{
      //insert into favorite
      await insertFavoriteRestaurant(user.username, id_restaurant);
      setIsFavorite(true);
    }
  }

  return (
    <View style={stylesPageRestaurant.container}>
      <ScrollView>
        <View>
          <ImageBackground 
            source={imagesRestaurants[restaurant.name]} 
            style={stylesPageRestaurant.imageBackground}
          > 
            <View style={stylesPageRestaurant.imagesStyle}>
              <TouchableOpacity onPress={onClose} style={stylesPageRestaurant.iconWrapper}>
                <Ionicons name="chevron-back-sharp" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {modifyFavorite(restaurant.id)}} style={stylesPageRestaurant.iconWrapper}>
                <Ionicons name={isFavorite ? "star" : "star-outline"} size={25} color="white" />
              </TouchableOpacity>
            </View>
              
          </ImageBackground>
        </View>

        <View style={stylesPageRestaurant.containerText}>
          <Text style={stylesPageRestaurant.titleRestaurant}>{restaurant.name}</Text>
          
          <View style={stylesPageRestaurant.containerDescription}>
            <Text style={stylesPageRestaurant.description}>{restaurant.description}</Text>

            {/* Icona dell'indirizzo medio */}
            <View style={stylesPageRestaurant.containerIconInformation}>
              <View style={stylesPageRestaurant.iconInformationWrapper}>
                <Ionicons name="location-outline" style={stylesPageRestaurant.iconInformation} />
              </View>
              <Text style={stylesPageRestaurant.textInformation}>{restaurant.address}</Text>
            </View>

            {/* Icona del tipo di cucina */}
            <View style={stylesPageRestaurant.containerIconInformation}>
              <View style={stylesPageRestaurant.iconInformationWrapper}>
                <Ionicons name="restaurant-outline" style={stylesPageRestaurant.iconInformation} />
              </View>
              <Text style={stylesPageRestaurant.textInformation}>Tipologia ristorante</Text>
            </View>

            {/* Icona del prezzo medio */}
            <View style={stylesPageRestaurant.containerIconInformation}>
              <View style={stylesPageRestaurant.iconInformationWrapper}>
                <Icon name="money" style={stylesPageRestaurant.iconInformation} />
              </View>
              <Text style={stylesPageRestaurant.textInformation}>Average price {restaurant.price_range} €</Text>
            </View>
            
            {/* Icona del numero di telefono */}
            <View style={stylesPageRestaurant.containerIconInformation}>
              <View style={stylesPageRestaurant.iconInformationWrapper}>
                <Feather name="phone" style={stylesPageRestaurant.iconInformation} />
              </View>
              <Text style={stylesPageRestaurant.textInformation}>+{restaurant.phone_number}</Text>
            </View>

            {/* Icona dell'orario di apertura */}
            <View style={stylesPageRestaurant.containerIconInformation}>
              <View style={stylesPageRestaurant.iconInformationWrapper}>
                <AntDesign name="clockcircleo" style={stylesPageRestaurant.iconInformation} />
              </View>
              <Text style={stylesPageRestaurant.textInformation}>+{restaurant.phone_number}</Text>
            </View>
            
          </View>

        </View>
        
        
      </ScrollView>
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Text>My fixed footer</Text>
      </View>
    </View>
  );
};


export { PageRestaurant}
  