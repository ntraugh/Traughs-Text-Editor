import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Add logic for a method that gets all the content from the database
  export const getDb = async (content) => {
    console.log("Grabbing data from JATEDB")
    const jateDb = await openDB("jate", 1)
    const transaction = jateDb.transaction("jate", "readwrite")
    const obj = transaction.objectStore("jate")
    // using .getAll method to grab all the content
    const req = obj.getAll()
    const res = await req
    console.log("Data saved to JATEDB", res)
  };
// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log("Grabbing data from JATEDB")
  const jateDb = await openDB("jate", 1)
  const transaction = jateDb.transaction("jate", "readwrite")
  const obj = transaction.objectStore("jate")
  // need to use .put so we can update the id and content
  const req = obj.put({ id: id, content: content })
  const res = await req
  console.log("Data saved to JATEDB", res)
  
}


initdb();
