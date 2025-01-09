import React, { FC, useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ImageBackground, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
//style
import { stylesPageRestaurant } from "../styles/stylesPageRestaurant";
//utils
import imagesRestaurants from "../utils/imagesRestaurants";
import { Restaurant } from "../utils/interfaces";
//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
//dao
import { deleteFavoriteRestaurant, insertFavoriteRestaurant, isFavoriteRestaurant } from "../dao/favoritesDAO";
import { getWorkingHoursByRestaurant, getClosureDaysByRestaurant, getDaysWeek } from "../dao/restaurantsDAO";


interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
  
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const [workingHours, setWorkingHours] = useState<any[] | null>(null);
  const [closingDays, setClosingDays] = useState<any[] | null>(null);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [showHoursDays, setShowHoursDays] = useState<Boolean>(false);

  //data di oggi
  const today = new Date();
  //giorni della settimana
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //funzione che setta il valore di isFavorite
  const initialValue = async () => {
    try{
      const result: Boolean = await isFavoriteRestaurant(user.username, restaurant.id);
      setIsFavorite(result);
    }catch(error){
      console.error("Error in isFavoriteRestaurant: ", error);
    }
  };

  //funzione che prende gli orari del ristorante e i giorni di chiusura
  const restaurantClosureDaysHours = async () => {
    try{

      //working hours
      const wh = await getWorkingHoursByRestaurant(restaurant.id);
      setWorkingHours(wh);

      //closure days
      const cd = await getClosureDaysByRestaurant(restaurant.id);
      setClosingDays(cd);

      //calcolo se è aperto ora o no
      const day_today = days[today.getDay()];

      if(cd.some((row: any) => row.day_name === day_today )){ //se oggi è un giorno di chiusura
        setIsOpen(false);
      }else{ 
        
        setIsOpen(wh.some((row: any) => {
          const [hours_start, minutes_start] = row.hour_start_deal.split(':').map(Number); // Converte la stringa 'hh:mm' in numeri
          const [hours_end, minutes_end] = row.hour_end_deal.split(':').map(Number); // Converte la stringa 'hh:mm' in numeri
  
          const comparisonTime_start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours_start, minutes_start);
          const comparisonTime_end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours_end, minutes_end);

          return (
            comparisonTime_start.getTime() <= today.getTime() &&
            today.getTime() <= comparisonTime_end.getTime()
          );
        }))

      }

    }catch(error){
      console.error("Error in restaurantClosureDaysHours: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      initialValue(); // Aggiorna i dati ogni volta che la tab diventa attiva
    }, [])
  );

  useEffect(() => {
    restaurantClosureDaysHours();
  }, [])  


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
              <TouchableOpacity onPress={() => onClose()} style={stylesPageRestaurant.iconWrapper}>
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
                <FontAwesome name="money" style={stylesPageRestaurant.iconInformation} />
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
            <TouchableOpacity style={stylesPageRestaurant.touchHoursDays} onPress={() => {setShowHoursDays((precedence) => !precedence)}}>
              <View style={stylesPageRestaurant.containerIconInformation}>
                <View style={stylesPageRestaurant.iconInformationWrapper}>
                  <AntDesign name="clockcircleo" style={stylesPageRestaurant.iconInformation} />
                </View>
                <View style={stylesPageRestaurant.containerHours}>
                  {closingDays && workingHours && isOpen ? 
                      <Text style={stylesPageRestaurant.textOpen}>Open now</Text> 
                    : 
                      closingDays && closingDays?.some((day) => day == days[today.getDay()]) ?
                          <Text style={stylesPageRestaurant.textClosed}>Closed Today</Text>   
                        : 
                        <Text style={stylesPageRestaurant.textClosed}>Closed Now</Text>  
                  }
                  {/* Icona freccia giù o sù */}
                  {!showHoursDays ?
                      <AntDesign name="down" size={15} color="black" style={stylesPageRestaurant.iconHours}/>
                    : 
                      <AntDesign name="up" size={15} color="black" style={stylesPageRestaurant.iconHours}/>
                  }
                </View>
              </View>
              {/* Mostra gli orari del ristorante se showHoursDays è true */}
              {workingHours && closingDays && showHoursDays && (
                <View style={stylesPageRestaurant.openingHoursContainer}>
                  {days.map((day, index) => (
                    <View key={index} style={stylesPageRestaurant.dayRow}>
                      
                      {today.getDay() === index ? <Text style={stylesPageRestaurant.textToday}>{day}:</Text> : <Text style={stylesPageRestaurant.textDays}>{day}:</Text>}
                      
                      {closingDays && closingDays.some((closingDay) => closingDay.day_name === day) ? 
                          <Text style={stylesPageRestaurant.textHoursClosed}>Closed</Text>
                        : 
                          workingHours.map((row: any) => {
                            return <Text key={`${row.id_deal}-${row.id_restaurant}`} style={stylesPageRestaurant.textHours}>{row.hour_start_deal}-{row.hour_end_deal}</Text>
                          })}
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={stylesPageRestaurant.containerMenu}>
          
        </View>
        
      </ScrollView>
      {/*<View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'black'}}>
          <Text>My fixed footer</Text>
        </View>*/}
    </View>
  );
};


export { PageRestaurant}
  