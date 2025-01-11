import { FiltersOptions, Restaurant } from '../utils/interfaces';
import getDatabase from './connectionDB';

const getTagsByRestaurant = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql_tags = `
                SELECT t.name
                FROM tags t, tags_restaurants tr
                WHERE tr.id_tag = t.id AND tr.id_restaurant = ?
            `;

        const tags = await db.getAllAsync(sql_tags, [id_restaurant])

        return tags ?? [];
    }catch(error){
        console.error("Error in getTagsByRestaurant: ", error);
        return error;
    }
}

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

        const resultWithTags = await Promise.all(results.map(async (row: any) => {
            const tags = await getTagsByRestaurant(row.id); // Assicurati che questa funzione ritorni un array o un valore corretto
            return {
                ...row,
                tags, // Aggiungi i tags all'oggetto della riga
            };
        }));
    

        return resultWithTags ?? null;
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
            SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, printf("%.2f", AVG(d.price)) AS price_range, r.phone_number
            FROM restaurants AS r, dishes d, deals_restaurants dr
            WHERE r.id = d.id_restaurant 
                    AND dr.id_restaurant = r.id 
                    AND dr.id_deal = ?
            GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number
        `;

        const restaurantsByDeal: any[] = db.getAllAsync(sql, [id_type_deal]);

        const restaurantsByDealWithTags = await Promise.all(restaurantsByDeal.map(async (row: any) => {
            const tags = await getTagsByRestaurant(row.id); // Assicurati che questa funzione ritorni un array o un valore corretto
            return {
                ...row,
                tags, // Aggiungi i tags all'oggetto della riga
            };
        }));
    

        return restaurantsByDealWithTags ?? null;

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
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, printf("%.2f", AVG(d.price)) AS price_range, r.phone_number
                FROM restaurants AS r, dishes d
                WHERE r.id = d.id_restaurant AND r.id = ?
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number
        `;
        
        const restaurant: any[] = await db.getAllAsync(sql, [id_restaurant]);

        const restaurantWithTags = await Promise.all(restaurant.map(async (row: any) => {
            const tags = await getTagsByRestaurant(row.id); // Assicurati che questa funzione ritorni un array o un valore corretto
            return {
                ...row,
                tags, // Aggiungi i tags all'oggetto della riga
            };
        }));
    

        return restaurantWithTags ?? null;
        
    }catch(error){
        console.error("Error in the restaurantById: ", error);
        return error;
    }
}

/**
 * Funzione che permette di estrarre i vari orari di apertura di un determinato ristorante
 * @param id_restaurant id del ristorante 
 * @returns array di orari di apertura di un ristorante
 */
const getWorkingHoursByRestaurant = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT dr.hour_start_deal, dr.hour_end_deal
            FROM deals_restaurants AS dr
            WHERE id_restaurant = ?
            ORDER BY hour_start_deal
        `;

        const results = await db.getAllAsync(sql, [id_restaurant]);

        return results;

    }catch(error){
        console.error("Error in the getWorkingHoursByRestaurant: ", error);
        return error;
    }
} 

/**
 * Funzione che permette di restituire tutti i giorni di chiusura di un determinato ristorante
 * @param id_restaurant id del ristorante 
 * @returns array dei giorni di chiusura di un ristorante
 */
const getClosureDaysByRestaurant = async (id_restaurant: number) => {
    try{    
        const db = await getDatabase();

        const sql = `
            SELECT *
            FROM days_of_week AS dw, restaurant_closures AS rc
            WHERE dw.id_day = rc.id_day AND rc.id_restaurant = ? 
        `;

        const results = await db.getAllAsync(sql, [id_restaurant]);

        return results;
    }catch(error){
        console.error("Error in getClosureDaysByRestaurant: ", error);
        return error;
    }
}

/**
 * Funzione che ritorna tutti i giorni della settimana
 * @returns array dei giorni della settimana
 */
const getDaysWeek = async () => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT *
            FROM days_of_week
        `;

        const days = await db.getAllAsync(sql, []);
        
        return days;
    }catch(error){
        console.error("Error in getDaysWeek: ", error);
        return error;
    }
}


export { 
    getRestaurants, getRestaurantById, getRestaurantsByTypeDeal, getWorkingHoursByRestaurant, getClosureDaysByRestaurant, getDaysWeek, getTagsByRestaurant
}

