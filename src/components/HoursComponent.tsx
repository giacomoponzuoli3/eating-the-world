import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Stili
import { stylesBookTable } from '../styles/stylesBookTable';
import { getTableReservationsByHour_Date_Deal_Restaurant } from "../dao/restaurantsDAO";


interface HoursComponentProps {
    restaurant: any, 
    openingHours: any[],
    selectedHour: string | null,
    selectedDate: string,
    setSelectedHour: (hour: string) => void,
    setStep: (step: number) => void,
}

export const HoursComponent: FC<HoursComponentProps> = ({restaurant, openingHours, selectedHour, setSelectedHour, setStep, selectedDate}) => {
    //prenotazione per ogni pasto
    const [reservationsRestaurant, setReservationsRestaurant] = useState<any[] | null>(null);

    const getReservations = async () => {
        try {
          const reservations = await Promise.all(
            openingHours.map(async (row: any) => {
              const res = await getTableReservationsByHour_Date_Deal_Restaurant(
                restaurant.id,
                row.name,
                row.hour_start_deal,
                row.hour_end_deal,
                selectedDate
              );
      
              return {
                ...row,
                num_people: res.num_people == undefined ? 0 : res.num_people
              };
            })
          );
      
          console.log(reservations);

          setReservationsRestaurant(reservations); // Suppongo tu voglia salvare il risultato qui
        } catch (error) {
          console.error("Error in getReservations: ", error);

            setReservationsRestaurant(
                openingHours.map((row: any) => {
                    return {
                        ...row,
                        num_people: 0
                    };
                })
            );
        }
    };
    
    useEffect(() => {
        getReservations();
    }, [])

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
            <ScrollView>
                {reservationsRestaurant && reservationsRestaurant.map((row: any, index: number) => {

                  const timeSlots = generateTimeSlots(row.hour_start_deal, row.hour_end_deal);
                  const isFull = row.num_people == restaurant.capacity;

                  return (
                    <>
                      <View style={stylesBookTable.containerHours}>
                        <Text key={`${row.id_deal}-${row.id_restaurant}-text-${index}`} style={stylesBookTable.textDeal}>{row.name}</Text>
                        <View key={`${row.id_deal}-${row.id_restaurant}-view-${index}`} style={stylesBookTable.containerDealHours}>
                          {
                            timeSlots.map((hour: any, index: number) => {
                              return (
                                <>
                                  <TouchableOpacity 
                                    key={`${row.id_deal}-${row.id_restaurant}-${hour}`}
                                    style={ selectedHour == hour ? stylesBookTable.containerHourTextSelected 
                                        : (isFull 
                                            ? stylesBookTable.containerHourTextDisabled 
                                            : stylesBookTable.containerHourText
                                            )
                                        } 
                                    onPress={ isFull ? undefined 
                                        : () => { 
                                                setSelectedHour(hour);
                                                setStep(3);
                                            }
                                    }
                                  >
                                    <Text key={`${row.id_deal}-${row.id_restaurant}-${hour}`} style={selectedHour == hour ? stylesBookTable.hourTextSelected : stylesBookTable.hourText}>{hour}</Text>
                                  </TouchableOpacity>
                                </>
                              );
                            })
                          }
                          
                        </View>
                      </View>
                    </>
                    )
                })}
              </ScrollView>
        </>
    )
}