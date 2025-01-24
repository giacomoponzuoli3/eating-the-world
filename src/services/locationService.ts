import * as Location from "expo-location"

export const requestLocationPermission = async (): Promise<boolean> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== "granted") {
      console.error("Permission to access location was denied.");
      return false;
    }
  
    const isLocationEnabled = await Location.hasServicesEnabledAsync();
    if (!isLocationEnabled) {
      console.error("Location services are disabled.");
      return false;
    }
  
    return true;
  };

  export const getCurrentLocation = async (): Promise<Location.LocationObjectCoords | undefined> => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Richiede alta precisione
      });
      return location.coords;
    } catch (error: any) {
      if (error.code === 1) {
        console.error("Permission denied.");
      } else if (error.code === 2) {
        console.error("Position unavailable. Ensure GPS is enabled.");
      } else {
        console.error("Unknown error while fetching location:", error);
      }
      return undefined;
    }
  };

  // Sostituisci con la tua chiave API di Google Maps
const GOOGLE_API_KEY = "AIzaSyA_cdPPRe_DxMd9ufTGQ4Tay950d94Hb8I";

// Funzione per ottenere coordinate da un indirizzo
const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number, lng: number } | undefined> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
      console.error("HTTP error:", response.status, response.statusText);
      return undefined;
    }

    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error("Geocoding error:", data.status);
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return undefined;
  }
};

export default getCoordinatesFromAddress;

  
