import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CalendarComponent } from "./CalendarComponent";

// Stili
import { stylesBookCulinaryExperience } from "../styles/stylesBookCulinaryExperience";

// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


//dao
import { HoursComponent } from "./HoursComponent";
import { NumberComponent } from "./NumberComponent";
import { SummaryComponent } from "./SummaryComponent";
import { NumberCulinaryComponent } from "./NumberCulinaryComponent";
import { SummaryCulinaryComponent } from "./SummaryCulinaryComponent";
import { CalendarCulinaryComponent } from "./CalendarCulinaryComponent";


interface BookCulinaryExperienceProps {
    date: undefined | string, 
    people: undefined | number,
    onClose: () => void,
    closingDays: any[],
    restaurant: any,
    user: any,
    culinaryExperience: any,
    onCloseRestaurant: () => void

}

export const BookCulinaryExperience: FC<BookCulinaryExperienceProps> = ({date, people, onClose, closingDays, user, culinaryExperience, restaurant, onCloseRestaurant}) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(date == undefined ? null : date); // Stato per il giorno selezionato
    const [selectedPeople, setSelectedPeople] = useState<number | null>(people == undefined ? null : people); // Stato per il numero di persone selezionate

    //step della prenotazione
    const [step, setStep] = useState<number>(1);

    const previousStep = async () => {
        if(step > 1) {
          setStep((precedence) => precedence - 1 )
        }
      }

    return(
        <>
            <View style={stylesBookCulinaryExperience.container}>
                <View style={stylesBookCulinaryExperience.containerTitle}>
                    <TouchableOpacity onPress={step > 1 ? previousStep : undefined}>
                        <View style={{width: 30, height: 30}}>
                        {step > 1 && <Ionicons name="chevron-back-sharp" size={30} color="black" />}
                        </View>
                    </TouchableOpacity>
                    <Text style={stylesBookCulinaryExperience.textSpecialExperience}>Special Experience</Text>
                    <TouchableOpacity onPress={onClose} style={stylesBookCulinaryExperience.containerTextSpecialExperience}>
                        <AntDesign name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={stylesBookCulinaryExperience.containerTextLabel}>
                {
                    step == 1 ?
                        <Text style={stylesBookCulinaryExperience.textLabel}>Select an available date</Text>
                    : step == 2 ?
                        <Text style={stylesBookCulinaryExperience.textLabel}>Enter the number of guests</Text>
                    : <Text style={stylesBookCulinaryExperience.textLabelSummary}>Booking Special Experience Summary</Text>
                }
                </View>

                {/* Barra di completamento */}
                <View style={stylesBookCulinaryExperience.containerIcons}>
                    <FontAwesome6 name="calendar-days" style={stylesBookCulinaryExperience.iconCalendar}/>
                    {
                        step > 1
                        ? <Ionicons name="people-sharp" style={stylesBookCulinaryExperience.iconPeopleEnabled}/>
                        : <Ionicons name="people-outline" style={stylesBookCulinaryExperience.iconPeopleDisabled}/>
                    }
                    {
                        step > 2 
                        ? <Ionicons name="checkmark-done-circle-sharp" style={stylesBookCulinaryExperience.iconCheckmarkEnabled}/>
                        : <Ionicons name="checkmark-done-circle-outline" style={stylesBookCulinaryExperience.iconCheckmarkDisabled}/>
                    }
                
                </View>

                {/* Calendario (solo quando step == 1) */}
                {
                    step == 1 && (
                        <CalendarCulinaryComponent setSelectedDate={setSelectedDate} selectedDate={selectedDate} setStep={setStep} closingDays={closingDays}/>
                    )
                }

                {/* Seleziona il numero di persone (solo quando step == 2) */}
                {
                    step == 2 && selectedDate  && (
                        <NumberCulinaryComponent restaurant={restaurant} setSelectedPeople={setSelectedPeople} setStep={setStep} selectedPeople={selectedPeople}/>
                    )
                }

                {/* Riepilogo prenotazione */}
                {
                step == 3 && selectedDate && selectedPeople && 
                <SummaryCulinaryComponent 
                    user={user} 
                    selectedDate={selectedDate} 
                    selectedPeople={selectedPeople} 
                    restaurant={restaurant}
                    setSelectedDate={setSelectedDate}
                    setSelectedPeople={setSelectedPeople}

                    onClose={onCloseRestaurant}
                />
                }
            </View>
        </>
    )
}