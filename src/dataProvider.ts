import { DataProvider } from "react-admin";
import pb from "./api/pocketbase"; // Import PocketBase instance

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    try {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort || {}; // Sorting

      const response = await pb.collection(resource).getList(page, perPage, {
        sort: field ? `${order === "ASC" ? "" : "-"}${field}` : undefined,
      });

      return {
        data: response.items.map((record: any) => ({
          ...record,
          id: record.id,
        })),
        total: response.totalItems, // Ensure `total` is included
      };
    } catch (error) {
      console.error("Error in getList:", error);
      return Promise.reject(new Error("Failed to fetch records."));
    }
  },
  getMany: async (resource, params) => {
    try {
      const records = await pb.collection(resource).getFullList();
      return {
        data: records.map((record: any) => ({ ...record, id: record.id })),
      };
    } catch (error) {
      console.error("Error in getMany:", error);
      return Promise.reject(new Error("Failed to fetch records."));
    }
  },

  getOne: async (resource, params) => {
    try {
      const record = await pb.collection(resource).getOne(params.id);
      return { data: { ...record, id: record.id } };
    } catch (error) {
      console.error("Error in getOne:", error);
      return Promise.reject(new Error("Record not found"));
    }
  },

  create: async (resource, params) => {
    try {
      const newRecord = await pb.collection(resource).create(params.data);
      return { data: { ...newRecord, id: newRecord.id } };
    } catch (error) {
      console.error("Error in create:", error);
      return Promise.reject(new Error("Failed to create record."));
    }
  },

  update: async (resource, params) => {
    try {
      const updatedRecord = await pb
        .collection(resource)
        .update(params.id, params.data);
      return { data: { ...updatedRecord, id: updatedRecord.id } };
    } catch (error) {
      console.error("Error in update:", error);
      return Promise.reject(new Error("Failed to update record."));
    }
  },

  delete: async (resource, params) => {
    try {
      await pb.collection(resource).delete(params.id);
      return { data: { id: params.id } };
    } catch (error) {
      console.error("Error in delete:", error);
      return Promise.reject(new Error("Failed to delete record."));
    }
  },
};
