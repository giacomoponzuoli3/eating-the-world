import getDatabase from './connectionDB';

/**
 * Funzione che restituisce tutti i tag di uno specifico ristorante
 * @param id_restaurant id del ristorante di cui voglio sapere i vari tag
 * @returns un array di tag di uno specifico ristorante
 */
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

/**
 * Funzione che ritorna i vari orari di apertura di un ristorante specificando anche il nome del pasto
 * @param id_restaurant 
 * @returns un array che contiene i vari orari di apertura di un determinato ristorante
 */
const getHoursByRestaurant = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT dr.id_deal, dr.id_restaurant, td.name, hour_start_deal, hour_end_deal
            FROM deals_restaurants dr, type_deals td
            WHERE dr.id_deal = td.id AND id_restaurant = ? 
        `;

        const hours = await db.getAllAsync(sql, [id_restaurant]);

        return hours ?? [];

    }catch(error){
        console.error("Error in getHoursByRestaurant: ", error);
        return error;
    }
}


/**
 * Funzione che restituisce il numero delle persone che hanno prenotato ad un derminato ristorante
 * Funzione che viene utilizzata per capire se il ristorante è pieno o meno
 * @param id_restaurant 
 * @param deal 
 * @param hour_start_deal 
 * @param hour_end_deal 
 * @param date 
 * @returns una riga in cui è memorizzata la somma del numero di persone prenotate in un ristorante per uno specifico pasto
 */
const getTableReservationsByHour_Date_Deal_Restaurant = async (id_restaurant: number, deal: string, hour_start_deal: string, hour_end_deal: string, date: string) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT tr.data, SUM(tr.number_people) AS num_people, td.name AS deal
            FROM table_reservations tr, restaurants r, deals_restaurants dr, type_deals td
            WHERE tr.id_restaurant = r.id 
                AND r.id = dr.id_restaurant 
                AND dr.id_deal = td.id
                AND r.id = ?
                AND tr.hour >= ?
                AND tr.hour <= ?
                AND td.name = ?
                AND tr.data = ?
            GROUP BY tr.data, td.name
        `;

        const result = await db.getAllAsync(sql, [id_restaurant, hour_start_deal, hour_end_deal, deal, date]);
        
        return result ?? [];

    }catch(error){
        console.error("Error in getTableReservationsByHour_Date_Deal_Restaurant: ", error);
        return null;
    }
};

export { 
    getRestaurants, getRestaurantById, getRestaurantsByTypeDeal, getWorkingHoursByRestaurant, getClosureDaysByRestaurant, getDaysWeek, getTagsByRestaurant, 
    getHoursByRestaurant, getTableReservationsByHour_Date_Deal_Restaurant
}

