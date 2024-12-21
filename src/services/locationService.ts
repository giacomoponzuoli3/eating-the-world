import * as Location from "expo-location"

export const requestLocationPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== "granted") {
      console.log("Permission to access location was denied.");
      return false;
    }
  
    const isLocationEnabled = await Location.hasServicesEnabledAsync();
    if (!isLocationEnabled) {
      console.log("Location services are disabled.");
      return false;
    }
  
    return true;
  };

  export const getCurrentLocation = async (): Promise<Location.LocationObjectCoords | undefined> => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Richiede alta precisione
      });
      return location.coords;
    } catch (error: any) {
      if (error.code === 1) {
        console.log("Permission denied.");
      } else if (error.code === 2) {
        console.log("Position unavailable. Ensure GPS is enabled.");
      } else {
        console.log("Unknown error while fetching location:", error);
      }
      return undefined;
    }
  };
  