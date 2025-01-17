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

interface NumberComponentProps {
    setSelectedPeople: (number: number) => void,
    selectedPeople: number | null,
    restaurant: any,
    dealSelected: any,
    setStep: (step: number) => void
}


export const NumberComponent: FC<NumberComponentProps> = ({setSelectedPeople,  selectedPeople, restaurant, dealSelected,  setStep}) => {
    const [reservations, setReservationsRestaurant] = useState<any[] | null>();
    const numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

    return(
        <ScrollView>
                <View key={"num-view"} style={stylesBookTable.containerNumbers}>
                  { numbers.map((num, index) => {
                    
                    const isDisable = num + dealSelected.num_people > restaurant.capacity;
                    
                    //const isDisable = num + reservations[0].num_people

                    return (
                        <TouchableOpacity 
                          key={`num-${num}-${index}-touch`}
                          
                          style={selectedPeople == num ? stylesBookTable.containerNumberSelected 
                            : (!isDisable ? stylesBookTable.containerNumber : stylesBookTable.containerNumberDisabled)
                          }
                          onPress={ isDisable ? undefined 
                              : () => {
                                setSelectedPeople(num);
                                setStep(4);
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