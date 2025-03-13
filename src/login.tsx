import { useState } from "react";
import { useLogin, useNotify } from "react-admin";

const loginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // will call authProvider.login({ email, password })
    login({ username: username, password }).catch(() =>
      notify("Invalid username or password"),
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  );
};

export default loginPage;
