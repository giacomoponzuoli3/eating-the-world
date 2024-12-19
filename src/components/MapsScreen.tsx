import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from "react-native";
import MapView from 'react-native-maps';
import { getCurrentLocation, requestLocationPermission } from '../services/locationService';
import { Region } from '../utils/interfaces';


const MapScreen = () => {
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);

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

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          loadingEnabled={true}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true} 
          showsMyLocationButton={true}
          showsCompass={true}
        />
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
});

export default MapScreen;
