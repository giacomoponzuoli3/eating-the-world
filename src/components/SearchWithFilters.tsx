import {  SearchBar } from 'react-native-elements';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import Filters from './Filters';

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;

interface SearchWithFilterProps{
    setShowRestaurantNotFound: Dispatch<SetStateAction<boolean>>;
}

const SearchWithFilter: FC<SearchWithFilterProps> = ({setShowRestaurantNotFound}) => {
    const [search, setSearch] = useState<string>("");
    const [showFilters, setShowFilters] = useState<boolean>(false);

    // Funzione per aggiornare lo stato
    const updateSearch = (text: string) => {
        setSearch(text);
    };
  
    return (
        <View style={styles.searchbarContainer}>
            {/* SearchBar */}
            <SafeSearchBar
                placeholder={"Search here"}
                platform="ios"
                value={search}
                searchIcon={<FontAwesome5 name={"search-location"} size={25} color={"black"} />}
                onChangeText={updateSearch}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                clearIcon={false}
                onCancel={() => setShowRestaurantNotFound(true)}
            />
            {/* Filters Button */}
            <View style={styles.filtersButtonContainer}>
                <TouchableOpacity onPress={() => setShowFilters(prev => !prev)}>
                    <Ionicons name="options" size={35} color="black" />
                </TouchableOpacity>
            </View> 
            {showFilters && (
                <Filters />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchbarContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        flexDirection: "row",
        position: "absolute",
        top: 20,
        left: 30,
        width: "80%",
    },
    containerStyle: {
        backgroundColor: "transparent", 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    inputContainerStyle: {
        backgroundColor: "white",
        borderRadius: 25,
    },
    rightContainerStyle: {
        backgroundColor: "white"
    },
    inputStyle: {
        color: "black", 
    },
    filtersButtonContainer:{
        backgroundColor: "white",
        borderRadius: 25,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default SearchWithFilter;
