import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite'
import { Asset } from 'expo-asset';

const dbPath = `${FileSystem.documentDirectory}db.db`;


async function copyDatabaseFile() {

  //eliminazione del db
  await FileSystem.deleteAsync(dbPath, { idempotent: true }); // `idempotent` evita errori se il file non esiste

  const asset = Asset.fromModule(require('../../assets/db.db'));
    await asset.downloadAsync(); // Assicurati che l'asset venga scaricato
    await FileSystem.copyAsync({
      from: asset.localUri ? asset.localUri : "",
      to: dbPath
    });
}

async function openDatabase() {
  await copyDatabaseFile();
  return await SQLite.openDatabaseAsync(`db.db`, undefined, `${FileSystem.documentDirectory}`);
} 

const getDatabase = (() => {
    let dbInstance: any = null;
  
    return async () => {
      if (!dbInstance) {
        dbInstance = await openDatabase();
      }
      return dbInstance;
    };
  })();
  
  export default getDatabase;

  //nei dao usare -> import getDatabase from './connectionDB';