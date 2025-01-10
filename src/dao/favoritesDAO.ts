import { Restaurant } from '../utils/interfaces';
import getDatabase from './connectionDB';
import { getTagsByRestaurant } from './restaurantsDAO';

/**
 * get all favorite restaurants of a specific client
 * @param username username dell'utente loggato
 * @returns array dei ristoranti favoriti dell'utente specifico
 */
const getFavoriteRestaurantsByUsername = async (username: string) => {
    try {
        const db = await getDatabase();

        const sql = `
            SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number, printf("%.2f", AVG(d.price)) AS price_range, r.phone_number
            FROM restaurants AS r, favorites AS f, dishes AS d
            WHERE r.id = f.id_restaurant AND r.id = d.id_restaurant
                AND f.username = ?
            GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number
        `;

        const favoritesRestaurants = await db.getAllAsync(sql, [username]);

        // Assicurati che favoritesRestaurants sia un array prima di continuare
        if (!Array.isArray(favoritesRestaurants)) {
            throw new Error("Invalid database response");
        }

        const favoritesRestaurantsWithTags = await Promise.all(favoritesRestaurants.map(async (row: any) => {
            const tags = await getTagsByRestaurant(row.id); // Assicurati che questa funzione ritorni un array o un valore corretto
            return {
                ...row,
                tags, // Aggiungi i tags all'oggetto della riga
            };
        }));
    

        return favoritesRestaurantsWithTags ?? null;

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
        const db = await getDatabase();
        
        const sql = `
            INSERT INTO favorites(username, id_restaurant) VALUES(?, ?)
        `;
        await db.runAsync(sql, [username, id_restaurant]);

        /*
        const sqlCheck = "SELECT * FROM favorites";
        const result = await db.getAllAsync(sqlCheck, []);
        console.log("Current data in favorites:", result);
        */
    }catch(error){
        console.error("Error in insertFavoriteRestaurant: ", error);
        return error;
    }
}

/**
 * Funzione che restituisce il valore booleano che rappresenta se il ristorante è presenta nella lista dei favoriti o meno
 * @param username 
 * @param id_restaurant 
 * @returns true se è presente, false meno
 */
const isFavoriteRestaurant = async (username: string, id_restaurant: number): Promise<Boolean> => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT *
            FROM  favorites AS f
            WHERE f.username = ? AND id_restaurant = ?
        `;

        const result = await db.getAllAsync(sql, [username, id_restaurant]);

        if(result.length === 0){ //non è presenta nella lista dei favoriti
            return false;
        }else{
            return true;
        }

    }catch(error){
        console.error("Error in isFavoriteRestaurant: ", error);
        return false;
    }
}

export { getFavoriteRestaurantsByUsername, deleteFavoriteRestaurant, insertFavoriteRestaurant, isFavoriteRestaurant }
