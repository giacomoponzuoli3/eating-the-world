import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Stili
import { stylesBookTable } from '../styles/stylesBookTable';


interface HoursComponentProps {
    openingHours: any[] | null,
    selectedHour: string | null,
    setSelectedHour: (hour: string) => void,
    setStep: (step: number) => void
}

export const HoursComponent: FC<HoursComponentProps> = ({openingHours, selectedHour, setSelectedHour, setStep}) => {
    
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
                {openingHours && openingHours.map((row: any) => {
                  const timeSlots = generateTimeSlots(row.hour_start_deal, row.hour_end_deal);

                  return (
                    <>
                      <View style={stylesBookTable.containerHours}>
                        <Text key={`${row.id_deal}-${row.id_restaurant}`} style={stylesBookTable.textDeal}>{row.name}</Text>
                        <View style={stylesBookTable.containerDealHours}>
                          {
                            timeSlots.map((hour: any) => {
                              return (
                                <>
                                  <TouchableOpacity 
                                    style={ selectedHour == hour ? stylesBookTable.containerHourTextSelected : stylesBookTable.containerHourText} 
                                    onPress={() => {
                                      setSelectedHour(hour);
                                      setStep(3);
                                    }}
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