import React, { FC, useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ImageBackground, ScrollView, Linking, ActionSheetIOS, InteractionManager, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { BookTable } from "./BookTable";
import { CulinaryExperienceComponent } from "./CulinaryExperienceComponent";
import { MenuComponent } from "./MenuComponent";

interface PageRestaurantProps{
    restaurant: Restaurant,
    user: any,
    onClose: () => void
}

const PageRestaurant: FC<PageRestaurantProps> = ({ restaurant, onClose, user}: any) => {
  const navigation = useNavigation();  // Ottieni l'oggetto di navigazione
  

  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const [workingHours, setWorkingHours] = useState<any[] | null>(null);
  const [closingDays, setClosingDays] = useState<any[] | null>(null);
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [showHoursDays, setShowHoursDays] = useState<Boolean>(false);

  //show components
  const [showBookTable, setShowBookTable] = useState<boolean>(false); // Stato per gestire il passaggio
  const [shouwCulinaryExperience, setShowCulinaryExperience] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);


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

  const handleOpenMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
  
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Apple Maps', 'Google Maps', 'Cancel'],
        cancelButtonIndex: 2,
        
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Apple Maps
          Linking.openURL(`maps://?q=${encodedAddress}`);
        } else if (buttonIndex === 1) {
          // Google Maps
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
        }
      }
    );
  };


  useFocusEffect(
    useCallback(() => {
      initialValue(); // Aggiorna i dati ogni volta che la tab diventa attiva
    }, [])
  );

  useEffect(() => {
    restaurantClosureDaysHours();
    Linking.canOpenURL(`tel:${restaurant.phone_number}`).catch(() => {});
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

  //chiamo la pagina di prenotazione di un tavolo
  if (showBookTable && closingDays) {
    return (
      <BookTable 
        onCloseRestaurant={onClose} 
        restaurant={restaurant} 
        user={user} 
        onClose={() => setShowBookTable(false)} 
        closingDays={closingDays}
        date={undefined}
        hour={undefined}
        people={undefined}
        specialRequest_={null}
        isUpdate={false}
      />
    );
  }

  //mostro il menu
  if (showMenu) {
    return (
      <MenuComponent 
        onClose={() => setShowMenu(false)}
        restaurant={restaurant}
      />
    )
  }

  if (shouwCulinaryExperience && closingDays) {
    return  (
      <CulinaryExperienceComponent 
        user={user} 
        closingDays={closingDays} 
        onCloseRestaurant={onClose} 
        restaurant={restaurant} 
        onClose={() => {setShowCulinaryExperience(false)}} 
      />
    )
  }

  return (
    <>
      {restaurant && 
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
              {restaurant && restaurant.culinary_experience == 1 &&
                (<TouchableOpacity onPress={() => setShowCulinaryExperience(true)} style={stylesPageRestaurant.buttonCulinaryExperience}>
                  <Text style={stylesPageRestaurant.textCulinaryExperience}>Special Experience</Text>
                </TouchableOpacity>)
              }

              <Text style={stylesPageRestaurant.titleRestaurant}>{restaurant.name}</Text>
              
              <View style={stylesPageRestaurant.containerDescription}>
                <Text style={stylesPageRestaurant.description}>{restaurant.description}</Text>

                {/* Icona dell'indirizzo */}
                <TouchableOpacity onPress={() => {handleOpenMaps(restaurant.address)}}>         
                  <View style={stylesPageRestaurant.containerIconInformation}>
      
                    <View style={stylesPageRestaurant.iconInformationWrapper}>
                      <Ionicons name="location-outline" style={stylesPageRestaurant.iconInformation} />
                    </View>
                    <Text style={stylesPageRestaurant.textInformationUnderline}>{restaurant.address}</Text>
                  </View>
                </TouchableOpacity>

                {/* Icona del menu */}
                <TouchableOpacity onPress={() => {setShowMenu(true)}}>   
                  <View style={stylesPageRestaurant.containerIconInformation}>  
                    <View style={stylesPageRestaurant.iconInformationWrapper}>
                      <Ionicons name="book-outline" style={stylesPageRestaurant.iconMenu} />
                    </View>
                    <Text style={stylesPageRestaurant.textInformationUnderline}>Menu</Text>
                  </View>  
                </TouchableOpacity>
                
                {/* Icona del numero di telefono */}
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${restaurant.phone_number}`)}>        
                  <View style={stylesPageRestaurant.containerIconInformation}>
                    <View style={stylesPageRestaurant.iconInformationWrapper}>
                      <Feather name="phone" style={stylesPageRestaurant.iconInformation} />
                    </View>
                    <Text style={stylesPageRestaurant.textInformationUnderline}>+{restaurant.phone_number}</Text>
                  </View>
                </TouchableOpacity> 


                {/* Icona del tipo di cucina */}
                <View style={stylesPageRestaurant.containerIconInformation}>
                  <View style={stylesPageRestaurant.iconInformationWrapper}>
                    <Ionicons name="restaurant-outline" style={stylesPageRestaurant.iconInformation} />
                  </View>
                  <View style={stylesPageRestaurant.containerCategory}>
                    {restaurant.tags.map((tag: any, index: number) => {
                        const isLast = index === restaurant.tags.length - 1; // Controlla se è l'ultimo elemento
                        return (
                          <Text key={`${restaurant.id}-${tag.name}`} style={stylesPageRestaurant.textCategory}>
                            {tag.name}{!isLast && ','} {/* Aggiungi la virgola se non è l'ultimo */}
                          </Text>
                        );
                      })}
                  </View>
                </View>

                {/* Icona del prezzo medio */}
                <View style={stylesPageRestaurant.containerIconInformation}>
                  <View style={stylesPageRestaurant.iconInformationWrapper}>
                    <FontAwesome name="money" style={stylesPageRestaurant.iconInformation} />
                  </View>
                  <Text style={stylesPageRestaurant.textInformation}>Average price {restaurant.price_range} €</Text>
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
              <TouchableOpacity onPress={() => setShowBookTable(true)} style={stylesPageRestaurant.buttonBookTable}>
                <Text style={stylesPageRestaurant.textBookTable}>Book a Table</Text>
              </TouchableOpacity>
            </View>
            
          </ScrollView>
          {/*<View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'black'}}>
              <Text>My fixed footer</Text>
            </View>*/}
        </View>
      }
    </>

  );
};


export { PageRestaurant}
  