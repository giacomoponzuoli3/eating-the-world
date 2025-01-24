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
        let reservations = await db.getAllAsync(sql, [username]);

        reservations = Array.isArray(reservations) ? reservations : [reservations];

        const tableReservations = await Promise.all(
            reservations.map(async (res: { id_restaurant: number; }) => {
                const restaurantName = await db.getAllAsync(`SELECT name FROM restaurants WHERE id = ?`, [res.id_restaurant]);
                return {
                    ...res,
                    restaurant_name: restaurantName[0].name,
                    // image_url: restaurant.image_url
                };
            })
        );

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
            await db.runAsync(sql, [id_restaurant, username, data, hour, number_people]);
        }else{
            const sql = `
                INSERT INTO table_reservations(id_restaurant, username, data, hour, number_people, special_request)
                VALUES(?, ?, ?, ?, ?, ?)
            `;
            await db.runAsync(sql, [id_restaurant, username, data, hour, number_people, special_request]);
        }

    }catch(error){
        console.error("Error in the insertTableReservation: ", error);
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
const updateTableReservation = async (username: string, id_restaurant: number, oldHour: string, oldData: string,  data: string, hour: string, number_people: number, special_request: string | null ) => {
    try{
        const db = await getDatabase();

        if(special_request == null){
            const sql = `
                UPDATE table_reservations 
                SET data = ?, hour = ?, number_people = ?
                WHERE username = ? AND id_restaurant = ? AND data = ? AND hour = ?
            `;
            await db.runAsync(sql, [data, hour, number_people, username, id_restaurant, oldData, oldHour]);
        }else{
            const sql = `
            UPDATE table_reservations 
            SET data = ?, hour = ?, number_people = ?, special_request = ?
            WHERE username = ? AND id_restaurant = ? AND data = ? AND hour = ?
            `;
            await db.runAsync(sql, [data, hour, number_people, special_request, username, id_restaurant, oldData, oldHour]);
        }

    }catch(error){
        console.error("Error in the updateTableReservation: ", error);
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
        
        await db.runAsync(sql, [username, id_restaurant, data, hour]);

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
            INSERT INTO culinary_experience_reservations(id_restaurant, username, data, number_people, price, id_language_selected)
            VALUES(?, ?, ?, ?, ?, ?)
        `;

        await db.runAsync(sql, [id_restaurant, username, data, number_people, price, id_language_selected]);

    }catch(error){
        console.error("Error in insertCulinaryExperienceReservation: ", error);
        return error;
    }
}

const deleteExpiredReservations = async () => {
    try {
        const db = await getDatabase();

        // Ottieni l'orario corrente
        const currentTime = new Date();

        // Calcola l'orario limite (5 ore fa)
        const timeLimit = new Date(currentTime.getTime() - 5 * 60 * 60 * 1000);

        // Formatta la data e l'ora per SQLite
        const formattedDate = timeLimit.toISOString().split('T')[0]; // Rimuove la parte dell'orario
        const formattedTime = timeLimit.toTimeString().split(' ')[0].slice(0, 5); // HH:MM

        // Elimina tutte le prenotazioni con data e ora passate
        const sql = `
            DELETE FROM table_reservations
            WHERE (data < ?)
            OR (data = ? AND hour < ?)
        `;

        const sql2 = `
            DELETE FROM culinary_experience_reservations
            WHERE (data < ?)
        `;

        await db.runAsync(sql, [formattedDate, formattedDate, formattedTime]);
        await db.runAsync(sql2, [formattedDate]);
    } catch (error) {
        console.error("Error in deleteExpiredReservations: ", error);
        return error;
    }
};

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
        
        await db.runAsync(sql, [username, id_restaurant, data]);

    }catch(error){
        console.error("Error in deleteCulinaryExperienceReservation: ", error);
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
 * @param oldDate
 * @returns 
 */
const updateCulinaryExperienceReservation = async (id_restaurant: number, username: string, oldDate: string, data: string, number_people: number, price: number, id_language_selected: number) => {
    try{
        const db = await getDatabase();

        const sql = `
            UPDATE culinary_experience_reservations
            SET data = ?, number_people = ?, price = ?, id_language_selected = ?
            WHERE username = ? AND data = ? AND id_restaurant = ?
        `;

        await db.runAsync(sql, [data, number_people, price, id_language_selected, username, oldDate, id_restaurant]);

    }catch(error){
        console.error("Error in insertCulinaryExperienceReservation: ", error);
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
        SELECT id_restaurant, username, data, number_people, price, id_language_selected, name
        FROM culinary_experience_reservations cer, languages l 
        WHERE cer.id_language_selected = l.id AND username = ?
        `;

        let reservations = await db.getAllAsync(sql, [username]);
        reservations = Array.isArray(reservations) ? reservations : [reservations];

        const specialReservations = await Promise.all(
            reservations.map(async (res: { id_restaurant: number, id_language_selected: number; }) => {
                const restaurantName = await db.getAllAsync(`SELECT name FROM restaurants WHERE id = ?`, [res.id_restaurant]);
                const time = await db.getAllAsync(`SELECT start_hour FROM culinary_experience WHERE id_restaurant = ?`, [res.id_restaurant]);
                const result = {
                    ...res,
                    restaurant_name: restaurantName[0].name,
                    time: time[0].start_hour,
                    // image_url: restaurant.image_url
                };
                return result;
            })
        );
        return specialReservations;

    }catch(error){
        console.error("Error in culinary_experience_reservations: ", error);
        return error;
    }
}


export {
    insertTableReservation, deleteTableReservation, getTableReservartionsByUsername, deleteExpiredReservations, updateTableReservation,
    updateCulinaryExperienceReservation, insertCulinaryExperienzeReservation, deleteCulinaryExperienceReservation, getCulinaryExperienceReservartionsByUsername
}