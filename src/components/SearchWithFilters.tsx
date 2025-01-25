import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { FiltersOptions, Restaurant } from '../utils/interfaces';
import AnimatedSearchView from './AnimatedSearchView';
import Filters from './Filters';
import { User } from '../../App';

interface SearchWithFilterProps {
  user: User;
  filters: FiltersOptions | undefined;
  restaurants: Restaurant[];
  setFilters: React.Dispatch<React.SetStateAction<FiltersOptions | undefined>>;
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

const SearchWithFilter: React.FC<SearchWithFilterProps> = ({
  user,
  filters,
  restaurants,
  setFilters,
  onSelectRestaurant,
  isExpanded,
  setIsExpanded
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    if (onSelectRestaurant) {
      onSelectRestaurant(restaurant);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedSearchView
        user={user}
        restaurants={restaurants}
        onSelectRestaurant={handleSelectRestaurant}
        filters={filters}
        onShowFilters={() => {
          Keyboard.dismiss();
          setShowFilters(true);
        }}
        setFilters={setFilters}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      {showFilters && (
        <Filters
          filters={filters}
          visible={showFilters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        paddingTop: 20
    }
})

export default SearchWithFilter;
