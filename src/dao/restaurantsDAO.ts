import { FiltersOptions, Restaurant } from '../utils/interfaces';
import getDatabase from './connectionDB';

/**
 * 
 * @returns array di tutti i ristoranti presenti nel db
 */
const getRestaurants = async (filters?: FiltersOptions): Promise<Restaurant[] | null> => {
    try {
        const db = await getDatabase();
        let results: Restaurant[] = [];

        if (!filters) {
            // Nessun filtro applicato
            results = await db.getAllAsync('SELECT * FROM restaurants', []);
        } else {
            const { typeOfMeal, specialExperience, openNow } = filters;
            const hours = new Date().getHours();

            // Calcola i diversi percorsi in base ai filtri
            if (typeOfMeal && specialExperience && openNow) {
                // Tutti i filtri applicati
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r, culinary_experience ce 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ? 
                     AND ce.id_restaurant = r.id 
                     AND hour_start_deal <= ? AND hour_end_deal >= ?`,
                    [typeOfMeal, hours, hours]
                );
            } else if (typeOfMeal && specialExperience) {
                // Filtro su typeOfMeal e specialExperience
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r, culinary_experience ce 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ? 
                     AND ce.id_restaurant = r.id`,
                    [typeOfMeal]
                );
            } else if (typeOfMeal && openNow) {
                // Filtro su typeOfMeal e openNow
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ? 
                     AND hour_start_deal <= ? AND hour_end_deal >= ?`,
                    [typeOfMeal, hours, hours]
                );
            } else if (specialExperience && openNow) {
                // Filtro su specialExperience e openNow
                results = await db.getAllAsync(
                    `SELECT * FROM deals_restaurants dr, restaurants r, culinary_experience ce 
                     WHERE ce.id_restaurant = r.id 
                     AND hour_start_deal <= ? AND hour_end_deal >= ?`,
                    [hours, hours]
                );
            } else if (typeOfMeal) {
                // Solo filtro su typeOfMeal
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ?`,
                    [typeOfMeal]
                );
            } else if (specialExperience) {
                // Solo filtro su specialExperience
                results = await db.getAllAsync(
                    `SELECT * FROM restaurants r, culinary_experience ce 
                     WHERE ce.id_restaurant = r.id`,
                    []
                );
            } else if (openNow) {
                // Solo filtro su openNow
                results = await db.getAllAsync(
                    `SELECT * FROM deals_restaurants dr, restaurants r 
                     WHERE dr.id_restaurant = r.id
                     AND hour_start_deal <= ? AND hour_end_deal >= ?`,
                    [hours, hours]
                );
            }
        }

        return results ?? null;
    } catch (error) {
        console.error('Error in the getRestaurants: ', error);
        return null;
    }
};


/**
 * 
 * @param id_restaurant id dele ristorante di cui vogliamo le informazioni
 * @returns le varie informazioni presenti nel db del ristorante cercato
 */
const getRestaurantById = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();
        
        const restaurant = await db.getAsync("SELECT * FROM restaurants WHERE id = ?", [id_restaurant]);
        
        return restaurant;
        
    }catch(error){
        console.error("Error in the restaurantById: ", error);
        return error;
    }
}


/**
 * @param username username dell'utente loggato
 * @param id_restaurant id del ristorante che l'utente vuole inserire nella lista 
 * @returns void
 */
const insertFavoriteRestaurant = async (username: string, id_restaurant: number) => {
    try{
        const db = await getDatabase();
        await db.execAsync("INSERT INTO favorites(username, id_restaurant) VALUES(?, ?)", [username, id_restaurant]);

    }catch(error){
        console.error('Error in the addFavorite: ', error);
        return error;
    }
}

/**
 * @param username username dell'utente loggato
 * @param id_restaurant id del ristorante che l'utente vuole eliminare dalla lista 
 * @returns void
 */
const deleteFavoriteRestaurant = async (username: string, id_restaurant: number) => {
    try{
        const db = await getDatabase();
        await db.execAsync("DELETE FROM favorites WHERE username = ? AND id_restaurant = ?", [username, id_restaurant]);

    }catch(error){
        console.error('Error in the deleteFavoriteRestaurant: ', error);
        return error;
    }
}

export { 
    getRestaurants, getRestaurantById,
    insertFavoriteRestaurant, deleteFavoriteRestaurant 
}

