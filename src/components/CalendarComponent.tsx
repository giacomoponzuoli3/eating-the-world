import React, { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

//style 
import { stylesBookTable } from "../styles/stylesBookTable";

interface CalendarComponent{
    selectedDate: string | null,
    setSelectedDate: (data: string) => void,
    setStep: (step: number) => void,
    closingDays: any[] | null
}

export const CalendarComponent: FC<CalendarComponent>  = ({setSelectedDate, selectedDate, setStep, closingDays}) => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

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
        const isBeforeToday = date.dateString < todayFormatted;

        return (
            <View style={[stylesBookTable.dayContainer, isClose || isBeforeToday ? stylesBookTable.disabledDay : null]}>
                <TouchableOpacity
                    onPress={!(isClose || isBeforeToday) ? () => onPress(date) : undefined}
                    style={[selectedDate == date.dateString ? stylesBookTable.daySelectedButton : stylesBookTable.dayButton, isClose || isBeforeToday ? stylesBookTable.disabledDayButton : null]}
                >
                    <Text style={selectedDate == date.dateString ? stylesBookTable.daySelectedText : stylesBookTable.dayText}>{date.day}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={stylesBookTable.containerCalendar}>
            <Calendar
                style={stylesBookTable.calendar}
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