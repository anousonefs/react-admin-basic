import { AuthProvider } from "react-admin";
import pb from "./api/pocketbase"; // Import PocketBase instance

export const authProvider: AuthProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> => {
    try {
      console.log("username: ", username, "pwd", password);
      await pb.collection("users").authWithPassword(username, password);
      localStorage.setItem("username", username);
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
