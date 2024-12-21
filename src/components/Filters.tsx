import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";

interface FiltersProps {
  // Here props
}

const typeOfMeal = [
  { label: 'Breakfast', value: '1' },
  { label: 'Brunch', value: '2' },
  { label: 'Lunch', value: '3' },
  { label: 'Dinner', value: '4' },
];

const foodRestrictions = [
  { label: 'Vegan', value: '1' },
  { label: 'Celiac', value: '2' },
  { label: 'Lactose free', value: '3' },
];

const priceRange = [
  { label: '0 - 10 $', value: '1' },
  { label: '10 - 30 $', value: '2' },
  { label: '30 - 80 $', value: '3' },
  { label: '80+ $', value: '4' },
];

const distance = [
  { label: 'Nearby', value: '1' },
  { label: 'Within 5km', value: '2' },
  { label: 'Within 10km', value: '3' },
  { label: 'Any distance', value: '4' },
];

const Filters: FC<FiltersProps> = ({}) => {
  const [mealType, setMealType] = useState<string | undefined>(undefined);
  const [foodRestriction, setFoodRestriction] = useState<string | undefined>(undefined);
  const [priceRangeValue, setPriceRangeValue] = useState<string | undefined>(undefined);
  const [distanceValue, setDistanceValue] = useState<string | undefined>(undefined); 
  const [specialExperienceFilter, setSpecialExperienceFilter] = useState<boolean>(false);
  const [openNowFlter, setOpenNowFilter] = useState<boolean>(false);
  

  const handleResetButton = () => {
    setMealType(undefined);
    setFoodRestriction(undefined);
    setPriceRangeValue(undefined);
    setDistanceValue(undefined);
    setSpecialExperienceFilter(false);
    setOpenNowFilter(false);
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
                title={<Text>Personal Experience</Text>}
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
            onPress={() => {}}
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
