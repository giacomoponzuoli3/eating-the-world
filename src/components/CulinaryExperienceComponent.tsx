import React, { FC, useEffect, useState } from "react";
import { ActionSheetIOS, Alert, ImageBackground, Linking, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//styles
import { stylesCulinaryExperience } from "../styles/stylesCulinaryExperience";
//dao
import { getCulinaryExperiencesByRestaurant } from "../dao/culinaryExperienceDAO";
//images
import imagesCulinaryExperiences from "../utils/imagesCulinaryExperiences";
// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


interface CulinaryExperienceComponentProps {
    restaurant: any,
    onClose: () => void
}

export const CulinaryExperienceComponent: FC<CulinaryExperienceComponentProps> = ({restaurant, onClose}) => {
    const [culinaryExperience, setCulinaryExperience] = useState<any | null>(null);
    
    const handleOpenMaps = (address: string) => {
        const encodedAddress = encodeURIComponent(address);
      
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Apple Maps', 'Google Maps', 'Cancel'],
            cancelButtonIndex: 2,
          },
          (buttonIndex) => {
            if (buttonIndex === 0) {
              // Apple Maps
              Linking.openURL(`maps://?q=${encodedAddress}`);
            } else if (buttonIndex === 1) {
              // Google Maps
              Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
            }
          }
        );
    };

    function calculateDuration(startHour: string, endHour: string): string {
        const [startHours, startMinutes] = startHour.split(":").map(Number);
        const [endHours, endMinutes] = endHour.split(":").map(Number);
      
        // Converte gli orari in minuti
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
      
        // Calcola la durata in minuti
        const durationMinutes = endTotalMinutes - startTotalMinutes;
      
        // Converte la durata in ore e minuti
        const hours = Math.floor(durationMinutes / 60);
      
        return hours > 1 ? `${hours} hours` : `${hours} hour`;
    }
      

    const getCulinaryExperience = async () => {
        try{
            if(restaurant.culinary_experience == 1){
                const ce = await getCulinaryExperiencesByRestaurant(restaurant.id);
                console.log(ce);
                setCulinaryExperience(ce[0]);
            }else{
                throw new Error("Culinary experience is not available for this restaurant.");
            }
        }catch(error){
            console.error("Error in getCulinaryExperience: ", error);
            // Mostra il popup di errore
            Alert.alert(
                "Culinary Experience Error",
                "An error occurred while trying to fetch the culinary experience. Please try again later.",
                [{ text: "OK", onPress: () => onClose() }]
            );
        }
    }

    useEffect(() => {
        getCulinaryExperience();
    }, [])

    return (
        <>
        {restaurant && culinaryExperience &&
            <View style={stylesCulinaryExperience.container}>
                <ScrollView>
                    <View>
                        <ImageBackground 
                            source={imagesCulinaryExperiences[restaurant.name]} 
                            style={stylesCulinaryExperience.imageBackground}
                        > 
                            <View style={stylesCulinaryExperience.imagesStyle}>
                                <TouchableOpacity onPress={() => onClose()} style={stylesCulinaryExperience.iconWrapper}>
                                    <Ionicons name="chevron-back-sharp" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={stylesCulinaryExperience.containerText}>
                        <Text style={stylesCulinaryExperience.textCulinaryExperience}>Special Experience </Text>
                        
                        <View style={stylesCulinaryExperience.containerTitleRestaurant}>
                            <Text style={stylesCulinaryExperience.textOfferedBy}>Offered by </Text>
                            <Text style={stylesCulinaryExperience.textTitleRestaurant}>{restaurant.name}</Text>
                        </View> 

                        

                        <View style={stylesCulinaryExperience.containerDescription}>
                            <Text style={stylesCulinaryExperience.titleDescription}>Description</Text>

                            <Text style={stylesCulinaryExperience.description}>{culinaryExperience.description}</Text>

                            <Text style={stylesCulinaryExperience.titleInformations}>Informations</Text>

                            {/* Icona dell'indirizzo */}
                            <TouchableOpacity onPress={() => {handleOpenMaps(restaurant.address)}}>         
                                <View style={stylesCulinaryExperience.containerIconInformation}>
                    
                                    <View style={stylesCulinaryExperience.iconInformationWrapper}>
                                        <Ionicons name="location-outline" style={stylesCulinaryExperience.iconInformation} />
                                    </View>

                                    <Text style={stylesCulinaryExperience.textInformation}>{restaurant.address}</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Icona della durata */}
                            <TouchableOpacity onPress={() => {}}>         
                                <View style={stylesCulinaryExperience.containerIconInformation}>
                    
                                    <View style={stylesCulinaryExperience.iconInformationWrapper}>
                                        <Ionicons name="timer-outline" style={stylesCulinaryExperience.iconInformation} />
                                    </View>

                                    <Text style={stylesCulinaryExperience.textInformation}>{culinaryExperience.start_hour}-{culinaryExperience.end_hour} ({calculateDuration(culinaryExperience.start_hour, culinaryExperience.end_hour)})</Text>
                                </View>
                                
                            </TouchableOpacity>

                            {/* Icona del prezzo */}
                            <TouchableOpacity onPress={() => {}}>         
                                <View style={stylesCulinaryExperience.containerIconInformation}>
                    
                                    <View style={stylesCulinaryExperience.iconInformationWrapper}>
                                        <FontAwesome name="money" style={stylesCulinaryExperience.iconInformation} />
                                    </View>

                                    <Text style={stylesCulinaryExperience.textInformation}>{culinaryExperience.price}€ per person</Text>
                                </View>
                                
                            </TouchableOpacity>

                            <Text style={stylesCulinaryExperience.titleInformations}>Key Delights</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        }
        </>
    )
};  