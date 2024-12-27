import { FC } from "react";
import { FiltersOptions } from "../utils/interfaces";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";

interface FilterAppliedProps {
  filters: FiltersOptions;
}

const FilterApplied: FC<FilterAppliedProps> = ({ filters }) => {
  const appliedFilters = [
    {
      label: filters.typeOfMeal,
      displayName: filters.typeOfMeal,
      image: require("../../assets/fork_knife.png"),
    },
    {
      label: filters.foodRestrictions,
      displayName: filters.foodRestrictions,
      image: require("../../assets/restrictions.png"),
    },
    {
      label: filters.priceRange,
      displayName: filters.priceRange,
      image: require("../../assets/priceRange.png"),
    },
    {
      label: filters.distance,
      displayName: filters.distance,
      image: require("../../assets/distance.png"),
    },
    {
      label: filters.specialExperience,
      displayName: "Special Experience",
      image: require("../../assets/special_experience.png"),
    },
    {
      label: filters.openNow,
      displayName: "Open Now",
      image: require("../../assets/open_now.png"),
    },
  ].filter((filter) => filter.label); // Rimuove i filtri non applicati.

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
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
  },
  scrollContainer: {
    gap: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Effetto ombra per Android.
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  image: {
    width: 20, // Larghezza fissa per ridimensionare correttamente l'immagine.
    height: 20, // Altezza fissa.
    resizeMode: "contain", // Mantiene le proporzioni dell'immagine.
  },
});

export default FilterApplied;
