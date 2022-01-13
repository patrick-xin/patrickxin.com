import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetcher } from "@common/utils/fetcher";
import { IUser } from "features/admin/types";

export const useLogout = () => {
  //const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(
    () => {
      return fetch(`/api/auth/logout`, {
        method: "POST",
      });
    },
    {
      onSuccess: () => {
        //queryClient.invalidateQueries(["user"]);
        router.push("/");
      },
    }
  );
  return { logout: mutate, isLoading };
};

export const useLogin = ({
  username,
  password,
  email,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { mutate } = useMutation(
    async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });
      return res.json();
    },
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries("user");
        if (data.isLoggedIn) {
          router.push("/admin/dashboard");
        }
        if (!data.isLoggedIn) {
          setMessage("Try Again");
        }
      },
      onError: (err: { message: string }) => {
        setMessage(err.message);
      },
    }
  );

  return { login: mutate, message };
};

export const useUser = () => {
  let isAdmin;
  const { data, isFetching, error, refetch } = useQuery<{ isAdmin: boolean }>(
    "user",
    () => fetcher<{ isAdmin: boolean }>(`/api/auth/user`)
  );

  if (data) {
    isAdmin = data.isAdmin;
  }
  return { isAdmin, isFetching, error, refetch };
};

export const useGetUsers = () => {
  const { data, isFetching, error, refetch } = useQuery<IUser[]>("users", () =>
    fetcher<IUser[]>(`/api/auth/users`)
  );

  return { users: data, isFetching, error, refetch };
};

const deleteUser = async (userId: string) => {
  return await fetch(`/api/auth/users/${userId}`, { method: "DELETE" });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isLoading } = useMutation(
    (userId: string) => deleteUser(userId),
    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
  );

  return { deleteUser: mutate, error, isDeleting: isLoading };
};
