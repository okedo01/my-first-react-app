import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. use appwrite SDK to check if the search term exists in the database
    // 2. if it does, update the count.
    // 3. if it doesn't, create a new documentwith the search term and count as 1
    database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', searchTerm)
    ])
    .then((result) => {
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            return database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            return database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }
    })
    .then((response) => {
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

export const getTrendingMovies = () => {
    return database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ])
    .then(response => {
      return response.documents || [];
    })
    .catch(err => {
      console.error("Failed to get trending movies", err);
      return [];
    });
  };
  
  