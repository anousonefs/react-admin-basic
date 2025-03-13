import PocketBase from "pocketbase";

// Initialize PocketBase instance
console.log("pocketbase url", import.meta.env.POCKETBASE_URL);

const pb = new PocketBase("http://localhost:8081"); // Replace with your PocketBase URL
pb.autoCancellation(false);

export default pb;

// Generic function to fetch a single document from the collection
export const fetchPocketbaseDocument = async <T extends Record<string, any>>(
  collection: string,
  id: string | any,
): Promise<T> => {
  const record = await pb.collection(collection).getOne<T>(id);
  return record;
};

// Generic function to fetch all documents from the collection
export async function fetchAllPocketbaseDocuments<
  T extends Record<string, any>,
>(collectionName: string): Promise<T[]> {
  const records = await pb.collection(collectionName).getFullList();
  return records.map((record) => record as unknown as T);
}

// Generic function to create a document in the collection
export async function createPocketbaseDocument<T extends Record<string, any>>(
  collectionName: string,
  data: T,
): Promise<string> {
  const record = await pb.collection(collectionName).create(data);
  return record.id;
}

// Generic function to update a document in the collection
export async function updatePocketbaseDocument<T extends Record<string, any>>(
  collectionName: string,
  id: string,
  data: Partial<T>,
): Promise<void> {
  await pb.collection(collectionName).update(id, data);
}

// Generic function to delete a document from the collection
export async function deletePocketbaseDocument(
  collectionName: string,
  id: string,
): Promise<void> {
  await pb.collection(collectionName).delete(id);
}
