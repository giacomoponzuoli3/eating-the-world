import React, { FC, useEffect, useState } from "react";
import { Restaurant } from "../utils/interfaces";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { Icon } from "react-native-elements";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { stylesPageRestaurant } from "../styles/stylesPageRestaurant";
import imagesRestaurants from "../utils/imagesRestaurants";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
  
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  
  const modifyFavorite = async () => {
    if(isFavorite){ //true
      setIsFavorite(false);
    }else{
      setIsFavorite(true);
    }
  }

  return (
    <View style={stylesPageRestaurant.container}>
      <View>
        <ImageBackground 
          source={imagesRestaurants[restaurant.name]} 
          style={stylesPageRestaurant.imageBackground}
        > 
          <View style={stylesPageRestaurant.imagesStyle}>
            <TouchableOpacity onPress={onClose} style={stylesPageRestaurant.iconWrapper}>
              <Ionicons name="chevron-back-sharp" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={modifyFavorite} style={stylesPageRestaurant.iconWrapper}>
              <Ionicons name={isFavorite ? "star" : "star-outline"} size={25} color="white" />
            </TouchableOpacity>
          </View>
            
        </ImageBackground>
      </View>

      <Text style={{ fontSize: 24 }}>{restaurant.name}</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>{restaurant.description}</Text>
      <Text>{user.name}</Text>

      <FontAwesome5Icon name="money" size={20}/> <Text>{restaurant.price_range}</Text>

      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <Text>My fixed footer</Text>
      </View>
    </View>
  );
};


export { PageRestaurant}
  