import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite'
import { Asset } from 'expo-asset';

const dbPath = `${FileSystem.documentDirectory}db.db`;


async function copyDatabaseFile() {
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  
  if (!fileInfo.exists) {
    console.log('Copia del file db.db in corso...');
    const asset = Asset.fromModule(require('./assets/db.db'));
      await asset.downloadAsync(); // Assicurati che l'asset venga scaricato
      await FileSystem.copyAsync({
        from: asset.localUri ? asset.localUri : "",
        to: dbPath
      });
    console.log(dbPath);
    console.log('File db.db copiato con successo.');
  } else {
    console.log('Il file db.db esiste già.');
  }
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