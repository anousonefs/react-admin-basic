import { DataProvider } from "react-admin";
import pb from "./api/pocketbase"; // Import PocketBase instance

// Define Interfaces for your data (example)
interface Record {
  id: string;
  [key: string]: any; // Add specific fields as needed
}

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    try {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort || {}; // Sorting

      const filter = params.filter;

      let filterQuery = "";

      if (
        filter &&
        typeof filter === "object" &&
        Object.keys(filter).length > 0
      ) {
        filterQuery = Object.entries(filter)
          .map(([key, value]) => {
            if (typeof value === "string") {
              return `${key} = '${value}'`;
            } else if (typeof value === "number") {
              return `${key} = ${value}`;
            } else if (Array.isArray(value)) {
              // Handle array filtering (e.g., id ~ 'id1|id2|id3')
              return `${key} ~ '${value.join("|")}'`;
            } else if (value === null) {
              return `${key} = null`;
            } else if (typeof value === "boolean") {
              return `${key} = ${value}`;
            } else {
              // Handle other types as needed
              return `${key} = '${JSON.stringify(value)}'`; // Default to stringify
            }
          })
          .join(" && ");
      }

      const response = await pb
        .collection(resource)
        .getList<Record>(page, perPage, {
          sort: field ? `${order === "ASC" ? "" : "-"}${field}` : undefined,
          filter: filterQuery,
        });

      return {
        data: response.items.map((record) => ({
          ...record,
          id: record.id,
        })),
        total: response.totalItems,
      };
    } catch (error: any) {
      console.error("Error in getList:", error);
      return Promise.reject(
        new Error(error.message || "Failed to fetch records."),
      );
    }
  },

  getMany: async (resource, params) => {
    try {
      const records = await pb
        .collection(resource)
        .getFullList<Record>({ filter: `id ~ '${params.ids.join("|")}'` }); // Use PocketBase filter syntax
      return {
        data: records.map((record) => ({ ...record, id: record.id })),
      };
    } catch (error: any) {
      console.error("Error in getMany:", error);
      return Promise.reject(
        new Error(error.message || "Failed to fetch records."),
      );
    }
  },

  getManyReference: async (resource, params) => {
    try {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort || {};

      const response = await pb
        .collection(resource)
        .getList<Record>(page, perPage, {
          sort: field ? `${order === "ASC" ? "" : "-"}${field}` : undefined,
          filter: `${params.target} = '${params.id}'`, // Construct filter string
        });

      return {
        data: response.items.map((record) => ({
          ...record,
          id: record.id,
        })),
        total: response.totalItems,
      };
    } catch (error: any) {
      console.error("Error in getManyReference:", error);
      return Promise.reject(
        new Error(error.message || "Failed to fetch records."),
      );
    }
  },

  getOne: async (resource, params) => {
    try {
      const record = await pb.collection(resource).getOne<Record>(params.id);
      return { data: { ...record, id: record.id } };
    } catch (error: any) {
      console.error("Error in getOne:", error);
      return Promise.reject(new Error(error.message || "Record not found"));
    }
  },

  create: async (resource, params) => {
    try {
      const newRecord = await pb
        .collection(resource)
        .create<Record>(params.data);
      return { data: { ...newRecord, id: newRecord.id } };
    } catch (error: any) {
      console.error("Error in create:", error);
      return Promise.reject(
        new Error(error.message || "Failed to create record."),
      );
    }
  },

  update: async (resource, params) => {
    try {
      const updatedRecord = await pb
        .collection(resource)
        .update<Record>(params.id, params.data);
      return { data: { ...updatedRecord, id: updatedRecord.id } };
    } catch (error: any) {
      console.error("Error in update:", error);
      return Promise.reject(
        new Error(error.message || "Failed to update record."),
      );
    }
  },

  delete: async (resource, params) => {
    try {
      await pb.collection(resource).delete(params.id);
      return { data: { id: params.id } };
    } catch (error: any) {
      console.error("Error in delete:", error);
      return Promise.reject(
        new Error(error.message || "Failed to delete record."),
      );
    }
  },
};
