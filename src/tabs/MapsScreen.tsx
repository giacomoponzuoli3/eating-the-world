import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Image, Text} from "react-native";
import MapView, { Callout, MapMarker, Marker, Region } from 'react-native-maps';
import getCoordinatesFromAddress, { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import { FontAwesome5 } from '@expo/vector-icons'; 
import SearchWithFilter from '../components/SearchWithFilters';
import RestaurantNotFound from '../components/RestaurantNotFound';
import { FiltersOptions, Restaurant, RestaurantMarker } from '../utils/interfaces';
import { getRestaurants } from '../dao/restaurantsDAO';
import { PageRestaurant } from '../components/PageRestaurant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import imagesRestaurants from '../utils/imagesRestaurants';
import { filterByDistance } from '../utils/filterDistance';
import { User } from '../../App';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import _ from 'lodash';
interface MapScreenProps{
  user: User,
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

type RootTabParamList = {
  Profile: undefined;
  Maps: undefined;
  Bookings: undefined;
  Favorites: undefined;
};

const MapScreen: FC<MapScreenProps> = ({user}) => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [showRestaurantNotFound, setShowRestaurantNotFound] = useState<boolean>(false);
  const [restaurantMarkers, setRestaurantMarkers] = useState<RestaurantMarker[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<FiltersOptions | undefined>(undefined);
  const [isReady, setIsReady] = useState<number>(0);
  const mapRef = React.useRef<MapView>(null);
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList, 'Maps'>>();  

  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const markersRef = useRef<MapMarker[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      const fetchRestaurants = async () => {
        try {
          const restaurants = await getRestaurants(filters);
          setRestaurants(restaurants as Restaurant[]); 
          if (restaurants?.length) {
            let newRestaurantMarkers = (await Promise.all(
              restaurants.map(async (restaurant) => {
                const coordinates = await getCoordinatesFromAddress(restaurant.address);
                if (coordinates) {
                  return { restaurant, coordinates };
                }
                return null;
              })
            ))
            .filter((marker): marker is RestaurantMarker => marker !== null);
  
            if(filters?.distance){
              const current_location = await getCurrentLocation();
              if(current_location){
                const user_coordinates = {lat: current_location?.latitude, lng: current_location?.longitude}
                newRestaurantMarkers = filterByDistance(newRestaurantMarkers, user_coordinates, filters.distance);
                const filteredRestaurants = restaurants.filter((restaurant) =>
                  newRestaurantMarkers.some((marker) => marker.restaurant.id === restaurant.id)
                );
                setRestaurants(filteredRestaurants); 
              }
            }
            // Confronto con i marker esistenti
            if (!_.isEqual(newRestaurantMarkers, restaurantMarkers)) {
              setRestaurantMarkers(newRestaurantMarkers);
              setIsReady((prev) => prev + 1); 
            }
          }else{
            setFilters(undefined);
            setShowRestaurantNotFound(true);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchRestaurants();
    }, [filters, isExpanded])
  );
  
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
          latitude: coordinates.lat + 0.007,
          longitude: coordinates.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }, 500);
        setTimeout(() => {
          let markerIndex = restaurantMarkers.findIndex((marker) => {
            return (
              marker.coordinates.lat === coordinates.lat &&
              marker.coordinates.lng === coordinates.lng
            );
          });
          markerIndex += 1;
          if(markerIndex){
            markersRef.current[markerIndex - 1].showCallout();
          }
        }, 1000);
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
            navigation.navigate("Maps");
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
              showsPointsOfInterest={true}
            >
              {isReady && restaurantMarkers.map((restaurantMarker, index) => (
                <Marker
                  key={index}
                  ref={(ref) => (markersRef.current[index] = ref!)}
                  coordinate={{
                    latitude: restaurantMarker.coordinates.lat,
                    longitude: restaurantMarker.coordinates.lng,
                  }}
                  title={restaurantMarker.restaurant.name}
                  description={restaurantMarker.restaurant.description}
                  onPress={() => {
                    mapRef.current?.animateToRegion({
                      latitude: restaurantMarker.coordinates.lat + 0.007,
                      longitude: restaurantMarker.coordinates.lng,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    });
                  }}
                >
                  <Callout onPress={() => setSelectedRestaurant(restaurantMarker.restaurant)}>
                    <View style={styles.calloutContainer}>
                      <Image
                        source={imagesRestaurants[restaurantMarker.restaurant.name]}
                        style={styles.calloutImage}
                      />
                      <View style={styles.calloutContent}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                          <Text style={styles.calloutTitle}>{restaurantMarker.restaurant.name}</Text>
                          {/* Calcolo simboli € */}
                          <Text style={styles.calloutPrice}>
                            {restaurantMarker.restaurant.price_range <= 10
                              ? "€"
                              : restaurantMarker.restaurant.price_range <= 20
                              ? "€€"
                              : restaurantMarker.restaurant.price_range <= 30
                              ? "€€€"
                              : "€€€+"}
                          </Text>
                        </View>
                        <Text style={styles.calloutDescription} numberOfLines={3}>
                          {restaurantMarker.restaurant.description}
                        </Text>
                        <View style={styles.calloutFooter}>
                          {/* Lista tag multilinea */}
                          {restaurantMarker.restaurant.tags && restaurantMarker.restaurant.tags.length > 0 && (
                            <View style={styles.calloutTags}>
                              {restaurantMarker.restaurant.tags.map((tag, index) => (
                                <View key={index} style={styles.calloutTag}>
                                  <Image
                                    source={markerImages[tag.name] || require('../../assets/img/restaurantMarkers/favicon.png')}
                                    style={{ width: 18, height: 18 }} 
                                    resizeMode="contain"
                                  />
                                  <Text style={styles.calloutTagText}>{tag.name}</Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      </View>
                      {/* Indicatore di cliccabilità */}
                      <View style={styles.calloutIndicator}>
                        <FontAwesome5 name="chevron-right" size={16} color="#4F46E5" />
                      </View>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>
          )}
          {/* Searchbar */}
          <SearchWithFilter 
            user={user}
            filters={filters}
            restaurants={restaurants} 
            onSelectRestaurant={handleSelectRestaurant} 
            setFilters={setFilters}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
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
  },
  calloutContainer: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  calloutImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  calloutContent: {
    padding: 10,
    paddingBottom: 50
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 18,
  },
  calloutFooter: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  calloutPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  calloutTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginLeft: 8, // Spazio tra prezzo e tag
  },
  calloutTag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6, // Spazio tra tag
  },
  calloutTagText: {
    fontSize: 10,
    color: "#4B5563",
    fontWeight: "600",
  },
  calloutButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#4F46E5", // Colore accattivante per il pulsante
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  calloutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  calloutIndicator: {
    position: "absolute",
    width: 40,
    height: 40,
    bottom: 10,
    right: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});

export default MapScreen;
