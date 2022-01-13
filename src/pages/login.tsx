import { useState } from "react";

import { useLogin } from "features/admin/hooks";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, message } = useLogin({ username, email, password });

  return (
    <div className="my-8 max-w-xs mx-auto">
      {message && <div>{message}</div>}
      <form
        className="space-y-4 flex flex-col w-full"
        onSubmit={async (e) => {
          e.preventDefault();

          login();
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="name"
          className="form-input"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          className="form-input"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="form-input"
        />
        <button
          type="submit"
          className="p-2 bg-orange rounded-md text-black/70 text-sm"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
