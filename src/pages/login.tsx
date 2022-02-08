import { useState } from "react";
import Image from "next/image";

import { useLogin } from "@/admin/hooks";
import { SpinLoader } from "@/common/components/icon";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login, message, isLoading } = useLogin({ username, email, password });

  return (
    <div className="grid grid-cols-1 place-content-center lg:mx-24 lg:grid-cols-5 h-screen mx-auto">
      <div className="col-span-2">
        <Image
          src="/assets/images/login.jpg"
          layout="responsive"
          height={900}
          width={750}
          alt="login-image"
          objectFit="cover"
        />
      </div>
      <div className="col-start-3 w-full flex flex-col justify-center items-center col-span-full">
        {message && <div>{message}</div>}
        <form
          className="space-y-4 flex flex-col w-1/2"
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
            className="p-2 flex justify-center items-center bg-orange rounded-md text-black/70 text-sm"
          >
            {isLoading ? <SpinLoader /> : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
