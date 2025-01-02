import getDatabase from './connectionDB';

/**
 * 
 * @returns array di tutti gli utenti presenti nel db
 */
const getUsers = async () => {
    try{
        console.log("entra in getUsers");
        const db = await getDatabase();
        const results: any[] = await db.getAllAsync('SELECT * FROM users', []);
        
        return results ?? null;
    } catch (error) {
        console.error('Error in the getUsers: ', error);
        return error;
    }
}

export { getUsers };
