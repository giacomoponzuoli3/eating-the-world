import getDatabase from './connectionDB';


/**
 * get table reservations by username
 * @param username username dell'utente loggato 
 * @returns the array of rows that represent the table reservations of a specific client
 */
const getTableReservartionsByUsername = async (username: string) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT * FROM table_reservations
            WHERE username = ? 
        `;

        const tableReservations = await db.getAllAsync(sql, [username]);

        return tableReservations;

    }catch(error){
        console.error("Error in getTableReservartionsByUsername: ", error);
        return error;
    }
}

/**
 * 
 * @param username username dell'utente che vuole prenotare un tavolo
 * @param id_restaurant id del ristorante a cui vuole andare a mangiare l'utente
 * @param data data selezionata dall'utente
 * @param hour ora selezionata dall'utente
 * @param number_people numero di persone per il quale ha chiamato
 * @param special_request speciali richieste dell'utente (opzionale)
 * @returns void
 */
const insertTableReservation = async (username: string, id_restaurant: number, data: string, hour: string, number_people: number, special_request: string | null ) => {
    try{
        const db = await getDatabase();

        if(special_request == null){
            const sql = `
                INSERT INTO table_reservations(id_restaurant, username, data, hour, number_people)
                VALUES(?, ?, ?, ?, ?)
            `;
            await db.execAsync(sql, [id_restaurant, username, data, hour, number_people]);
        }else{
            const sql = `
                INSERT INTO table_reservations(id_restaurant, username, data, hour, number_people, special_request)
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            await db.execAsync(sql, [id_restaurant, username, data, hour, number_people, special_request]);
        }

    }catch(error){
        console.error("Error in the insertTableReservation: ", error);
        return error;
    }
}

/**
 * 
 * @param username username dell'utente loggato che vuole eliminare una prenotazione
 * @param id_restaurant id del ristorante a cui vuole eliminare la prenotazione
 * @param data 
 * @param hour 
 * @returns void
 */
const deleteTableReservation = async (username: string, id_restaurant: number, data: string, hour: string) => {
    try{
        const db = await getDatabase();

        const sql = "DELETE FROM table_reservations WHERE username = ? AND id_restaurant = ? AND data = ? AND hour = ?";
        
        await db.execAsync(sql, [username, id_restaurant, data, hour]);

    }catch(error){
        console.error("Error in deleteTableReservation: ", error);
        return error;
    }
}

/**
 * 
 * @param id_restaurant id del ristorante a cui l'utente vuole andare ad effettuare l'esperienza culinaria 
 * @param username username dell'utente loggato
 * @param data data selezionata dall'utente
 * @param number_people numero di persone che perteciperanno 
 * @param id_language_selected 
 * @returns 
 */
const insertCulinaryExperienzeReservation = async (id_restaurant: number, username: string, data: string, number_people: number, price: number, id_language_selected: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            INSERT INTO table_reservations(id_restaurant, username, data, number_people, price, id_language_selected)
            VALUES(?, ?, ?, ?, ?, ?)
        `;

        await db.execAsync(sql, [id_restaurant, username, data, number_people, price, id_language_selected]);

    }catch(error){
        console.error("Error in insertCulinaryExperienzeReservation: ", error);
        return error;
    }
}

/**
 * 
 * @param username username dell'utente loggato che vuole eliminare una prenotazione
 * @param id_restaurant id del ristorante a cui vuole eliminare la prenotazione
 * @param data 
 * @returns void
 */
const deleteCulinaryExperienceReservation = async (username: string, id_restaurant: number, data: string) => {
    try{
        const db = await getDatabase();

        const sql = "DELETE FROM culinary_experience_reservations WHERE username = ? AND id_restaurant = ? AND data = ?";
        
        await db.execAsync(sql, [username, id_restaurant, data]);

    }catch(error){
        console.error("Error in deleteCulinaryExperienceReservation: ", error);
        return error;
    }
}

/**
 * get culinary experience reservations by username
 * @param username username dell'utente loggato 
 * @returns the array of rows that represent the culinary experience reservations of a specific client
 */
const getCulinaryExperienceReservartionsByUsername = async (username: string) => {
    try{
        const db = await getDatabase();

        const sql = `
            SELECT * FROM culinary_experience_reservations
            WHERE username = ? 
        `;

        const tableReservations = await db.getAllAsync(sql, [username]);

        return tableReservations;

    }catch(error){
        console.error("Error in culinary_experience_reservations: ", error);
        return error;
    }
}


export {
    insertTableReservation, deleteTableReservation, getTableReservartionsByUsername,
    insertCulinaryExperienzeReservation, deleteCulinaryExperienceReservation, getCulinaryExperienceReservartionsByUsername
}