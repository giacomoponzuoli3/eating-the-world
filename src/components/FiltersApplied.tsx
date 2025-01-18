import { Dispatch, FC, SetStateAction } from "react";
import { FiltersOptions } from "../utils/interfaces";
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

interface FilterAppliedProps {
  filters: FiltersOptions;
  setFilters: Dispatch<SetStateAction<FiltersOptions | undefined>>;
}

const FilterApplied: FC<FilterAppliedProps> = ({ filters, setFilters }) => {
  const appliedFilters = [
    {
      key: "typeOfMeal",
      label: filters.typeOfMeal,
      displayName: filters.typeOfMeal,
      image: require("../../assets/fork_knife.png"),
    },
    {
      key: "foodRestrictions",
      label: filters.foodRestrictions,
      displayName: filters.foodRestrictions,
      image: require("../../assets/restrictions.png"),
    },
    {
      key: "priceRange",
      label: filters.priceRange,
      displayName: filters.priceRange,
      image: require("../../assets/priceRange.png"),
    },
    {
      key: "distance",
      label: filters.distance,
      displayName: filters.distance,
      image: require("../../assets/distance.png"),
    },
    {
      key: "specialExperience",
      label: filters.specialExperience,
      displayName: "Special Experience",
      image: require("../../assets/special_experience.png"),
    },
    {
      key: "openNow",
      label: filters.openNow,
      displayName: "Open Now",
      image: require("../../assets/open_now.png"),
    },
  ].filter((filter) => filter.label); 

  const handleRemoveFilter = (key: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [key]: undefined, // Rimuove il filtro specifico.
      };
  
      // Controlla se tutti i valori di updatedFilters sono undefined o false.
      const isFiltersEmpty = Object.values(updatedFilters).every(
        (value) => value === undefined || value === false
      );
  
      // Se tutti i valori sono undefined/false, resettare lo stato.
      return isFiltersEmpty ? undefined : updatedFilters;
    });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {appliedFilters.map((filter, index) => (
          <View key={index} style={styles.filterBox}>
            <Image source={filter.image} style={styles.image} />
            <Text style={styles.text}>{filter.displayName}</Text>
            <TouchableOpacity onPress={() => handleRemoveFilter(filter.key)}>
              <Text style={styles.removeButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 80,
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 0,
  },
  scrollContainer: {
    gap: 10,
    paddingBottom: 20
  },
  filterBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  removeButton: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
  },
});

export default FilterApplied;
