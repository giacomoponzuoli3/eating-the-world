import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// Stili
import { stylesBookTable } from '../styles/stylesBookTable';

interface NumberComponentProps {
    setSelectedPeople: (number: number) => void,
    selectedPeople: number | null,
    restaurant: any,
    dealSelected: any,
    setStep: (step: number) => void
}


export const NumberComponent: FC<NumberComponentProps> = ({setSelectedPeople,  selectedPeople, restaurant, dealSelected,  setStep}) => {
    const numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

    return(
      <ScrollView>
        <View key={"num-view"} style={stylesBookTable.containerNumbers}>
          { numbers.map((num, index) => {
            
            const isDisable = num + dealSelected.num_people > restaurant.capacity;

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