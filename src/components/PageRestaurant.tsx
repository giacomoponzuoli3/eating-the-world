import React, { FC } from "react";
import { Restaurant } from "../utils/interfaces";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white', zIndex: "2" }}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        
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
  