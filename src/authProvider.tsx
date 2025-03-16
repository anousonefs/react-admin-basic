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
      const response = await pb
        .collection("users")
        .authWithPassword(email, password);
      localStorage.setItem("username", email);

      const token = response.token;
      if (token) {
        pb.authStore.save(token); // Save token in PocketBase's auth store
      }
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    }
  },
  logout: () => {
    console.log("=> logout");
    pb.authStore.clear(); // Clear PocketBase authentication
    return Promise.resolve();
  },
  checkError: ({ status }: { status: number }) => {
    console.log("=> check error");
    if (status === 401 || status === 403) {
      pb.authStore.clear();
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkAuth: () => {
    console.log("=> check auth", pb.authStore.isSuperuser);
    return pb.authStore.isValid ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};
