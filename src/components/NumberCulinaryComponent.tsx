import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";


// Stili
import { stylesBookTable } from '../styles/stylesBookTable';
//dao
import { ScrollView } from "react-native-gesture-handler";

interface NumberCulinaryComponentProps {
    setSelectedPeople: (number: number) => void,
    selectedPeople: number | null,
    restaurant: any,
    setStep: (step: number) => void
}


export const NumberCulinaryComponent: FC<NumberCulinaryComponentProps> = ({setSelectedPeople,  selectedPeople, restaurant, setStep}) => {
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