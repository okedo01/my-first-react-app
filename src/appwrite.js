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







// import { Client, Databases, Query, ID, Account } from "appwrite";

// const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject(PROJECT_ID)

// const database = new Databases(client);

// export const updateSearchCount = async (searchTerm, movie_id) => {
//    // 1. use appwrite SDK to check if the search term exists in the database
//    try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//         Query.equal('searchTerm', 'searchTerm')
//     ])
//     // 2. if it does, update the count.
//     if(result.documents.length > 0) {
//         console.log("results");
//         const docs = result.documents[0]
//         await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//             count: doc.count + 1,
//         })
//         // 3. if it doesn't, create a new documentwith the search term and count as 1
//     } else {
//         await database.createDocument(DATABASE_ID, COLLECTION_ID, data.unique(), {
//             searchTerm,
//             count: 1,
//             movie_id: movie_id.id,
//             poster_url: "https://image.tmdb.org/t/p/w500${movie.poster_path}"
//         })
//         console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID, results);
//     }
//    }
//    catch {
//     console.log("nothing");
    
//    } 
// }




// export const updateSearchCount = async (searchTerm, movie) => {
//     //1. Use the appwrite SDK to check if the search term exists in the database
// try {
//     const result = await database.listDocuments(DATABASE_ID, PROJECT_ID, [
//         Query.equal('searchTerm', searchTerm),
//     ])

//     //2. if it does, update the count
//     if(result.documents.length > 0) {
//         const doc = result.documents[0]

//         await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
//             count: doc.count + 1,
//         })
//     }

//     //3. if it doesn't, create a new document with the search term and count as 1 
//     else {
//         await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
//             searchTerm,
//             count: 1,
//             movie_id: movie.id,
//             poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         })
//     }
// } catch (error) {
//     console.log(error.message);
// }