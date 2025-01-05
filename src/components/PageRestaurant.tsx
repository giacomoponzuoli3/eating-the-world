import React, { FC } from "react";
import { Restaurant } from "../utils/interfaces";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24 }}>{restaurant.name}</Text>
        <Text style={{ fontSize: 16, marginVertical: 10 }}>{restaurant.description}</Text>
        <Text>{user.name}</Text>
      </View>
    );
};


export { PageRestaurant}
  