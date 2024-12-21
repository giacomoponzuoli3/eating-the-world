import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Region } from 'react-native-maps';
import { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import { FontAwesome5 } from '@expo/vector-icons'; 
import SearchWithFilter from '../components/SearchWithFilter';
import RestaurantNotFound from '../components/RestaurantNotFound';

const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [showRestaurantNotFound, setShowRestaurantNotFound] = useState<boolean>(false);
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
      {initialRegion && (
        <MapView
          ref={mapRef}
          style={styles.map}
          loadingEnabled={true}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsCompass={false}
        />
      )}
      {/* Searchbar */}
      <SearchWithFilter setShowRestaurantNotFound={setShowRestaurantNotFound}/>
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
});

export default MapScreen;
