import { Dispatch, FC, SetStateAction, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Modal, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { FiltersOptions } from '../utils/interfaces';

interface FiltersProps {
  setFilters: Dispatch<SetStateAction<FiltersOptions | undefined>>;
  onClose: () => void;
  visible: boolean;
}

interface FilterItem {
  label: string;
  value: string;
}

const typeOfMeal: FilterItem[] = [
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Brunch', value: 'Brunch' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
];

const foodRestrictions: FilterItem[] = [
  { label: 'Traditional', value: 'Traditional' },
  { label: 'Pizza', value: 'Pizza' },
  { label: 'Pasta', value: 'Pasta' },
  { label: 'Sushi', value: 'Sushi' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Gluten Free', value: 'Gluten-Free' },
  { label: 'Lactose Free', value: 'Lactose-Free' },
  { label: 'Salads', value: 'Salads' },
  { label: 'Local', value: 'Local' },
  { label: 'Modern', value: 'Modern' },
  { label: 'Cafeteria', value: 'Cafeteria' },
  { label: 'Gourmet', value: 'Gourmet' },
  { label: 'Fish', value: 'Fish' },
];

const priceRange: FilterItem[] = [
  { label: '0 - 10 $', value: '0-10 $' },
  { label: '10 - 30 $', value: '10-30 $' },
  { label: '30 - 80 $', value: '30-80 $' },
  { label: '80+ $', value: '80+ $' },
];

const distance: FilterItem[] = [
  { label: 'Nearby', value: 'Nearby' },
  { label: 'Within 5km', value: 'Within 5km' },
  { label: 'Within 10km', value: 'Within 10km' },
  { label: 'Any distance', value: 'Any distance' },
];

const FilterSelect: FC<{
  label: string;
  value: string;
  items: FilterItem[];
  onValueChange: (value: string) => void;
}> = ({ label, value, items, onValueChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.selectLabel}>{label}</Text>
        <View style={styles.selectValue}>
          <Text style={styles.valueText}>
            {value ? items.find(item => item.value === value)?.label : 'Select...'}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <BlurView intensity={Platform.OS === 'ios' ? 30 : 100} style={styles.pickerModalOverlay}>
          <View style={styles.pickerModalContent}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text style={styles.pickerDoneButton}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onValueChange(itemValue);
                Platform.OS === 'android' && setShowPicker(false);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select..." value="" />
              {items.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const Filters: FC<FiltersProps> = ({ setFilters, onClose, visible }) => {
  const [mealType, setMealType] = useState<string>('');
  const [foodRestriction, setFoodRestriction] = useState<string>('');
  const [selectedPriceRange, setPriceRange] = useState<string>('');
  const [selectedDistance, setDistance] = useState<string>('');
  const [selectedSpecialExperience, setSelectedSpecialExperience] = useState<boolean>(false);
  const [selectedOpenNow, setSelectedOpenNow] = useState<boolean>(false);

  const handleResetButton = () => {
    setMealType('');
    setFoodRestriction('');
    setPriceRange('');
    setDistance('');
    setSelectedSpecialExperience(false);
    setSelectedOpenNow(false);
  };

  const handleApplyButton = () => {
    setFilters({
      typeOfMeal: mealType || undefined,
      foodRestrictions: foodRestriction || undefined,
      priceRange: selectedPriceRange || undefined,
      distance: selectedDistance || undefined,
      specialExperience: selectedSpecialExperience || undefined,
      openNow: selectedOpenNow || undefined
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={90} style={styles.container}>
        <View style={styles.filtersWindow}>
          <View style={styles.header}>
            <Text style={styles.filtersTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.filtersContent}>
            <FilterSelect
              label="Type of Meal"
              value={mealType}
              items={typeOfMeal}
              onValueChange={setMealType}
            />
            <FilterSelect
              label="Food Restrictions"
              value={foodRestriction}
              items={foodRestrictions}
              onValueChange={setFoodRestriction}
            />
            <FilterSelect
              label="Price Range"
              value={selectedPriceRange}
              items={priceRange}
              onValueChange={setPriceRange}
            />
            <FilterSelect
              label="Distance"
              value={selectedDistance}
              items={distance}
              onValueChange={setDistance}
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                title="Special Experience"
                checked={selectedSpecialExperience}
                checkedColor="rgba(90, 0, 230, 1)"
                onPress={() => setSelectedSpecialExperience(!selectedSpecialExperience)}
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxText}
              />
              <CheckBox
                title="Open Now"
                checked={selectedOpenNow}
                checkedColor="rgba(90, 0, 230, 1)"
                onPress={() => setSelectedOpenNow(!selectedOpenNow)}
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxText}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetButton}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApplyButton}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filtersWindow: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  filtersContent: {
    marginBottom: 20,
  },
  selectContainer: {
    marginBottom: 15,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F8F8F8',
  },
  selectLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  selectValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#333',
  },
  pickerModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pickerModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  pickerHeader: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    alignItems: 'flex-end',
  },
  pickerDoneButton: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  picker: {
    height: 216,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#F5F5F5',
  },
  applyButton: {
    backgroundColor: "rgba(90, 0, 230, 1)"
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 0,
  },
  checkbox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 12, // Spazio verticale uniforme
    paddingHorizontal: 8, // Spazio orizzontale uniforme
    backgroundColor: '#F8F8F8',
    alignItems: 'center', // Allinea gli elementi centrati
    justifyContent: 'center', // Allinea il contenuto verticalmente
    marginHorizontal: 5, // Spazio tra le checkbox
    width: '48%',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Filters;
