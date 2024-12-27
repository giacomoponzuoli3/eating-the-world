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
        console.log(filters)
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
                     AND hour_start_deal <= ? AND hour_end_deal >= ?
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [typeOfMeal, hours, hours]
                );
            } else if (typeOfMeal && specialExperience) {
                // Filtro su typeOfMeal e specialExperience
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r, culinary_experience ce 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ? 
                     AND ce.id_restaurant = r.id
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [typeOfMeal]
                );
            } else if (typeOfMeal && openNow) {
                // Filtro su typeOfMeal e openNow
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ? 
                     AND hour_start_deal <= ? AND hour_end_deal >= ?
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [typeOfMeal, hours, hours]
                );
            } else if (specialExperience && openNow) {
                // Filtro su specialExperience e openNow
                results = await db.getAllAsync(
                    `SELECT * FROM deals_restaurants dr, restaurants r, culinary_experience ce 
                     WHERE ce.id_restaurant = r.id 
                     AND hour_start_deal <= ? AND hour_end_deal >= ?
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [hours, hours]
                );
            } else if (typeOfMeal) {
                // Solo filtro su typeOfMeal
                results = await db.getAllAsync(
                    `SELECT * FROM type_deals td, deals_restaurants dr, restaurants r 
                     WHERE dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = ?
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [typeOfMeal]
                );
            } else if (specialExperience) {
                // Solo filtro su specialExperience
                results = await db.getAllAsync(
                    `SELECT * FROM restaurants r, culinary_experience ce 
                     WHERE ce.id_restaurant = r.id
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    []
                );
            } else if (openNow) {
                // Solo filtro su openNow
                results = await db.getAllAsync(
                    `SELECT * FROM deals_restaurants dr, restaurants r 
                     WHERE dr.id_restaurant = r.id
                     AND hour_start_deal <= ? AND hour_end_deal >= ?
                     GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience`,
                    [hours, hours]
                );
            }
        }

        // const sql = `
        //         SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, AVG(d.price) AS price_range
        //         FROM restaurants AS r, dishes d
        //         WHERE r.id = d.id_restaurant
        //         GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience
        // `;

        // const results: any[] = await db.getAllAsync(sql, []);
        console.log('Ristoranti trovati:', results);

        return results ?? null;
    } catch (error) {
        console.error('Error in the getRestaurants: ', error);
        return null;
    }
}

/**
 * get all the restaurants associated with a specific type of deal
 * @param id_type_deal id del tipo di pasto di cui vogliamo estrarre i ristoranti
 * @returns the array of restaurants associated at a specific type of deal
 */
const getRestaurantsByTypeDeal = async (id_type_deal: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, AVG(d.price) AS price_range
            FROM restaurants AS r, dishes d, deals_restaurants dr
            WHERE r.id = d.id_restaurant 
                    AND dr.id_restaurant = r.id 
                    AND dr.id_deal = ?
            GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience
        `;

        const restaurantsByDeal = db.getAllAsync(sql, [id_type_deal]);

        return restaurantsByDeal;

    }catch (error) {
        console.error('Error in the getRestaurantsByTypeDeal: ', error);
        return error;
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

        const sql = `
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, AVG(d.price) AS price_range
                FROM restaurants AS r, dishes d
                WHERE r.id = d.id_restaurant AND r.id = ?
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience
        `;
        
        const restaurant = await db.getAsync(sql, [id_restaurant]);
        
        return restaurant;
        
    }catch(error){
        console.error("Error in the restaurantById: ", error);
        return error;
    }
}


/**
 * Insert a restaurant in the favorite list
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
 * Delete a restaurant of the favorite list
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
    getRestaurants, getRestaurantById, getRestaurantsByTypeDeal,
    insertFavoriteRestaurant, deleteFavoriteRestaurant 
}

