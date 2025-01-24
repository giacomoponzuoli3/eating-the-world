import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Dimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FiltersOptions, Restaurant } from '../utils/interfaces';
import { User } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { preloadImages, userImages } from '../utils/images';
import FilterApplied from './FiltersApplied';

interface AnimatedSearchViewProps {
  user: User,
  restaurants: Restaurant[];
  isExpanded: boolean;
  filters: FiltersOptions | undefined;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onShowFilters: () => void;
  setFilters: Dispatch<SetStateAction<FiltersOptions | undefined>>;
}

type RootTabParamList = {
  Profile: undefined;
  Maps: undefined;
  Bookings: undefined;
  Favorites: undefined;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedSearchView: React.FC<AnimatedSearchViewProps> = ({
  user,
  restaurants,
  filters,
  onSelectRestaurant,
  onShowFilters,
  setFilters,
  isExpanded,
  setIsExpanded,
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Maps'>>();  
  
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedBackgroundOpacity = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await preloadImages();
        setIsReady(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchText, restaurants]);

  const expandSearch = () => {
    setIsExpanded(true);
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBackgroundOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start(() => {
      searchInputRef.current?.focus();
    });
  };

  const goToProfile= () => {
    navigation.navigate('Profile');
  };

  const collapseSearch = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBackgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsExpanded(false);
      setSearchText('');
    });
  };

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => {
        onSelectRestaurant(item);
        collapseSearch();
      }}
    >
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantAddress} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const animatedContainerStyle = {
    ...styles.expandedContainer,
    opacity: animatedOpacity,
    height: animatedHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [0, SCREEN_HEIGHT],
    }),
  };

  const animatedBackgroundStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: animatedBackgroundOpacity,
    zIndex: 1,
  };

  return (
    <>
      {/* Animated white background */}
      <Animated.View style={animatedBackgroundStyle} pointerEvents="none" />
      <View style={styles.searchbarContainer}>
        <View style={styles.searchWrapper}>
            {!isExpanded ?
              <TouchableOpacity
                  style={[styles.backButton, styles.visible]}
              >
                  <Ionicons name="search" size={24} color="black" />
              </TouchableOpacity> :
              <TouchableOpacity
                  style={[styles.backButton, isExpanded && styles.visible]}
                  onPress={collapseSearch}
              >
                  {isExpanded && <Ionicons name="arrow-back" size={24} color="black" />}
              </TouchableOpacity>
            }
          <TextInput
            ref={searchInputRef}
            placeholder="Search restaurants"
            value={searchText}
            onChangeText={setSearchText}
            onFocus={expandSearch}
            style={[styles.searchbar, isExpanded && styles.expandedSearchbar]}
          />
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={goToProfile} style={{ width: '100%', height: '100%' }}>
              <Image source={userImages[user.username]} style={styles.profileImage} resizeMode="cover" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={onShowFilters}
        >
          <Ionicons name="options" size={21} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filters Applied (if exist and not expanded) */}
      {filters && !isExpanded && (
        <View style={styles.appliedFiltersContainer}>
          <FilterApplied 
            filters={filters} 
            setFilters={setFilters} 
          />
        </View>
      )}

      {isExpanded && (
        <Animated.View 
          style={{
            ...styles.expandedContainer,
            opacity: animatedOpacity,
            height: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SCREEN_HEIGHT],
            }),
          }}
        >
          {/* Contenitore principale con flex */}
            <View style={styles.contentContainer}>
              {/* Container per i filtri */}
              {filters && (
                <View style={styles.filtersContainer}>
                  <FilterApplied 
                    filters={filters} 
                    setFilters={setFilters} 
                  />
                </View>
              )}

              {/* Lista dei ristoranti */}
              <FlatList
                data={filteredRestaurants}
                renderItem={renderRestaurantItem}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.listContent}
              />
            </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 3,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  searchbar: {
    flex: 1,
    height: 50,
    paddingRight: 60,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  expandedSearchbar: {
    backgroundColor: 'transparent',
  },
  profileImageContainer: {
    width: 42, 
    height: 42,
    borderRadius: 25, 
    overflow: 'hidden', 
    borderWidth: 3, 
    borderColor: 'rgba(98, 0, 238, 1)',
    backgroundColor: '#eee', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  profileImage: {
    width: '100%', 
    height: '100%',
    resizeMode: 'cover', 
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appliedFiltersContainer: {
    marginTop: 50, // Posiziona i filtri sotto la search bar
    width: '100%',
    zIndex: 2, // Mantiene i filtri visibili sopra altri elementi
  },
  expandedContainer: {
    position: 'absolute',
    paddingTop: 70,
    paddingBottom: 100,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 2,
  },
  listContent: {
    paddingBottom: 80
  },
  contentContainer: {
    flex: 1, 
    flexDirection: 'column',
  },
  filtersContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 3,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  restaurantInfo: {
    flex: 1,
    marginRight: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default AnimatedSearchView;
