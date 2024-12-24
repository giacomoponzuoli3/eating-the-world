import { FiltersOptions, Restaurant } from '../utils/interfaces';
import getDatabase from './connectionDB';

/**
 * 
 * @returns array di tutti i ristoranti presenti nel db
 */
const getRestaurants = async (filters?: FiltersOptions): Promise<Restaurant[] | null> => {
    try{
        const db = await getDatabase();
        const query = "SELECT r.name FROM type_deals td, deals_restaurants dr, restaurants r, culinary_experience ce WHERE";
        let conditions = [];
        let results: Restaurant[] = []
        if(filters){
            if(filters.typeOfMeal){
                conditions.push(` dr.id_deal = td.id AND r.id = dr.id_restaurant AND td.name = '${filters.typeOfMeal}' `);
            }
            if(filters.specialExperience){
                conditions.push(" ce.id_restaurant = r.id ");
            }
            // if(filters.openNow){
            //     const hours = new Date().getHours();
            //     conditions.push(` hour_start_deal <= ${hours} AND hour_end_deal >= ${hours} `);
            // }
            results = await db.getAllAsync(query + conditions.join("AND"), []);
        }else{
            results = await db.getAllAsync('SELECT * FROM restaurants', []);
        }
        return results ?? null;
    } catch (error) {
        console.error('Error in the getRestaurants: ', error);
        return null;
    }
}

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

