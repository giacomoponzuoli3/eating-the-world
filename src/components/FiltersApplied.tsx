import { Dispatch, FC, SetStateAction } from "react";
import { FiltersOptions } from "../utils/interfaces";
import { View, ScrollView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { filtersImages } from "../utils/images";

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
      image: filtersImages["typeOfMeal"],
    },
    {
      key: "foodRestrictions",
      label: filters.foodRestrictions,
      displayName: filters.foodRestrictions,
      image: filtersImages["foodRestrictions"],
    },
    {
      key: "priceRange",
      label: filters.priceRange,
      displayName: filters.priceRange,
      image: filtersImages["priceRange"],
    },
    {
      key: "distance",
      label: filters.distance,
      displayName: filters.distance,
      image: filtersImages["distance"],
    },
    {
      key: "specialExperience",
      label: filters.specialExperience,
      displayName: "Special Experience",
      image: filtersImages["specialExperience"],
    },
    {
      key: "openNow",
      label: filters.openNow,
      displayName: "Open Now",
      image: filtersImages["openNow"],
    },
  ].filter((filter) => filter.label); 

  const handleRemoveFilter = (key: string) => {
    
    setFilters((prevFilters) => {
      if (!prevFilters) return undefined;

      const newFilters: FiltersOptions = {
        typeOfMeal: key === "typeOfMeal" ? undefined : prevFilters.typeOfMeal,
        foodRestrictions: key === "foodRestrictions" ? undefined : prevFilters.foodRestrictions,
        priceRange: key === "priceRange" ? undefined : prevFilters.priceRange,
        distance: key === "distance" ? undefined : prevFilters.distance,
        specialExperience: key === "specialExperience" ? undefined : prevFilters.specialExperience,
        openNow: key === "openNow" ? undefined : prevFilters.openNow,
      }
      // Controlla se tutti i valori sono undefined
    const allUndefined = Object.values(newFilters).every((value) => value === undefined);

    // Se tutti i campi sono undefined, restituisci undefined, altrimenti restituisci i nuovi filtri
    return allUndefined ? undefined : newFilters;
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
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFilter(filter.key)}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  scrollContainer: {
    gap: 10,
    padding: 10,
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
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
  },
});

export default FilterApplied;
