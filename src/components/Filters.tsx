import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";
import { FiltersOptions, Restaurant } from "../utils/interfaces";

interface FiltersProps {
  setFilters: Dispatch<SetStateAction<FiltersOptions | undefined>>;
  onClose: () => void;
}

const typeOfMeal = [
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Brunch', value: 'Brunch' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
];

const foodRestrictions = [
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Celiac', value: 'Celiac' },
  { label: 'Lactose free', value: 'Lactose Free' },
];

const priceRange = [
  { label: '0 - 10 $', value: 'low' },
  { label: '10 - 30 $', value: 'mid' },
  { label: '30 - 80 $', value: 'high' },
  { label: '80+ $', value: 'rich' },
];

const distance = [
  { label: 'Nearby', value: '1' },
  { label: 'Within 5km', value: '2' },
  { label: 'Within 10km', value: '3' },
  { label: 'Any distance', value: '4' },
];

const Filters: FC<FiltersProps> = ({setFilters, onClose}) => {
  const [mealType, setMealType] = useState<string | undefined>(undefined);
  const [foodRestriction, setFoodRestriction] = useState<string | undefined>(undefined);
  const [priceRangeValue, setPriceRangeValue] = useState<string | undefined>(undefined);
  const [distanceValue, setDistanceValue] = useState<string | undefined>(undefined); 
  const [specialExperienceFilter, setSpecialExperienceFilter] = useState<boolean>(false);
  const [openNowFlter, setOpenNowFilter] = useState<boolean>(false);
  
  const reset = () => {
    setMealType(undefined);
    setFoodRestriction(undefined);
    setPriceRangeValue(undefined);
    setDistanceValue(undefined);
    setSpecialExperienceFilter(false);
    setOpenNowFilter(false);
  }
  const handleResetButton = () => {
    reset();
  }

  const handleApplyButton = async () => {
    console.log("Filters Applied");
    setFilters({
      typeOfMeal: mealType,
      foodRestrictions: foodRestriction,
      priceRange: priceRangeValue,
      distance: distanceValue,
      specialExperience: specialExperienceFilter,
      openNow: openNowFlter,
    });
    reset();
    onClose();
  }

  return (
    <View style={styles.filtersWindow}>
      <View style={styles.arrow}></View>
      <Text style={styles.filtersTitle}>Filter Options</Text>
      <View style={styles.filtersDropdowns}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Type of Meal"
            data={typeOfMeal}
            labelField={"label"}
            valueField={"value"}
            value={mealType}
            onChange={item => setMealType(item.value)}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Food Restrictions"
            data={foodRestrictions}
            labelField={"label"}
            valueField={"value"}
            value={foodRestriction}
            onChange={item => setFoodRestriction(item.value)}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Price Range"
            data={priceRange}
            labelField={"label"}
            valueField={"value"}
            value={priceRangeValue}
            onChange={item => setPriceRangeValue(item.value)}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            placeholder="Distance"
            data={distance}
            labelField={"label"}
            valueField={"value"}
            value={distanceValue}
            onChange={item => setDistanceValue(item.value)}
          />
        </View>
        <View style={styles.checkboxContainer}>
            <CheckBox 
                title={<Text>Special Experience</Text>}
                checked={specialExperienceFilter}
                onPress={() => setSpecialExperienceFilter(prev => ! prev)}
            />
        </View>
        <View style={styles.checkboxContainer}>
            <CheckBox 
                title={<Text>Open Now</Text>}
                checked={openNowFlter}
                onPress={() => setOpenNowFilter(prev => ! prev)}
                />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button 
            title="Reset" 
            onPress={() => handleResetButton()}
            color={"red"}
        />
        <Button 
            title="Apply" 
            onPress={() => handleApplyButton()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersWindow: {
    position: "absolute",
    top: 80, 
    left: -10,
    width: "110%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  arrow: {
    position: "absolute",
    top: -10, 
    right: 12, 
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: "solid",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  filtersDropdowns: {
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dropdownContainer: {
    width: "48%", 
  },
  checkboxContainer:{
    width: "48%"
  },
  buttonsContainer:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  }
});

export default Filters;
