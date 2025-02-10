import { Client, Databases, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
    //1. Use the appwrite SDK to check if the search term exists in the database
try {
    const result = await database.listDocuments(DATABASE_ID, PROJECT_ID, [
        Query.equal('searchTerm', searchTerm),
    ])
} catch (error) {
    console.log(error.message);
}
    //2. if it does, update the count
    //3. if it doesn't, create a new document with the search term and count as 1 
}
