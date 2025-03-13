import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username === "admin" && password === "admin") {
      console.log("=> set user password");
      localStorage.setItem("username", username);
      return Promise.resolve();
    } else {
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
