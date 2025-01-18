import { FC } from "react";
import { RestaurantMarker } from "../utils/interfaces";
import React from "react";
import { Marker } from "react-native-maps";

interface RestaurantMarkersProps{
    restaurantMarkers: RestaurantMarker[];
}

const RestaurantMarkers: FC<RestaurantMarkersProps> = ({restaurantMarkers}) => {
    return(
        <>
            {restaurantMarkers.map((restaurantMarker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: restaurantMarker.coordinates.lat,
                        longitude: restaurantMarker.coordinates.lng,
                    }}
                    title={restaurantMarker.restaurant.name}
                    description={restaurantMarker.restaurant.description}
                />
            ))}
        </>
    );
}

export default RestaurantMarkers;