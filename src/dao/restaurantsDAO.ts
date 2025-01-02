import getDatabase from './connectionDB';


/**
 * 
 * @returns array di tutti i ristoranti presenti nel db
 */
const getRestaurants = async () => {
    try{
        const db = await getDatabase();

        const sql = `
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, AVG(d.price) AS price_range
                FROM restaurants AS r, dishes d
                WHERE r.id = d.id_restaurant
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience
        `;

        const results: any[] = await db.getAllAsync(sql, []);
        console.log('Ristoranti trovati:', results);

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
                SELECT r.id, r.name, r.description, r.address, r.capacity, r.culinary_experience, AVG(d.price) AS price_range
                FROM restaurants AS r, dishes d
                WHERE r.id = d.id_restaurant AND r.id = ?
                GROUP BY r.name, r.description, r.address, r.capacity, r.culinary_experience
        `;
        
        const restaurant = await db.getAllAsync(sql, [id_restaurant]);
        
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

