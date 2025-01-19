import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FiltersOptions, Restaurant } from '../utils/interfaces';
import AnimatedSearchView from './AnimatedSearchView';
import Filters from './Filters';

interface SearchWithFilterProps {
  filters: FiltersOptions | undefined;
  restaurants: Restaurant[];
  setFilters: React.Dispatch<React.SetStateAction<FiltersOptions | undefined>>;
  onSelectRestaurant?: (restaurant: Restaurant) => void;
}

const SearchWithFilter: React.FC<SearchWithFilterProps> = ({
  filters,
  restaurants,
  setFilters,
  onSelectRestaurant,
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
        restaurants={restaurants}
        onSelectRestaurant={handleSelectRestaurant}
        onShowFilters={() => setShowFilters(true)}
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
