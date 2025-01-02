import getDatabase from './connectionDB';
import { User } from '../../App';
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


 const updateUser = async (user: User) => {
    try {
      const db = await getDatabase();
      const query = `
        UPDATE users
        SET name = ?, surname = ?, email = ?, username = ?, phone_number = ?
        WHERE username = ?
      `;
      const params = [user.name, user.surname, user.email, user.username, user.phone_number, user.username];
      await db.runAsync(query, params);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

export { getUsers, updateUser };
