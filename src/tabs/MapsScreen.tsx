import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Image, Text} from "react-native";
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import getCoordinatesFromAddress, { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import { FontAwesome5 } from '@expo/vector-icons'; 
import SearchWithFilter from '../components/SearchWithFilters';
import RestaurantNotFound from '../components/RestaurantNotFound';
import { FiltersOptions, Restaurant, RestaurantMarker } from '../utils/interfaces';
import { getRestaurants } from '../dao/restaurantsDAO';
import RestaurantMarkers from '../components/RestaurantMarkers';
import FiltersApplied from '../components/FiltersApplied';
import { PageRestaurant } from '../components/PageRestaurant';

interface MapScreenProps{
  restaurants: Restaurant[];
  setRestaurants: Dispatch<SetStateAction<Restaurant[]>>;
}
interface MapScreenProps{
  restaurants: Restaurant[],
  user: any
}

const markerImages: { [key: string]: any } = {
  "Pizza": require('../../assets/img/restaurantMarkers/Pizza.png'),
  "Fast-Food": require('../../assets/img/restaurantMarkers/Fast-Food.png'),
  "Sushi": require('../../assets/img/restaurantMarkers/Sushi.png'),
  "Vegan": require('../../assets/img/restaurantMarkers/Vegan.png'),
  "Vegetarian": require('../../assets/img/restaurantMarkers/Vegetarian.png'),
  "Gourmet": require('../../assets/img/restaurantMarkers/Gourmet.png'),
  "Pasta": require('../../assets/img/restaurantMarkers/Pasta.png'),
  "Salads": require('../../assets/img/restaurantMarkers/Salads.png'),
  "Traditional": require('../../assets/img/restaurantMarkers/Traditional.png'),
  "Lactose-Free": require('../../assets/img/restaurantMarkers/Lactose-Free.png'),
  "Gluten-Free": require('../../assets/img/restaurantMarkers/Gluten-Free.png'),
  "Fish": require('../../assets/img/restaurantMarkers/Fish.png'),
  "Cafeteria" : require("../../assets/img/restaurantMarkers/Cafeteria.png")
};

const MapScreen: FC<MapScreenProps> = ({restaurants, user}) => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [showRestaurantNotFound, setShowRestaurantNotFound] = useState<boolean>(false);
  const [restaurantMarkers, setRestaurantMarkers] = useState<RestaurantMarker[]>([])
  const [filters, setFilters] = useState<FiltersOptions | undefined>(undefined);
  const [isReady, setIsReady] = useState<number>(0);
  const mapRef = React.useRef<MapView>(null);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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
        console.log(filters)
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
          setIsReady(1);
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

  const handleSelectRestaurant = async (restaurant: Restaurant) => {
    if(restaurant.address){
      const coordinates = await getCoordinatesFromAddress(restaurant.address);
      if(coordinates){
        mapRef.current?.animateToRegion({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }
    }
  }

  return (
    
    <View style={styles.container}>
      {selectedRestaurant ? (
        <PageRestaurant
          restaurant={selectedRestaurant}
          user={user}
          onClose={() => {
            setSelectedRestaurant(null);
          }}
        />
      ) : (
        <>
          {initialRegion && (
            <MapView
              key={isReady}
              ref={mapRef}
              style={styles.map}
              loadingEnabled={true}
              initialRegion={initialRegion}
              showsUserLocation={true}
              showsPointsOfInterest={false}
              showsCompass={false}
            >
              
              {isReady && restaurantMarkers.map((restaurantMarker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: restaurantMarker.coordinates.lat,
                    longitude: restaurantMarker.coordinates.lng,
                  }}
                  title={restaurantMarker.restaurant.name}
                  description={restaurantMarker.restaurant.description}
                >
                  <Image
                    source={markerImages[restaurantMarker.restaurant.tags[0]?.name] || require('../../assets/img/restaurantMarkers/favicon.png')}
                    style={{ width: 40, height: 40 }} 
                    resizeMode="contain"
                  />
                  <Callout
                    onPress={() => {
                      setSelectedRestaurant(restaurantMarker.restaurant)
                    }}
                  >
                    <View style={{ width: 150, padding: 5 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{restaurantMarker.restaurant.name}</Text>
                      <Text numberOfLines={2} style={{ color: "gray" }}>
                        {restaurantMarker.restaurant.description}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          )}
          {/* Searchbar */}
          <SearchWithFilter restaurants={restaurants} 
            onSelectRestaurant={handleSelectRestaurant} 
            setFilters={setFilters}
            />
          {/* Center User Location Button */}
          <TouchableOpacity style={styles.locationButton} onPress={centerOnUserLocation}>
            <FontAwesome5 name={"location-arrow"} size={18} color={"black"} />
          </TouchableOpacity>
          {showRestaurantNotFound && (
            <RestaurantNotFound onClose={() => setShowRestaurantNotFound(false)} />
          )}
        </>
      )}
      {filters && (<FiltersApplied filters={filters} setFilters={setFilters}/>)}
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
    right: 10,
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
