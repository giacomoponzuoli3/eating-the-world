import React, { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

//style 
import { stylesCalendarCulinary } from "../styles/stylesCalendarCulinary";

interface CalendarCulinaryComponentProps{
    selectedDate: string | null,
    setSelectedDate: (data: string) => void,
    setStep: (step: number) => void,
    closingDays: any[] | null
}

export const CalendarCulinaryComponent: FC<CalendarCulinaryComponentProps>  = ({setSelectedDate, selectedDate, setStep, closingDays}) => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    const [reservations, setReservations] = useState<any[] | null>(null);

    const getBookSpecialExperiences = async () => {
        try{

        }catch(error){
            console.error("Error in getBookSpecialExperiences: ", error);
        }
    }

    // Mappatura dei numeri dei giorni con i nomi
    const dayNamesMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Funzione che controlla se la data è un giorno di chiusura
    const isDayClosed = (date: any) => {
        // Ottieni il numero del giorno della settimana dalla data (0 è domenica, 6 è sabato)
        const dayIndex = new Date(date.dateString).getDay();

        // Ottieni il nome del giorno dalla mappatura
        const dayName = dayNamesMap[dayIndex];

        // Verifica se il nome del giorno è presente nell'array di giorni di chiusura
        return closingDays && closingDays.some(day => day.day_name === dayName);
    };

    //componente del giorno
    const renderDay = ({ date, onPress }: any) => {
        const isClose = isDayClosed(date);
        const isBeforeToday = date.dateString <= todayFormatted;
        
        return (
            <View style={[stylesCalendarCulinary.dayContainer, isClose || isBeforeToday ? stylesCalendarCulinary.disabledDay : null]}>
                <TouchableOpacity
                    onPress={!(isClose || isBeforeToday) ? () => onPress(date) : undefined}
                    style={[selectedDate == date.dateString ? stylesCalendarCulinary.daySelectedButton : stylesCalendarCulinary.dayButton, isClose || isBeforeToday ? stylesCalendarCulinary.disabledDayButton : null]}
                >
                    <Text style={selectedDate == date.dateString ? stylesCalendarCulinary.daySelectedText : stylesCalendarCulinary.dayText}>{date.day}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={stylesCalendarCulinary.containerCalendar}>
            <Calendar
                style={stylesCalendarCulinary.calendar}
                current={todayFormatted} // Imposta il mese corrente
                minDate={todayFormatted} // Disabilita le date precedenti
                dayComponent={renderDay} // Personalizza il rendering dei giorni
                showSixWeeks={false} // Mostra solo il mese corrente
                hideExtraDays={true} // Nasconde i giorni del mese precedente e successivo
                theme={{
                    textDayHeaderFontFamily: 'Poppins-Medium',
                    textDayFontSize: 18,
                    textMonthFontFamily: 'Poppins-Bold',

                    arrowColor: '#6200ee', // Colore delle frecce
                }}
                // Selezione giorno
                onDayPress={(day) => {
                    setSelectedDate(day.dateString); // Imposta la data selezionata
                    setStep(2);
                }}
                markedDates={{
                [selectedDate || '']: {
                    selected: true,
                    marked: true,
                    selectedColor: 'blue', // Colore di sfondo per il giorno selezionato
                    selectedTextColor: 'white', // Colore del testo per il giorno selezionato
                    dotColor: 'red', // Se vuoi mettere un punto sul giorno selezionato
                    activeOpacity: 0.8, // Opacità per l'interazione
                },
                }}
            />
        </View>
    );

}