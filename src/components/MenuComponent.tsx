import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from "react-native";
//images
import imagesDishes from "../utils/imagesDishes";
//style
import { stylesMenuComponent } from "../styles/stylesMenuComponent";
// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ScrollView } from "react-native-gesture-handler";
import { getDishesByRestaurant } from "../dao/dishesDAO";

const filterHashMapByKey = (hashMap: { [key: string]: any[] }, title: string) => {
    return Object.keys(hashMap).reduce((acc: any, key) => {
      if (key === title) {
        acc[key] = hashMap[key]; // Aggiungi l'array corrispondente a quella chiave
      }
      return acc;
    }, {});
};

interface MenuComponentProps {
    restaurant: any,
    onClose: () => void,

}

const MenuComponent: FC<MenuComponentProps> = ({restaurant, onClose}) => {
    const [mapDishes, setMapDishes] = useState<{ [key: string]: any[] } | null>(null);
    const [categorySelected, setCategorySelected] = useState<string | null>(null);

    const [mapDishesFiltered, setMapDishesFiltered] = useState<any[] | null>(null);

    const getDishes = async () => {
        try{
            const d: any = await getDishesByRestaurant(restaurant.id);

            // Creazione dell'hashMap
            const hashMap = d.reduce((map: any, dish: any) => {
                const category = dish.name_category;

                if (!map[category]) {
                    // Se la categoria non esiste ancora, inizializza un array
                    map[category] = [];
                }

                // Aggiungi l'elemento all'array della categoria corrispondente
                map[category].push(dish);

                return map;
            }, {});

            setMapDishes(hashMap);

            const firstCategory = Object.keys(hashMap)[0];
            setCategorySelected(firstCategory);

            const dishesFiltered = filterHashMapByKey(hashMap, firstCategory);
            setMapDishesFiltered(dishesFiltered);

        }catch(error) {
            console.error("Error in getDishes: ", error);

            // Mostra il popup di errore
            Alert.alert(
                "Dishes Error",
                `An error occurred while retrieving the dishes for ${restaurant.name}. Please try again later.`,
                [{ text: "OK", onPress: () => onClose() }]
            );
        }
    }

    useEffect(() => {
        getDishes();
    }, []);

    return (
        <>  
            { mapDishes && categorySelected && mapDishesFiltered &&
                <View style={stylesMenuComponent.container}>
                    <View style={stylesMenuComponent.containerTitle}>
                        <TouchableOpacity onPress={onClose}>
                            <View style={{width: 30, height: 30}}>
                                <Ionicons name="chevron-back-sharp" size={30} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={stylesMenuComponent.textTitle}>{restaurant.name}</Text>
                        <View style={{width: 30, height: 30}}></View>
                    </View>
                    <View style={stylesMenuComponent.containerTextLabel}>
                        <Text style={stylesMenuComponent.textLabel}>Get a taste of this menu</Text>
                        <Text style={stylesMenuComponent.textAfterLabel}>Explore the culinary offerings of this restaurant and let yourself be inspired.</Text>
                    </View>

                    <View style={stylesMenuComponent.containerCategoryDish}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {Object.keys(mapDishes).map((key: any, index: number, array: any) => {
                                const isFirst = index == 0;
                                const isLast = index === array.length - 1;

                                return (
                                    <View 
                                        key={key} 
                                        style={ categorySelected == key ? 
                                                    isFirst ? stylesMenuComponent.containerCategoryTitleFirstSelected //se selezionato e primo
                                                    : isLast ? stylesMenuComponent.containerCategoryTitleLastSelected //se selezionato e ultimo
                                                    : stylesMenuComponent.containerCategoryTitleSelected //se selezionato ma non primo ne ultimo
                                                : isFirst ? stylesMenuComponent.containerCategoryTitleFirst
                                                : isLast ? stylesMenuComponent.containerCategoryTitleLast
                                                : stylesMenuComponent.containerCategoryTitle}
                                    >
                                        <TouchableOpacity 
                                            onPress={() => {
                                                setCategorySelected(key);
                                                setMapDishesFiltered(filterHashMapByKey(mapDishes, key))
                                            }}>
                                            <Text 
                                                style={ categorySelected == key ? stylesMenuComponent.categoryTitleSelected
                                                    : stylesMenuComponent.categoryTitle}
                                            >
                                                {key}
                                            </Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={stylesMenuComponent.containerDishes}>
                        <ScrollView>
                            {Object.keys(mapDishesFiltered).map((category: any) => {
                                
                                return (
                                    <View key={category}>
                                        {/* Scorrere sui piatti di ciascuna categoria */}
                                        {mapDishesFiltered[category].map((dish: any) => (
                                            <View key={dish.id} style={stylesMenuComponent.containerDish}>
                                                <Image 
                                                    source={imagesDishes[dish.dish_name]}
                                                    style={stylesMenuComponent.imageDish}
                                                />

                                                <View style={stylesMenuComponent.containerTitleDish}>
                                                    <Text style={stylesMenuComponent.textTitleDish}>{dish.dish_name}</Text>
                                                    <Text style={stylesMenuComponent.textPrice}>€ {dish.price}</Text>
                                                </View>
                                                
                                                <Text style={stylesMenuComponent.textDescription}>{dish.description}.</Text>

                                                <View style={stylesMenuComponent.containerAllergens}>
                                                    {dish.allergens.length > 0 && <Text style={stylesMenuComponent.allergenText}>Allergens: </Text>}
                                                    {dish.allergens.map((allergen: any, index: number) => {
                                                    const isLast = index === dish.allergens.length - 1; // Controlla se è l'ultimo elemento
                                                    return (
                                                        <Text key={`${dish.id}-${allergen.name}`} style={stylesMenuComponent.allergenNameText}>
                                                            {allergen.name}{!isLast && ','} {/* Aggiungi la virgola se non è l'ultimo */}
                                                        </Text>
                                                    );
                                                    })}
                                                </View>

                                            </View>
                                        ))}
                                    </View>
                                );
                            })}
                        </ScrollView>

                    </View>
                </View>
            }
        </>
    )
};

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Oscura lo sfondo
      justifyContent: "center",
      alignItems: "center",
      zIndex: 4,
    },
    modalImage: {
      width: "90%",
      height: "70%",
      zIndex: 5
    },
  })

export {MenuComponent}
