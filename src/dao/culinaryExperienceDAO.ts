import getDatabase from './connectionDB';


/**
 * get all culinary experiences of a specific restaurant
 * @param id_restaurant id del ristorante di cui voglio vedere l'esperienza culinaria
 * @returns array di culinary experiences
 */
const getCulinaryExperiencesByRestaurant = async (id_restaurant: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT *
            FROM culinary_experience
            WHERE id_restaurant = ?
        `;

        const culinary_experiences = await db.getAllAsync(sql, [id_restaurant]);

        return culinary_experiences;

    }catch(error){
        console.error("Error in getCulinaryExperienceByRestaurant: ", error);
        return error;
    }
}


/**
 * get all the languages of a specific culinary experience
 * @param id_culinary_experience id dell'esperienza culinaria di cui voglio sapere le lingue possibili
 * @returns array delle lingue di una specifica esperienza culinaria
 */
const getLanguagesByCulinaryExperience = async (id_culinary_experience: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT l.id, l.name
            FROM languages AS l, culinary_experience_languages AS cel
            WHERE l.id = cel.id_language AND cel.id_culinary_experience = ?
        `;
        
        const languages = await db.getAllAsync(sql, [id_culinary_experience]);

        return languages;

    }catch(error){
        console.error("Error in getLanguagesByCulinaryExperience: ", error);
        return error;
    }
}

export { getCulinaryExperiencesByRestaurant }