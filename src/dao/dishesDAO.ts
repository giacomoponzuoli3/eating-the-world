import getDatabase from './connectionDB';

/**
 * 
 * @param id_restaurant id del ristorante a cui voglio estrarre i piatti
 * @returns un array dei piatti di uno specifico ristorante 
 */
const getDishesByRestaurant = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT  
                d.id,
                d.name AS dish_name,
                d.description,
                d.price,
                cd.name AS name_category
            FROM dishes d, category_dishes cd
            WHERE d.id_category = cd.id AND d.id_restaurant = ?
            ORDER BY d.id_category
            `;

        const results: any[]  = await db.getAllAsync(sql, [id_restaurant]); //senza allergeni

        const resultsWithAllergens = await Promise.all(results.map(async (row: any) => {
            const allergens = await getAllergensByDish(row.id);

            return {
                ...row,
                allergens: allergens
            }

        }));

        return resultsWithAllergens ?? [];
    }catch(error){
        console.error('Error in the getDishesById: ', error);
        return error;
    }
}

const getAllergensByDish = async (id_dish: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT a.name
            FROM dishes_allergens da, allergens a
            WHERE da.id_allergen = a.id AND da.id_dish = ?
            ORDER BY a.name ASC
        `;

        const allergens = await db.getAllAsync(sql, [id_dish]);

        return allergens ?? []
        
    }catch(error){
        console.error("Error in getAllergensByDish: ", error);
        return error;
    }
};


export { getDishesByRestaurant, getAllergensByDish }