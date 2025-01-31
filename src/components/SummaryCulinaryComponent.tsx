import React, { FC } from "react";
import { ActionSheetIOS, Alert, Linking, Text, TouchableOpacity, View } from "react-native";

// Stili
import { stylesSummaryCulinaryBook } from "../styles/stylesSummaryCulinaryBook";
// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from "react-native-vector-icons/FontAwesome";

//dao
import {insertCulinaryExperienzeReservation, updateCulinaryExperienceReservation } from "../dao/reservationsDAO";

interface SummaryCulinaryComponentProps{
    user: any,
    restaurant: any,
    selectedDate: string,
    setSelectedDate: (date: string | null) => void,
    selectedPeople: number,
    setSelectedPeople: (num: number | null) => void,
    selectedLanguage: any,
    setSelectedLanguage: (language: any) => void,
    culinaryExperience: any,
    onClose: () => void,
    isUpdate: boolean,
    oldDate: string | undefined
}

export const SummaryCulinaryComponent: FC<SummaryCulinaryComponentProps> = ({isUpdate, oldDate, user, culinaryExperience, setSelectedLanguage, selectedLanguage, restaurant, selectedDate,  selectedPeople, setSelectedDate, setSelectedPeople, onClose }) => {

    const formatDate = (inputDate: string) => {
        const date = new Date(inputDate);
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric', // Anno completo (es. 2025)
          month: 'short',  // Mese abbreviato (es. Jan)
          day: 'numeric',  // Giorno numerico (es. 13)
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const confirmBookingSpecialExperience = async () => {
        try{
            const result = await insertCulinaryExperienzeReservation(restaurant.id, user.username, selectedDate, selectedPeople, selectedPeople*culinaryExperience.price, selectedLanguage.id );

            if(result == null){
                // Mostra il popup di errore
                Alert.alert(
                    "Special Experience Booking Error",
                    "An error occurred while registering your booking. Please try again.",
                    [{ text: "OK", onPress: () => onClose() }]
                );
            }else{
                // Popup di conferma
                Alert.alert(
                    "Special Experience Booking Confirmed",
                    "Your booking has been successfully registered!",
                    [{ text: "OK", onPress: () => onClose() }]
                );
            }
            
        }catch(error){
            // Mostra il popup di errore
            Alert.alert(
                "Special Experience Booking Error",
                "An error occurred while registering your booking. Please try again.",
                [{ text: "OK", onPress: () => onClose() }]
            );

            console.error("Error in confirmReservation: ", error);
        }finally{
            setSelectedDate(null);
            setSelectedPeople(null);
            setSelectedLanguage(null);
        }
    }

    const editBookingSpecialExperience = async () => {
        try{
            
            if(oldDate != undefined){
                await updateCulinaryExperienceReservation(restaurant.id, user.username, oldDate, selectedDate, selectedPeople, selectedPeople*culinaryExperience.price, selectedLanguage.id );
            }
            // Popup di conferma
            Alert.alert(
                "Special Experience Booking Updated",
                "Your booking has been successfully updated!",
                [{ text: "OK", onPress: () => onClose() }]
            );
        }catch(error){

            // Mostra il popup di errore
            Alert.alert(
                "Special Experience Booking Error",
                "An error occurred while updating your booking. Please try again.",
                [{ text: "OK", onPress: () => onClose() }]
            );

            console.error("Error in confirmReservation: ", error);
        }finally{
            setSelectedDate(null);
            setSelectedPeople(null);
            setSelectedLanguage(null);
        }
    }


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

    return (
        <View style={{flex: 1 }}>
            <Text style={stylesSummaryCulinaryBook.textSummaryGeneralInformations}>General Informations</Text>
            
            <View style={stylesSummaryCulinaryBook.containerInformations}>

                {/* Icona del ristorante */}
                <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                    <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                        <Ionicons name="restaurant-outline" style={stylesSummaryCulinaryBook.iconSummary} />
                    </View>
                    <Text style={stylesSummaryCulinaryBook.textSummary}>{restaurant.name}</Text>
                </View>

                {/* Icona dell'indirizzo */}
                <TouchableOpacity onPress={() => {handleOpenMaps(restaurant.address)}}>         
                    <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                        <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                            <Ionicons name="location-outline" style={stylesSummaryCulinaryBook.iconSummary} />
                        </View>
                        <Text style={stylesSummaryCulinaryBook.textSummary}>{restaurant.address}</Text>
                    </View>
                </TouchableOpacity>

                <Text style={stylesSummaryCulinaryBook.textSummarySpecialRequest}>Special Experience Informations</Text>

                {/* Icona della data */}
                <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                    <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                        <Ionicons name="calendar-outline" style={stylesSummaryCulinaryBook.iconSummary} />
                    </View>
                    <Text style={stylesSummaryCulinaryBook.textSummary}>{formatDate(selectedDate)}</Text>
                </View>

                {/* Icona della lingua */}
                <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                    <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                        <Fontisto name="world-o" style={stylesSummaryCulinaryBook.iconSummary} />
                    </View>
                    <Text style={stylesSummaryCulinaryBook.textSummary}>{selectedLanguage.name}</Text>
                </View>

                {/* Icona numero persone */}
                <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                    <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                        <Ionicons name="people-outline" style={stylesSummaryCulinaryBook.iconSummary} />
                    </View>
                    <Text style={stylesSummaryCulinaryBook.textSummary}>Number of people: {selectedPeople}</Text>
                </View>

                {/* Icona prezzo totale */}
                <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                    <FontAwesome name="money" style={stylesSummaryCulinaryBook.iconSummary} />
                </View>
                <Text style={stylesSummaryCulinaryBook.textSummary}>Total price: {selectedPeople} people x {culinaryExperience.price}€ = {selectedPeople*culinaryExperience.price}€</Text>
                </View>

            </View>

            <TouchableOpacity onPress={() => {isUpdate ? editBookingSpecialExperience() : confirmBookingSpecialExperience()}} style={[stylesSummaryCulinaryBook.buttonBookSpecialExperience, {zIndex: 3}]}>
                {   isUpdate ?
                        <Text style={stylesSummaryCulinaryBook.textBookSpecialExperience}>Update Special Experience Booking</Text>
                    : <Text style={stylesSummaryCulinaryBook.textBookSpecialExperience}>Confirm Special Experience Booking</Text>
                }
            </TouchableOpacity>

        </View>
    )
}