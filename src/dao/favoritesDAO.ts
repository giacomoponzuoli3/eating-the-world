import { Restaurant } from '../utils/interfaces';
import getDatabase from './connectionDB';


/**
 * get all favorite restaurants of a specific client
 * @param username username dell'utente loggato
 * @returns array dei ristoranti favoriti dell'utente specifico
 */
const getFavoriteRestaurantsByUsername = async (username: string) => {
    try {
        const db = await getDatabase();

        const sql = `
            SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number, r.photo, AVG(d.price) AS price_range
            FROM restaurants AS r, favorites AS f, dishes AS d
            WHERE r.id = f.id_restaurant AND r.id = d.id_restaurant
                AND f.username = ?
            GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.photo
        `;

        const favoritesRestaurants = await db.getAllAsync(sql, [username]);

        // Assicurati che favoritesRestaurants sia un array prima di continuare
        if (!Array.isArray(favoritesRestaurants)) {
            throw new Error("Invalid database response");
        }

        return favoritesRestaurants ?? []; // Restituisci un array vuoto se nulla è trovato

    } catch (error) {
        console.error("Error in getFavoriteRestaurantsByUsername: ", error);
        throw error;
    }
}


/**
 * delete a specific favorite restaurant 
 * @param username username dell'utente loggato
 * @param id_restaurant id del ristorante che l'utente vuole eliminare dalla lista dei favoriti
 * @returns void
 */
const deleteFavoriteRestaurant = async (username: string, id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            DELETE FROM favorites AS f
            WHERE id_restaurant = ?
                AND f.username = ?
        `;
        await db.runAsync(sql, [id_restaurant, username]);

    }catch(error){
        console.error("Error in deleteFavoriteRestaurant: ", error);
        return error;
    }
}

/**
 * insert a specific favorite restaurant
 * @param username username dell'utente loggato
 * @param id_restaurant id del ristorante che l'utente vuole inserire nella lista dei favoriti
 * @returns void
 */
const insertFavoriteRestaurant = async (username: string, id_restaurant: number) => {
    try{
        console.log("Inserting data:", { username, id_restaurant });
        const db = await getDatabase();
        
        const sqlCheck = "SELECT * FROM favorites";
        const result = await db.getAllAsync(sqlCheck, []);
        console.log("Current data in favorites:", result);

        const sql = `
            INSERT INTO favorites(username, id_restaurant) VALUES(?, ?)
        `;
        await db.runAsync(sql, [username, id_restaurant]);

    }catch(error){
        console.error("Error in insertFavoriteRestaurant: ", error);
        return error;
    }
}


export { getFavoriteRestaurantsByUsername, deleteFavoriteRestaurant, insertFavoriteRestaurant }
