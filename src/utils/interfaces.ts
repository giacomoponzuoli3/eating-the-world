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

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    address: string;
    capacity: number;
    culinary_experience: string;
    phone_number: string;
    price_range: number;
    tags: any[]
  }  

export interface RestaurantMarker{
    restaurant: Restaurant,
    coordinates: Coordinates,
}

export interface FiltersOptions{
    typeOfMeal?: string;
    foodRestrictions?: string;
    priceRange?: string;
    distance?: string;
    specialExperience?: boolean;
    openNow?: boolean;
    [key: string]: string | boolean | undefined;
}
export interface Reservation {
    id: number;
    restaurantId: number;
    restaurantName: string;
    date: string; // Formato: 'YYYY/MM/DD'
    time?: string; // Formato: 'HH:mm'
    numberOfGuests: number;
    isSpecialExperience: boolean;
    language?: any;
    special_request: string | null
}

export interface Question {
    question: string;
    explanation: string;
    answers: string[];
    correct: number;
}
  
