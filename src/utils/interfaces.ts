export interface Region{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface Coordinates{
    lat: number;
    lng: number;
}

export interface Restaurant{
    id: number;
    name: string;
    description: string;
    address: string;
    capacity: number;
    culinary_experience: number;
    phone_number: string;
}

export interface RestaurantMarker{
    restaurant: Restaurant;
    coordinates: Coordinates;
}
export interface Reservation {
    id: number;
    restaurantId: number;
    restaurantName: string;
    date: string; // Formato: 'YYYY-MM-DD'
    time?: string; // Formato: 'HH:mm'
    numberOfGuests: number;
    imageUrl: string; 
    isSpecialExperience: boolean;
    language?: string;
  }
  