import getDatabase from './connectionDB';

/**
 * 
 * @param id_restaurant id del ristorante a cui voglio estrarre i piatti
 * @returns un array dei piatti di uno specifico ristorante 
 */
const getDishesById = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT  
                id,
                name,
                description,
                price,
                id_category,
                id_restaurant 
            FROM dishes
            WHERE id_restaurant = ?
        `;

        const results: any[] = await db.getAllAsync(sql, [id_restaurant]);
        return results ?? null;
    }catch(error){
        console.error('Error in the getDishesById: ', error);
        return error;
    }
}


export { getDishesById }