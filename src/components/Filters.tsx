import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { CheckBox } from "react-native-elements";
import { FiltersOptions, Restaurant } from "../utils/interfaces";
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";

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
  { label: '0 - 10 $', value: '0-10 $' },
  { label: '10 - 30 $', value: '10-30 $' },
  { label: '30 - 80 $', value: '30-80 $' },
  { label: '80+ $', value: '80+ $' },
];

const distance = [
  { label: 'Nearby', value: 'Nearby' },
  { label: 'Within 5km', value: 'Within 5km' },
  { label: 'Within 10km', value: 'Within 10km' },
  { label: 'Any distance', value: 'Any distance' },
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
      <View style={styles.filtersDropdownRow}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              mealType ? styles.dropdownSelected : null,
            ]}
            selectedTextStyle={{fontWeight: "bold"}}
            placeholder="Type of Meal"
            data={typeOfMeal}
            labelField={"label"}
            valueField={"value"}
            value={mealType}
            onChange={item => setMealType(item.value)}
            activeColor="lightblue"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[
              styles.dropdown,
              foodRestriction ? styles.dropdownSelected : null,
            ]}
            selectedTextStyle={{fontWeight: "bold"}}
            placeholder="Restrictions"
            data={foodRestrictions}
            labelField={"label"}
            valueField={"value"}
            value={foodRestriction}
            onChange={item => setFoodRestriction(item.value)}
          />
        </View>
        </View>
        <View style={styles.filtersDropdownRow}>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[
                styles.dropdown,
                priceRangeValue ? styles.dropdownSelected : null,
              ]}
              selectedTextStyle={{fontWeight: "bold"}}
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
              style={[
                styles.dropdown,
                distanceValue ? styles.dropdownSelected : null,
              ]}
              selectedTextStyle={{fontWeight: "bold"}}
              placeholder="Distance"
              data={distance}
              labelField={"label"}
              valueField={"value"}
              value={distanceValue}
              onChange={item => setDistanceValue(item.value)}
            />
          </View>
        </View>
        <View style={styles.filtersDropdownRow}>
          <View style={styles.checkboxContainer}>
              <CheckBox 
                  containerStyle={styles.checkbox}
                  style={styles.checkbox}
                  title={<Text>Special Experience</Text>}
                  checked={specialExperienceFilter}
                  onPress={() => setSpecialExperienceFilter(prev => ! prev)}
              />
          </View>
          <View style={styles.checkboxContainer}>
              <CheckBox 
                  containerStyle={styles.checkbox}
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
    zIndex: 2,
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
    marginBottom: 20,
    textAlign: "left",
  },
  filtersDropdownRow: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
  },
  dropdownContainer: {
    width: "50%", 
    padding: 7,
  },
  dropdown: {
    borderWidth: 1,
    padding: 10,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
  },
  dropdownSelected:{
    transform: [{ scale: 1.05 }], 
    
  },
  checkboxContainer:{
    width: "50%"
  },
  checkbox:{
    borderWidth: 1,
    padding: 11,
    marginLeft: 7, 
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
  },
  buttonsContainer:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  }
});

export default Filters;
