import React, { FC, useEffect, useState } from "react";
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
import { getTableReservationsByHour_Date_Deal_Restaurant } from "../dao/restaurantsDAO";

interface NumberCulinaryComponentProps {
    setSelectedPeople: (number: number) => void,
    selectedPeople: number | null,
    restaurant: any,
    setStep: (step: number) => void
}


export const NumberCulinaryComponent: FC<NumberCulinaryComponentProps> = ({setSelectedPeople,  selectedPeople, restaurant, setStep}) => {
    const [reservations, setReservationsRestaurant] = useState<any[] | null>();
    const numbers: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

    return(
        <ScrollView>
                <View key={"num-view"} style={stylesBookTable.containerNumbers}>
                  { numbers.map((num, index) => {
                    
                    return (
                        <TouchableOpacity 
                          key={`num-${num}-${index}-touch`}
                          
                          style={selectedPeople == num ? stylesBookTable.containerNumberSelected 
                            : stylesBookTable.containerNumber
                          }
                          onPress={
                            () => {
                                setSelectedPeople(num);
                                setStep(3);
                            }
                          }
                        >
                          <Text key={`num-${num}-${index}-text`}  style={selectedPeople == num ? stylesBookTable.hourTextSelected : stylesBookTable.hourText}>{num}</Text>
                        </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
    )

};