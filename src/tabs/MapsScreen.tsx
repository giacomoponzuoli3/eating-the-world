import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Image} from "react-native";
import MapView, { MapMarker, Marker, Region } from 'react-native-maps';
import getCoordinatesFromAddress, { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import { FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import SearchWithFilter from '../components/SearchWithFilters';
import RestaurantNotFound from '../components/RestaurantNotFound';
import { FiltersOptions, Restaurant, RestaurantMarker } from '../utils/interfaces';
import { getRestaurants } from '../dao/restaurantsDAO';
import RestaurantMarkers from '../components/RestaurantMarkers';

interface MapScreenProps{
  restaurants: Restaurant[];
  setRestaurants: Dispatch<SetStateAction<Restaurant[]>>;
}
const MapScreen: FC<MapScreenProps> = ({restaurants, setRestaurants}) => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [showRestaurantNotFound, setShowRestaurantNotFound] = useState<boolean>(false);
  const [restaurantMarkers, setRestaurantMarkers] = useState<RestaurantMarker[]>([])
  const [filters, setFilters] = useState<FiltersOptions | undefined>(undefined);
  const mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    const setupLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "Location permissions are required to use this feature."
        );
        return;
      }

      const location = await getCurrentLocation();
      if (location) {
        setInitialRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        });
      } else {
        Alert.alert(
          "Error",
          "Unable to fetch location. Ensure GPS is enabled and try again."
        );
      }
    };

    setupLocation();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurants = await getRestaurants(filters);
        console.log(restaurants?.length)
        if (restaurants) {
          const restaurantMarkers = (await Promise.all(
            restaurants.map(async (restaurant) => {
              const coordinates = await getCoordinatesFromAddress(restaurant.address);
              if (coordinates) {
                return { restaurant, coordinates };
              }
              return null;
            })
          ))
          .filter((marker): marker is RestaurantMarker => marker !== null);
          console.log(restaurantMarkers.length);
          setRestaurantMarkers(restaurantMarkers);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurants();
  }, [filters]);
  

  // Function to center the map on the user's current location
  const centerOnUserLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      });
    } else {
      Alert.alert(
        "Error",
        "Unable to fetch location. Ensure GPS is enabled and try again."
      );
    }
  };

  return (
    
    <View style={styles.container}>
      {initialRegion && restaurantMarkers &&(
        <MapView
          key={restaurantMarkers.length}
          ref={mapRef}
          style={styles.map}
          loadingEnabled={true}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsPointsOfInterest={false}
          showsCompass={false}
        >
          <RestaurantMarkers restaurantMarkers={restaurantMarkers}/>
        </MapView>
      )}
      {/* Searchbar */}
      <SearchWithFilter setFilters={setFilters} setShowRestaurantNotFound={setShowRestaurantNotFound}/>
      {/* Center User Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={centerOnUserLocation}>
        <FontAwesome5 name={"location-arrow"} size={25} color={"black"} />
      </TouchableOpacity>
      {showRestaurantNotFound && (
        <RestaurantNotFound onClose={() => setShowRestaurantNotFound(false)}/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  markerImage:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol:{
    width: 35,
    height: 35,
    margin: 5,
  }
});

export default MapScreen;
