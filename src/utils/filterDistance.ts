import { RestaurantMarker } from "./interfaces";

/**
 * Filtra i ristoranti in base al filtro di distanza.
 * @param restaurantMarkers - Lista di ristoranti con relative coordinate.
 * @param userCoordinates - Coordinate dell'utente { lat, lng }.
 * @param distanceFilter - Filtro di distanza selezionato (Nearby, 1Km, 2Km, ecc.).
 * @returns Lista di ristoranti idonei in base al filtro di distanza.
 */
export const filterByDistance = (
  restaurantMarkers: RestaurantMarker[],
  userCoordinates: { lat: number; lng: number },
  distanceFilter: string
): RestaurantMarker[] => {
  // Mappa i filtri di distanza in metri
  const distanceMap: { [key: string]: number } = {
    "Nearby": 500, // 500 metri per Nearby
    '1Km': 1000,
    '2Km': 2000,
    '3Km': 3000,
    '5Km': 5000,
    '10Km': 10000,
  };

  const maxDistance = distanceMap[distanceFilter];

  // Filtra i ristoranti in base alla distanza
  return restaurantMarkers.filter(marker => {
    const distance = calculateDistance(userCoordinates, marker.coordinates);
    return distance <= maxDistance;
  });
};


/**
 * Calcola la distanza tra due coordinate geografiche (in metri).
 * @param point1 - Coordinate del primo punto { lat, lng }.
 * @param point2 - Coordinate del secondo punto { lat, lng }.
 * @returns La distanza tra i due punti in metri.
 */
export const calculateDistance = (
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
  
    const earthRadius = 6371e3; // Raggio della Terra in metri
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);
    const deltaLat = toRadians(point2.lat - point1.lat);
    const deltaLng = toRadians(point2.lng - point1.lng);
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadius * c; // Distanza in metri
  };
  
