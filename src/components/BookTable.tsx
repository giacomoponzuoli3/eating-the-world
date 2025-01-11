import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';

// Stili
import { stylesBookTable } from '../styles/stylesBookTable';

// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BookTable = (props: any) => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Stato per il giorno selezionato


  
  //componente del giorno
  const renderDay = ({ date, onPress }: any) => {
    const isSunday = new Date(date.dateString).getDay() === 0;
    const isBeforeToday = date.dateString < todayFormatted;

    return (
        <View style={[stylesBookTable.dayContainer, isSunday || isBeforeToday ? stylesBookTable.disabledDay : null]}>
            <TouchableOpacity
                onPress={!(isSunday || isBeforeToday) ? () => onPress(date) : undefined}
                style={[selectedDate == date.dateString ? stylesBookTable.daySelectedButton : stylesBookTable.dayButton, isSunday || isBeforeToday ? stylesBookTable.disabledDayButton : null]}
            >
                <Text style={selectedDate == date.dateString ? stylesBookTable.daySelectedText : stylesBookTable.dayText}>{date.day}</Text>
            </TouchableOpacity>
        </View>
    );
  };

  return (
    <>
      <View style={stylesBookTable.container}>
        <View style={stylesBookTable.conainerTitle}>
          <TouchableOpacity onPress={props.onClose}>
            <Ionicons name="chevron-back-sharp" size={30} color="black" />
          </TouchableOpacity>
          <Text style={stylesBookTable.textTitle}>{props.restaurant.name}</Text>
          <TouchableOpacity onPress={() => {}} style={stylesBookTable.containerTextTitle}>
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={stylesBookTable.containerTextLabel}>
          <Text style={stylesBookTable.textLabel}>Select an available date</Text>
        </View>

        {/* Calendario */}
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
      </View>
    </>
  );
};

export { BookTable };
