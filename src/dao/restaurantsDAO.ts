import getDatabase from './connectionDB';


/**
 * 
 * @returns array di tutti i ristoranti presenti nel db
 */
const getRestaurants = async () => {
    try{
        console.log("entra in getRestaurants");
        const db = await getDatabase();

        const sql = `
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, printf("%.2f", AVG(d.price)) AS price_range, r.phone_number
                FROM restaurants AS r, dishes AS d
                WHERE r.id = d.id_restaurant
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number
        `;

        const results: any[] = await db.getAllAsync(sql, []);

        return results ?? null;
    } catch (error) {
        console.error('Error in the getRestaurants: ', error);
        return error;
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

        return restaurantsByDeal ?? null;

    }catch (error) {
        console.error('Error in the getRestaurantsByTypeDeal: ', error);
        return error;
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

        const sql = `
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, printf("%.2f", AVG(d.price)) AS price_range, r.phone_number
                FROM restaurants AS r, dishes d
                WHERE r.id = d.id_restaurant AND r.id = ?
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience, r.phone_number
        `;
        
        const restaurant: any[] = await db.getAllAsync(sql, [id_restaurant]);


        return restaurant ?? null;
        
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
    getRestaurants, getRestaurantById, getRestaurantsByTypeDeal, getWorkingHoursByRestaurant, getClosureDaysByRestaurant, getDaysWeek
}

