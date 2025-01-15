import React, { FC, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";

// Stili
import { stylesSummaryCulinaryBook } from "../styles/stylesSummaryCulinaryBook";
// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//dao
import {insertCulinaryExperienzeReservation } from "../dao/reservationsDAO";

interface SummaryCulinaryComponentProps{
    user: any,
    restaurant: any,
    selectedDate: string,
    setSelectedDate: (date: string | null) => void,
    selectedPeople: number,
    setSelectedPeople: (num: number | null) => void,
    onClose: () => void
}

export const SummaryCulinaryComponent: FC<SummaryCulinaryComponentProps> = ({user, restaurant, selectedDate,  selectedPeople, setSelectedDate, setSelectedPeople, onClose }) => {

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
            
            //await insertTableReservation(user.username, restaurant.id, selectedDate, selectedHour, selectedPeople, text != '' ? text : null);

            // Popup di conferma
            Alert.alert(
                "Booking Special Experience Confirmed",
                "Your booking has been successfully registered!",
                [{ text: "OK", onPress: () => onClose() }]
            );
        }catch(error){

            // Mostra il popup di errore
            Alert.alert(
                "Booking Special Experience Error",
                "An error occurred while registering your booking. Please try again.",
                [{ text: "OK", onPress: () => onClose() }]
            );

            console.error("Error in confirmReservation: ", error);
        }finally{
            setSelectedDate(null);
            setSelectedPeople(null);
        }
    }

    return (
        <ScrollView style={{flexGrow: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <Text style={stylesSummaryCulinaryBook.textSummarySpecialRequest}>Informations</Text>
                    
                    <View style={stylesSummaryCulinaryBook.containerInformations}>

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
                            <AntDesign name="clockcircleo" style={stylesSummaryCulinaryBook.iconSummary} />
                        </View>
                        <Text style={stylesSummaryCulinaryBook.textSummary}></Text>
                        </View>

                        {/* Icona numero persone */}
                        <View style={stylesSummaryCulinaryBook.containerIconWrapper}>
                        <View style={stylesSummaryCulinaryBook.iconSummaryWrapper}>
                            <Ionicons name="people-outline" style={stylesSummaryCulinaryBook.iconSummary} />
                        </View>
                        <Text style={stylesSummaryCulinaryBook.textSummary}>{selectedPeople}</Text>
                        </View>

                    </View>
                    
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <TouchableOpacity onPress={() => {confirmBookingSpecialExperience()}} style={[stylesSummaryCulinaryBook.buttonBookSpecialExperience, {zIndex: 3}]}>
                <Text style={stylesSummaryCulinaryBook.textBookSpecialExperience}>Confirm booking</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}