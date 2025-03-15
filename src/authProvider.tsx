import { AuthProvider } from "react-admin";
import pb from "./api/pocketbase"; // Import PocketBase instance

export const authProvider: AuthProvider = {
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      await pb.collection("users").authWithPassword(email, password);
      localStorage.setItem("username", email);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  },
  logout: () => {
    console.log("=> logout");
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkError: ({ status }: { status: number }) => {
    console.log("=> check error");
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkAuth: () => {
    console.log("=> check auth");
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};
