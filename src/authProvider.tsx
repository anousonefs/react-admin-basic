import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.resolve();
    }
    return Promise.reject();
  },
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};
