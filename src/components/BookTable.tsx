import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";


// Stili
import { stylesBookTable } from '../styles/stylesBookTable';

// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CalendarComponent } from "./CalendarComponent";

//dao
import { getHoursByRestaurant } from "../dao/restaurantsDAO";
import { ScrollView } from "react-native-gesture-handler";
import { HoursComponent } from "./HoursComponent";
import { NumberComponent } from "./NumberComponent";

const BookTable = (props: any) => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  //orari di apertura del ristorante associato al pasto
  const [openingHours, setOpeningHours] = useState<any[] | null>(null);
  
  //dati form
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Stato per il giorno selezionato
  const [selectedHour, setSelectedHour] = useState<string | null>(null); // Stato per l'ora selezionata
  const [dealSelected, setDealSelected] = useState<any | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<number | null>(null); // Stato per il numero di persone selezionate



  //step della prenotazione
  const [step, setStep] = useState<number>(1);

  const getOpeningHours = async () => {
    try{
      const oh = await getHoursByRestaurant(props.restaurant.id);
      setOpeningHours(oh);

    }catch(error){
      console.log("Error in getOpeningHours: ", error);
      setOpeningHours([]);
    }
  }

  //recupero orari e pasti
  useEffect(() => {
    getOpeningHours();
  }, [])


  const nextStep = async () => {
    if(step < 4) { //molto probabilmente c'è anche il quinto step che è la visualizzazione del riepilogo
      setStep((precedence) => precedence + 1 )
    }
  }

  const previousStep = async () => {
    if(step > 1) {
      setStep((precedence) => precedence - 1 )
    }
  }

  const generateTimeSlots = (start: any, end: any) => {
    const timeSlots = [];
    
    // Converte le stringhe di orario in oggetti Date
    let currentTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    
    // Itera aggiungendo 30 minuti ogni volta fino a raggiungere l'ora di fine
    while (currentTime <= endTime) {
      // Formatta l'orario in HH:mm e lo aggiunge all'array
      const formattedTime = currentTime.toTimeString().slice(0, 5);
      timeSlots.push(formattedTime);
      
      // Aggiunge 30 minuti
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
    
    return timeSlots;
  };

  return (
    <>
      <View style={stylesBookTable.container}>
        <View style={stylesBookTable.conainerTitle}>
          <TouchableOpacity onPress={step > 1 ? previousStep : undefined}>
            <View style={{width: 30, height: 30}}>
              {step > 1 && <Ionicons name="chevron-back-sharp" size={30} color="black" />}
            </View>
          </TouchableOpacity>
          <Text style={stylesBookTable.textTitle}>{props.restaurant.name}</Text>
          <TouchableOpacity onPress={props.onClose} style={stylesBookTable.containerTextTitle}>
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={stylesBookTable.containerTextLabel}>
          {
            step == 1 ?
              <Text style={stylesBookTable.textLabel}>Select an available date</Text>
            : step == 2 ?
              <Text style={stylesBookTable.textLabel}>Choose an available time</Text>
            : step == 3 ?
              <Text style={stylesBookTable.textLabel}>Enter the number of guests</Text>
            : <Text style={stylesBookTable.textLabel}>Booking Summary</Text>
          }


        </View>

        {/* Barra di completamento */}
        <View style={stylesBookTable.containerIcons}>
          <FontAwesome6 name="calendar-days" style={stylesBookTable.iconCalendar}/>
          {step > 1 
            ? <AntDesign name="clockcircle" style={stylesBookTable.iconClockEnabled}/> 
            : <AntDesign name="clockcircleo" style={stylesBookTable.iconClockDisabled}/>
          }
          {
            step > 2
            ? <Ionicons name="people-sharp" style={stylesBookTable.iconPeopleEnabled}/>
            : <Ionicons name="people-outline" style={stylesBookTable.iconPeopleDisabled}/>
          }
          {
            step > 3 
            ? <Ionicons name="checkmark-done-circle-sharp" style={stylesBookTable.iconCheckmarkEnabled}/>
            : <Ionicons name="checkmark-done-circle-outline" style={stylesBookTable.iconCheckmarkDisabled}/>
          }
          
        </View>

        {/* Calendario (solo quando step == 1) */}
        {step == 1 &&
            (
              <CalendarComponent setSelectedDate={setSelectedDate} selectedDate={selectedDate} setStep={setStep} closingDays={props.closingDays}/>
            )
        }
        
        {/* Seleziona l'orario (solo quando step == 2) */}
        {step == 2 && selectedDate && openingHours &&
            (
              <HoursComponent restaurant={props.restaurant} openingHours={openingHours} setSelectedHour={setSelectedHour} selectedHour={selectedHour} setStep={setStep} selectedDate={selectedDate} setDealSelected={setDealSelected}/>

            )
        }
        {/* Seleziona il numero di persone (solo quando step == 3) */}
        {
          step == 3 && openingHours && selectedDate && dealSelected &&
          (
            <NumberComponent dealSelected={dealSelected} restaurant={props.restaurant} setSelectedPeople={setSelectedPeople} setStep={setStep} selectedPeople={selectedPeople}/>
          )
        }
        {/* Riepilogo prenotazione */}
        {
          step == 4 && selectedDate && selectedHour && selectedPeople && <Text>Riepilogo</Text>
        }
      </View>
    </>
  );
};

export { BookTable };
