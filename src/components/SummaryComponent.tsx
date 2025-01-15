import React, { FC, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";

// Stili
import { stylesBookTable } from '../styles/stylesBookTable';

// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

//dao
import { getTableReservartionsByUsername, insertTableReservation } from "../dao/reservationsDAO";

interface SummaryComponentProps{
    user: any,
    restaurant: any,
    selectedDate: string,
    setSelectedDate: (date: string | null) => void,
    selectedHour: string,
    setSelectedHour: (hour: string | null) => void,
    selectedPeople: number,
    setSelectedPeople: (num: number | null) => void,
    onClose: () => void
}

export const SummaryComponent: FC<SummaryComponentProps> = ({user, restaurant, selectedDate, selectedHour, selectedPeople, setSelectedDate, setSelectedHour, setSelectedPeople, onClose }) => {
    const [text, setText] = useState('');

    const formatDate = (inputDate: string) => {
        const date = new Date(inputDate);
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric', // Anno completo (es. 2025)
          month: 'short',  // Mese abbreviato (es. Jan)
          day: 'numeric',  // Giorno numerico (es. 13)
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const confirmReservation = async () => {
        try{
            
            await insertTableReservation(user.username, restaurant.id, selectedDate, selectedHour, selectedPeople, text != '' ? text : null);

            // Popup di conferma
            Alert.alert(
                "Booking Confirmed",
                "Your booking has been successfully registered!",
                [{ text: "OK", onPress: () => onClose() }]
            );
        }catch(error){

            // Mostra il popup di errore
            Alert.alert(
                "Booking Error",
                "An error occurred while registering your booking. Please try again.",
                [{ text: "OK", onPress: () => onClose() }]
            );

            console.error("Error in confirmReservation: ", error);
        }finally{
            setSelectedDate(null);
            setSelectedHour(null);
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

                    <Text style={stylesBookTable.textSummarySpecialRequest}>Informations</Text>
                    
                    <View style={stylesBookTable.containerInformations}>

                        {/* Icona della data */}
                        <View style={stylesBookTable.containerIconWrapper}>
                        <View style={stylesBookTable.iconSummaryWrapper}>
                            <Ionicons name="calendar-outline" style={stylesBookTable.iconSummary} />
                        </View>
                        <Text style={stylesBookTable.textSummary}>{formatDate(selectedDate)}</Text>
                        </View>

                        {/* Icona dell'ora */}
                        <View style={stylesBookTable.containerIconWrapper}>
                        <View style={stylesBookTable.iconSummaryWrapper}>
                            <AntDesign name="clockcircleo" style={stylesBookTable.iconSummary} />
                        </View>
                        <Text style={stylesBookTable.textSummary}>{selectedHour}</Text>
                        </View>

                        {/* Icona numero persone */}
                        <View style={stylesBookTable.containerIconWrapper}>
                        <View style={stylesBookTable.iconSummaryWrapper}>
                            <Ionicons name="people-outline" style={stylesBookTable.iconSummary} />
                        </View>
                        <Text style={stylesBookTable.textSummary}>{selectedPeople}</Text>
                        </View>

                    </View>
                    
                    {/* Special request */}
                    <View style={stylesBookTable.containerSpecialRequest}>

                        <Text style={stylesBookTable.textSummarySpecialRequest}>Special Request</Text>
                        
                        <TextInput
                        style={[stylesBookTable.inputText, {textAlignVertical: 'top'}]}
                        placeholder="Write your special request here..."
                        value={text}
                        multiline={true}
                        onChangeText={(value) => setText(value)}
                        />
                        
                    </View>

                    
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <TouchableOpacity onPress={() => {confirmReservation()}} style={[stylesBookTable.buttonBookTable, {zIndex: 3}]}>
                <Text style={stylesBookTable.textBookTable}>Confirm booking</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}