import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
//images
import imagesDishes from "../utils/imagesDishes";
//style
import { stylesMenuComponent } from "../styles/stylesMenuComponent";
// Icone
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';



const MenuComponent = (props:any) => {

    return (
        <>  
            <View style={stylesMenuComponent.container}>
                <View style={stylesMenuComponent.containerTitle}>
                    <TouchableOpacity onPress={props.onClose}>
                        <View style={{width: 30, height: 30}}>
                            <Ionicons name="chevron-back-sharp" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                    <Text style={stylesMenuComponent.textTitle}>{props.restaurant.name}</Text>
                    <View style={{width: 30, height: 30}}></View>
                </View>
                <View style={stylesMenuComponent.containerTextLabel}>
                    <Text style={stylesMenuComponent.textLabel}>Get a taste of this menu</Text>
                    <Text style={stylesMenuComponent.textAfterLabel}>Explore the culinary offerings of this restaurant and let yourself be inspired.</Text>
                </View>
            </View>
        </>
    )
};


export {MenuComponent}
